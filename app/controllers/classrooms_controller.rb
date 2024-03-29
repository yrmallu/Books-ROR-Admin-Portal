class ClassroomsController < ApplicationController
  
  before_action :logged_in?
  before_action :set_classroom, only: [:show, :edit, :update, :destroy, :quick_edit_classroom, :un_archive_class, :show_class_data]
  #before_action :set_bread_crumb, only: [:index, :show, :edit, :new]
  before_action :get_school_by_id, only: [:new, :index, :edit, :update, :show, :un_archive_class_list]
  before_action :get_school_year_range, only: [:new, :edit, :update]
  before_action :get_complete_date, only: [:create, :update]
  before_action :get_school_specific_users, :only => [:new, :edit, :update]
  
  load_and_authorize_resource :only=>[:show, :new, :edit, :destroy, :index]
   
  def index
    if params[:query_string] && !(params[:query_string].blank?)
      @classrooms = Classroom.includes(:users).search("%#{params[:query_string]}%", params[:school_id]).page(params[:page]).per(10) 
	  @search_flag = true
    else
      @classrooms = Classroom.includes(:users).un_archived.where("classrooms.delete_flag is not true AND classrooms.school_id = '#{params[:school_id]}'").references(:users).page params[:page]
      @search_flag = false
    end
	  set_bread_crumb(@school.id)
    #@classrooms = Classroom.joins(:users).select("users.role_id as role_id, classrooms.id as id, classrooms.name as name, classrooms.school_year_start_date as school_year_start_date, classrooms.school_year_end_date as school_year_end_date, classrooms.code as code, classrooms.school_id as school_id, count(user_classrooms.user_id) as total_users_count").group("classrooms.id,users.role_id, classrooms.school_id").having("classrooms.delete_flag is not true and classrooms.school_id = '#{params[:school_id]}' ").preload(:users).page params[:page]

  end

  def show
    set_bread_crumb(@school.id)
  end

  def new
    @classroom = Classroom.new
    @assigned_teachers = []
    @assigned_students = []
    set_bread_crumb(@school.id)
  end

  def edit
    initialize_in_edit_update
    set_bread_crumb(@school.id)
  end

  def initialize_in_edit_update
    @role_wise_count = []
    @assigned_teachers = get_classroom_specific_teachers if @classroom && @classroom.users
    @assigned_students = get_classroom_specific_students if @classroom && @classroom.users
    @role_wise_users = @classroom.users.un_archived.select("users.role_id as role_id, count(user_classrooms.user_id) as total_users_count").group("users.role_id")
    @role_wise_users.each{|x| @role_wise_count << x.total_users_count} 
  end  

  def create
    @classroom = Classroom.new(classroom_params)
    if @classroom.save
     array_selected_ids = params[:selected_ids].split(' ').concat(params[:student_selected_ids].split(' ') )  
     unless array_selected_ids.blank?
        array_selected_ids.each do |user_id|
          @user = User.find(user_id)  
          @classroom.user_classrooms.create(:user_id=> @user.id, :role_id=>@user.role_id) 
        end
      end
      redirect_to classrooms_path(:school_id=> @classroom.school_id), notice: 'Class created.'
    else
      render :action=> 'new'
    end
  end

  def update
    if @classroom.update_attributes(classroom_params)
      array_selected_ids = params[:selected_ids].split(' ').concat( params[:student_selected_ids].split(' ') ) 
      unless array_selected_ids.blank? && @classroom.users.pluck(:id) == array_selected_ids
        @classroom.user_classrooms.destroy_all
        array_selected_ids.each do |user_id| 
          @user = User.find(user_id) 
          @classroom.user_classrooms.create(:user_id=> @user.id, :role_id=>@user.role_id) 
        end
      end
      redirect_to classroom_path(:school_id=> @classroom.school_id), notice: 'Class updated.'
    else
      initialize_in_edit_update
      render :action=> 'edit'
    end
  end

  def destroy
    @classroom.update_attributes(:delete_flag=>true)
    redirect_to classrooms_path(:school_id=> @classroom.school_id), notice: 'Class archived.' 
  end

  def delete_classroom
    deleted_classroom = ''
    Classroom.where(id: params[:classroom_ids].split(",")).each do |classroom|
     deleted_classroom = classroom
     classroom.destroy
   end
     redirect_to classrooms_path(:school_id=> deleted_classroom.school_id), notice: 'Classes archived.' 
  end

  def get_school_year_range
    @dates = 2000..Date.today.year
  end

  def get_complete_date
    params[:classroom][:school_year_start_date] = params[:classroom][:school_year_start_date].to_s+"-01-01"
    params[:classroom][:school_year_end_date] = params[:classroom][:school_year_end_date].to_s+"-01-01"
  end

  def get_school_specific_users
    @school_user_specific_classrooms = []
    @class_specific_teachers = []
    @school_student_specific_classrooms = []
    @class_specific_students = []

    if params[:action] == 'update'
      @school = School.find(params[:classroom][:school_id])
      @school_specific_teachers = get_school_specific_teachers unless params[:classroom][:school_id].blank?
      @school_specific_students = get_school_specific_students unless params[:classroom][:school_id].blank?
    else
      # Teacher and School Admin
      @school_specific_teachers = get_school_specific_teachers unless params[:school_id].blank? 
      @school_teachers = @school_specific_teachers.map(&:id)

      unless @classroom.blank?
        # Teacher and School Admin
        @school_user_specific_classrooms = (get_school_specific_teachers - get_classroom_specific_teachers).map(&:id)
        @class_specific_teachers = get_classroom_specific_teachers.map(&:id)
      
        # Student
        @school_student_specific_classrooms = (get_school_specific_students - get_classroom_specific_students).map(&:id)
        @class_specific_students = get_classroom_specific_students.map(&:id)
      end  

      # Student
      @school_specific_students = get_school_specific_students unless params[:school_id].blank? 
      @school_students = @school_specific_students.map(&:id)
    end
  end

  def get_school_specific_teachers
    @school.users.un_archived.order( 'last_name ASC' ).includes(:role).where(" (name='School Admin' OR name='Teacher') ").references(:role)
  end

  def get_school_specific_students
    @school.users.un_archived.order( 'last_name ASC' ).includes(:role).where("name='Student'").references(:role)
  end  

  def get_classroom_specific_teachers
    @classroom.users.un_archived.order( 'last_name ASC' ).includes(:role).where(" (name='School Admin' OR name='Teacher') ").references(:role)
  end  

  def get_classroom_specific_students
    @classroom.users.un_archived.order( 'last_name ASC' ).includes(:role).where(" (name='Student') ").references(:role)
  end  

  def quick_edit_classroom
   	@classroom.update_attributes("#{params[:column_name]}" => "#{params[:edited_value]}")
    render :json=> true and return
  end
  
  def download_classroom_list
    if params[:format] == "xls"
      send_file "#{Rails.root}/public/download_classroom_list.xls", :type => "application/vnd.ms-excel", :filename => "class_list.xls", :stream => false
    else
      send_file "#{Rails.root}/public/download_classroom_list.csv", :type => "application/vnd.ms-excel", :filename => "class_list.csv", :stream => false
    end
  end
  
  def import_list
    @school_id = params[:school_id]
    set_bread_crumb(@school_id)
  end
  
  def import
    @school_id = params[:school_id]
    set_bread_crumb(@school_id)
    begin
      File.open(Rails.root.join('public', 'tmp_files', params[:file].original_filename), 'wb') do |file|
        file.write(params[:file].read)
        session[:file] = file.path
      end
      @classrooms, @data_flag = get_file_data(session[:file], Classroom, save = false, params[:role_id], params[:school_id])
    rescue ActiveRecord::UnknownAttributeError => e
      # FileUtils.rm data_file
      flash.now[:notice] = 'Uploaded file is not in format specified, please refer sample sheets before uploading.'
      params['commit']=nil
      render 'import_list'
    end
  end

  def save_classroom_list
    # require 'fileutils'
    @classrooms, @data_flag =  get_file_data(session[:file], Classroom, save = true, params[:role_id], params[:school_id])
    FileUtils.rm session[:file]
    session[:file] = ""
    if @data_flag
      flash[:success] = "List imported successfully." 
    else
      flash[:success] = "List is not imported due to some incorrect data." 
    end
    redirect_to classrooms_path(:school_id=> params[:school_id])
  end

  def get_class_info
    @classroom = Classroom.includes(:users).where("id = #{params[:id]}").last
    render :file=>"/classrooms/classroom_info", :layout=>false
  end
  
  def show_class_data
    render :text => "#{classroom_path(@classroom,:school_id=>@classroom.school_id)}"
  end
  
  def un_archive_class_list
    set_bread_crumb(@school.id)
    unless params[:school_id].blank?
      @classrooms = @school.classrooms.archived.by_newest.page params[:page]
    end  
  end

  def un_archive_class
    @classroom.update_attributes(:delete_flag=>false)
    redirect_to un_archive_class_list_classrooms_path(:school_id=> @classroom.school_id), notice: 'Class un-archived.' 
  end
    
  private
  def set_classroom
    @classroom = Classroom.find(params[:id])
  end

  def classroom_params
    params.require(:classroom).permit(:code, :name, :school_id, :school_year_start_date, :school_year_end_date)
  end
end
