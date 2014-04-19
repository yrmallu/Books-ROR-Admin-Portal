class ClassroomsController < ApplicationController
  
  before_action :set_classroom, only: [:show, :edit, :update, :destroy]
  before_action :set_bread_crumb, only: [:index, :show, :edit, :new]
  before_action :get_school_by_id, only: [:new, :index, :edit]
  before_action :get_school_year_range, only: [:new, :edit]
  before_action :get_complete_date, only: [:create, :update]
  before_action :get_school_specific_users, :only => [:new, :edit]
   
  def index
    set_bread_crumb(@school.id)
    # @classrooms = Classroom.joins(:users).select("users.role_id as role_id, classrooms.id as id, classrooms.name as name, classrooms.school_year_start_date as school_year_start_date, classrooms.school_year_end_date as school_year_end_date, classrooms.code as code, classrooms.school_id as school_id, count(user_classrooms.user_id) as total_users_count").group("classrooms.id,users.role_id, classrooms.school_id").having("classrooms.delete_flag is not true and classrooms.school_id = '#{params[:school_id]}' ").page params[:page]
#     @classroom_details = {}
# 	@classrooms.each do |classroom|
# 	   p classroom.role_id, classroom.total_users_count, classroom.code, classroom.id, classroom.name, classroom.school_id, classroom.school_year_end_date, classroom.school_year_end_date,"====" 
#        @classroom_details.store(classroom.code , {classroom.role_id=>classroom.total_users_count})	   
# 	end
# 	p "======code = role_id=>cnt",@classroom_details
   @classrooms = @school.classrooms.where("delete_flag is not true").order("created_at DESC").page params[:page]
# 	@classrooms.each do |classroom|
# 	   @user_count = []
# 	   @classroom_wise_users = classroom.users.select("users.role_id, count(user_id) as total_users_count").group("users.role_id")
# 	   # @classroom_wise_users.each{|x|  @user_count << x.total_users_count}
# 	end   
  end

  def show
  end

  def new
    @classroom = Classroom.new
	@assigned_teachers = []
	@assigned_students = []
	set_bread_crumb(@school.id)
  end

  def edit
    @role_wise_count = []
    @assigned_teachers = @classroom.users.includes(:role).where("delete_flag is not true AND (name='School Admin' OR name='Teacher') ").references(:role) if @classroom && @classroom.users
	@assigned_students = @classroom.users.includes(:role).where("delete_flag is not true AND name='Student'").references(:role) if @classroom && @classroom.users
    @role_wise_users = @classroom.users.select("users.role_id as role_id, count(user_classrooms.user_id) as total_users_count").group("users.role_id")
	@role_wise_users.each{|x| @role_wise_count << x.total_users_count} 
	set_bread_crumb(@school.id)
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
      redirect_to classrooms_path(:school_id=> @classroom.school_id), notice: 'Classroom created.'
	else
      render :action=> 'new'
	end
  end

  def update
    if @classroom.update(classroom_params)
	  array_selected_ids = params[:selected_ids].split(' ').concat(params[:student_selected_ids].split(' ') ) 
      unless array_selected_ids.blank? && @classroom.users.pluck(:id) == array_selected_ids
        @classroom.user_classrooms.destroy_all
        array_selected_ids.each do |user_id| 
		  @user = User.find(user_id) 
		  @classroom.user_classrooms.create(:user_id=> @user.id, :role_id=>@user.role_id) 
		end
      end
      redirect_to classroom_path(:school_id=> @classroom.school_id), notice: 'Classroom updated.'
    else
      render :action=> 'edit'
    end
  end

  def destroy
    @classroom.update_attributes(:delete_flag=>true)
    redirect_to classrooms_path(:school_id=> @classroom.school_id), notice: 'Classroom deleted.' 
  end

  def delete_classroom
    deleted_classroom = ''
    Classroom.where(id: params[:classroom_ids]).each do |classroom|
	  deleted_classroom = classroom
      classroom.destroy
    end
	redirect_to classrooms_path(:school_id=> deleted_classroom.school_id)
  end
  
  def get_school_year_range
    @dates = 2000..Date.today.year
  end
  
  def get_complete_date
    params[:classroom][:school_year_start_date] = params[:classroom][:school_year_start_date].to_s+"-01-01"
	params[:classroom][:school_year_end_date] = params[:classroom][:school_year_end_date].to_s+"-01-01"
  end
  
  def get_school_specific_users
    @school_specific_teachers = @school.users.includes(:role).where("delete_flag is not true AND (name='School Admin' OR name='Teacher') ").references(:role) unless params[:school_id].blank? 
    @school_specific_students = @school.users.includes(:role).where("delete_flag is not true AND name='Student'").references(:role) unless params[:school_id].blank?
  end

  private
    def set_classroom
      @classroom = Classroom.find(params[:id])
    end
	
    def classroom_params
      params.require(:classroom).permit(:code, :name, :school_id, :school_year_start_date, :school_year_end_date)
    end
end
