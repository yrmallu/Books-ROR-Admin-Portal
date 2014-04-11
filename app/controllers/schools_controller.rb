require 'roo'
require 'csv'

class SchoolsController < ApplicationController
  before_action :set_school, only: [:show, :edit, :update, :destroy, :get_schoolwise_license_list]
  before_action :get_schools, only: [:index]
  before_action :set_bread_crumb, only: [:index, :show, :edit, :new]
  
  load_and_authorize_resource :only=>[:show, :new, :edit, :destroy, :index]
  
  def index
    @school_admin = Role.where("name = 'School Admin'").last
	@teacher = Role.where("name = 'Teacher'").last
	@student = Role.where("name = 'Student'").last
  end

  def show
  end

  def new
    @school = School.new
	#@licenses = @school.licenses.build()
  end

  def edit
  end

  def create
    @school = School.new(school_params)
    @school.country = 'US'
    if @school.save
  	  flash[:success] = "School created."
	  redirect_to @school  
    else
      render :action=> 'new'
    end
  end

  def update
    @school.country = 'US'
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
    flash[:success] = "School deleted." 
    redirect_to schools_url	
  end
  
  def get_schoolwise_license_list
    @license_assign_count = []
    @licenses = @school.licenses.where("delete_flag is not true").order("created_at DESC").page params[:page]
	@licenses_allocated = User.select("role_id, school_id, count(license_id) as total_license_count").group("role_id, school_id").having("school_id =?", params[:id])
    @licenses_allocated.each{|x|  @license_assign_count << x.total_license_count}
	render :partial=>"license_list"
  end
  
  def delete_school
    School.where(id: params[:school_ids]).each do |school|
      school.update_attributes(delete_flag: true)
    end
    respond_to do |format|
      format.js
    end
  end
  
  def subregion_options
    render partial: 'subregion_select'
  end
  
  def download_school_list
    send_file "#{Rails.root}/public/download_school_list.xls", :type => "application/vnd.ms-excel", :filename => "school_list.xls", :stream => false
  end
  
  def import_list
    
  end

  def import
    School.import(params[:file])
    redirect_to :schools, :notice => "Imported Successfully."
  end 

  def check_school_name_uniqueness
     @check_unique_name = School.where("name = '#{params[:name]}' and id != #{params[:id]}")
     unless (@check_unique_name.blank?)
        render :text => "This name is already in use."
      else
        render :text => "avaiable"
     end
   end
  
  private
    def set_school
      @school = School.find(params[:id])
    end

    def school_params
      params.require(:school).permit(:code, :name, :address, :city, :district, :state, :country, :phone,:licenses_attributes=> [:id,:license_group_id,:expiry_date,:no_of_licenses,:school_id])
    end
end
