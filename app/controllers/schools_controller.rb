class SchoolsController < ApplicationController

  before_action :logged_in?
  before_action :set_school, only: [:show, :edit, :update, :destroy, :get_schoolwise_license_list, :quick_edit_school, :un_archive_school], except: [:save_school_list]
  before_action :get_schools, only: [:index]
  before_action :set_bread_crumb, only: [:index, :edit, :new, :import_list, :import, :un_archive_school_list]
  
  load_and_authorize_resource :only=>[:show, :new, :edit, :destroy, :index]
  
  def index
    if params[:query_string] && !(params[:query_string].blank?)
      @schools = School.search("%#{params[:query_string]}%").un_archived.page params[:page]
      @search_flag = true
    else
      @search_flag = false
    end
    @school_admin = Role.where("name = 'School Admin'").last
    @teacher = Role.where("name = 'Teacher'").last
    @student = Role.where("name = 'Student'").last
  end

  def show
    @role = Role.where("id = '#{params[:role_id]}' ").last unless params[:role_id].blank?
    set_bread_crumb(params[:id])
  end

  def new
    @school = School.new
  end

  def edit
    set_bread_crumb(params[:id])
  end

  def create
    @school = School.new(school_params)
    if @school.save
      flash[:success] = "School created."
    redirect_to schools_path  
    else
      render :action=> 'new'
    end
  end

  def update
    if @school.update(school_params)
      flash[:success] = "School updated." 
    redirect_to @school
    else
      render :action=> 'edit'
    end
  end

  def destroy
    @school.update_attributes(:delete_flag=>true)
    @licenses = @school.licenses
    @licenses.each do |license|
      license.update_attributes(:delete_flag=>true)
    end
    flash[:success] = "School archived." 
	  #redirect_to schools_url
    redirect_to schools_url(:school_id=>@school.id) 
  end
  
  def get_schoolwise_license_list
    @license_assign_count = []
    @licenses = @school.licenses.un_archived.by_newest.page params[:page]
    @licenses_allocated = User.select("school_id, license_id, role_id, count(license_id) as total_license_count").group("role_id,license_id, school_id").having("school_id =?", params[:id])
    #@licenses_allocated.each{|x|  p x.school_id,x.license_id, x.role_id,  x.total_license_count}
    @licenses_allocated.each{|x|  @license_assign_count << x.total_license_count}
    render :partial=>"license_list"
  end
  
  def delete_school
    School.where(id: params[:school_ids].split(",")).each do |school|
      school.update_attributes(delete_flag: true)
    end
    flash[:success] = "Schools archived." 
	  redirect_to schools_url
    #redirect_to schools_url(:school_id=>params[:school_ids]) 
  end
  
  def subregion_options
    render partial: 'subregion_select'
  end
  
  def download_school_list
    if params[:format] == "xls"
      send_file "#{Rails.root}/public/download_school_list.xls", :type => "application/vnd.ms-excel", :filename => "school_list.xls", :stream => false
    else
      send_file "#{Rails.root}/public/download_school_list.csv", :type => "application/vnd.ms-excel", :filename => "school_list.csv", :stream => false
    end
  end
  
  def import_list
    session[:file] = ""
  end

  def import
    #flash[:notice] = ""
    begin
      File.open(Rails.root.join('public', 'tmp_files', params[:file].original_filename), 'wb') do |file|
        file.write(params[:file].read)
        session[:file] = file.path
      end
      @schools, @data_flag = get_file_data(session[:file], School, save = false)
      rescue ActiveRecord::UnknownAttributeError => e
      # FileUtils.rm data_file
      flash.now[:notice] = 'Uploaded file is not in format specified, please refer sample sheets before uploading.'
      params['commit']=nil
      render 'import_list'
    end
  end 

  def save_school_list
    # require 'fileutils'
    @schools, @data_flag =  get_file_data(session[:file], School, save = true)
    FileUtils.rm session[:file]
    session[:file] = ""
    if @data_flag
      flash[:success] = "List imported successfully" 
    else
      flash[:success] = "List is not imported due to some incorrect data." 
    end
    redirect_to schools_url
  end

  # def check_school_name_uniqueness
  #    @check_unique_name = School.where("name = '#{params[:name]}' and id != #{params[:id]}")
  #    unless (@check_unique_name.blank?)
  #       render :text => "This name is already in use."
  #     else
  #       render :text => "avaiable"
  #    end
  #  end

  def update_license_expiration_date
    params[:license_expiry_date].each do |k,v|
      lic = License.find(k) 
      if v && !v.blank? && !(lic.expiry_date == v.to_date)
        lic.update_attributes(:expiry_date => v) 
        lic.users.each{|u| u.update_attributes(:license_expiry_date => v)} if lic.users && !lic.users.blank?
      end
   end if params[:license_expiry_date] && !params[:license_expiry_date].blank?
    #params[:license_ids].each{|lic| License.find(lic).update_attributes(:expiry_date => nil) } if params[:license_ids] && !params[:license_ids].blank?
    redirect_to schools_url 
  end
  
  def quick_edit_school
   	return_val = @school.update_attributes("#{params[:column_name]}" => "#{params[:edited_value]}")
	if return_val.eql?(true)
      render :json=> true and return
	else
	   column_name = params[:column_name].capitalize
	  render :json=> {:status=>false, :message=>" #{column_name} already exist or is invalid."}.to_json and return
	end
  end
  
  def undo_school
    if params[:id].kind_of?(Array)
	    params[:id].each do |id|
	      school = School.where("id = '#{id}' AND delete_flag = true ").last
	      set_school_delete_flag(school)
	    end
	  else
      school = School.where("id = '#{params[:id]}' AND delete_flag = true ").last
      set_school_delete_flag(school)
	  end
	  redirect_to schools_url, notice: "School un-archived."
  end
   
  def set_school_delete_flag(school)
    school.update_attributes(:delete_flag=>false)
  end

  def un_archive_school_list
    @schools = School.archived.by_newest.page params[:page]
  end
  
  def un_archive_school 
    @school.update_attributes(:delete_flag=>false)
    redirect_to un_archive_school_list_schools_path, notice: 'School un-archived.' 
  end  
  
  private
    def set_school
      @school = School.find(params[:id])
    end

    def school_params
      params.require(:school).permit(:code, :name, :address, :city, :district, :state, :country, :phone,:licenses_attributes=> [:id,:license_group_id,:expiry_date,:no_of_licenses,:school_id])
    end
end