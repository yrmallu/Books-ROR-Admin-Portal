class UsersController < ApplicationController

  before_action :logged_in?, :except => [:forgot_password, :reset_password, :set_new_password, :email_for_password]
  before_action :check_sign_in, :only => [:forgot_password, :reset_password, :set_new_password, :email_for_password]
  before_action :set_user, :only => [:show, :edit, :update, :destroy, :get_user_school_licenses, :quick_edit_user, :change_user_password, :remove_license ]
  before_action :get_role_id, :only => [:new, :index, :edit, :show, :delete_parent, :create, :update] 
  before_action :get_manage_student_accessright, :only => [:new, :edit, :create, :update]
  before_action :get_classrooms, :only => [:new]
  before_action :get_school_by_id, :only => [:new, :edit, :index, :show, :delete_parent]
  before_action :get_school_specific_classrooms, :only => [:new, :edit, :delete_parent, :create, :update]
  before_action :get_all_reading_grades, :only => [:new, :edit, :delete_parent, :index]
  before_action :assign_root_path
  before_action :get_current_user

  load_and_authorize_resource :only=>[:show, :new, :edit, :destroy, :index]
  
  def index
    unless current_user.is_web_admin?
    current_user_read_accessrights
      unless @access_right_name.kind_of?(Array)
      if @current_user_accessrights.include?(@access_right_name)
          user_index
      else
        raise CanCan::Unauthorized.new("You are not authorized to access this page.", :read, User)
      end
    else
      user_index
    end
  else
    user_index
  end

  end
  
  def show
    unless current_user.is_web_admin?
    current_user_read_accessrights
    unless @access_right_name.kind_of?(Array)
        if @current_user_accessrights.include?(@access_right_name)
          user_show
      else
        raise CanCan::Unauthorized.new("You are not authorized to access this page.", :read, User)
      end
    else
      user_show
    end
  else
    user_show
  end
  end
  
  def user_index
    if params[:query_string] && !(params[:query_string].blank?) 
      @users = User.search("%#{params[:query_string]}%", @role_id, params[:school_id]).un_archived.page params[:page]
	  unless @school.blank?
	    set_bread_crumb(@role_id.id, @school.id)
	  else
	    set_bread_crumb(@role_id.id)
	  end
	  @search_flag = true
    else
	  if !@role_id.blank? && params[:school_id].blank?
        @users = User.where("role_id = '#{@role_id.id}'").un_archived.by_newest.page params[:page]
        set_bread_crumb(@role_id.id)
      elsif !@role_id.blank? && !params[:school_id].blank?
        @users = @school.users.where("role_id = '#{@role_id.id}'").un_archived.by_newest.page params[:page]
        set_bread_crumb(@role_id.id, @school.id)
      else
        @users = User.un_archived.by_newest.page params[:page]
      end
	  @search_flag = false
    end
  end
  
  def user_show
    @grade = ReadingGrade.find(@user.grade).grade_short unless @user.grade.blank?
    @reading = ReadingGrade.find(@user.reading_ability) unless @user.reading_ability.blank?
	unless @school.blank?
	  set_bread_crumb(@role_id.id, @school.id, @user.id)
	else
	  set_bread_crumb(@role_id.id, @user.id)
	end
  end
  
  def new
    unless current_user.is_web_admin?
      current_user_create_accessrights
      unless @access_right_name.kind_of?(Array)
        if @current_user_accessrights.include?(@access_right_name)
	      user_new
        else
          raise CanCan::Unauthorized.new("You are not authorized to access this page.", :create, User)
        end
      else
        user_new
      end 
    else
      user_new
    end
  end
  
  def current_user_read_accessrights
    @current_user_accessrights = []
    @current_user_accessrights = current_user.user_permission_names.collect{|i| i.name}
    if @role_id.name.eql?('School Admin')
      @access_right_name = 'View School Admin'
    elsif @role_id.name.eql?('Teacher')
      @access_right_name = 'View Teacher'
    elsif @role_id.name.eql?('Student')
      @access_right_name = 'View Student'
      unless current_user.user_accessrights.blank?
        @access_right_name = []
        @access_right_name << 'View Student'
        @access_right_name << 'Can Manage Student' if current_user.user_accessrights.last.access_flag.eql?(false)
      end
    end
  end 

  def create
    unless current_user.is_web_admin?
      @role_id = Role.find(params[:user][:role_id])
      current_user_create_accessrights
    unless @access_right_name.kind_of?(Array)
      if @current_user_accessrights.include?(@access_right_name)
          user_create
      else
        raise CanCan::Unauthorized.new("You are not authorized to access this page.", :create, User)
      end
    else
      get_school_after_render
      user_create
    end
  else
      get_school_after_render
      user_create
  end
  end
  
  def get_school_after_render
    unless @role_id.name.eql?('Web Admin')
      if !params[:school_id].blank?
        @school = School.find(params[:school_id])
      elsif !params[:user][:school_id].blank?
        @school = School.find(params[:user][:school_id])
    else
      @school = School.find(@user.school_id) 
      end
  end
  end
  
  def user_new
    @user = User.new
    unless params[:school_id].blank?
      set_bread_crumb(@role_id.id, @school.id)
    else
	  set_bread_crumb(@role_id.id)
    end
    @assigned_classrooms = []
    @parent = @user.parents.build
  end
   
  def user_create
    @user = User.new(user_params)
    path = request.env['HTTP_HOST']
    if @user.save
      unless params[:accessright].eql?('0')
        @user.assign_accessright(params[:accessright]) 
      end
      unless params[:selected_ids].blank?
        array_classroom_ids = params[:selected_ids].split(' ') 
        array_classroom_ids.each{|classroom_id| @user.user_classrooms.create(:classroom_id=> classroom_id, :role_id=>@user.role_id) } unless array_classroom_ids.blank?
      end  
      add_user_level_setting if @user.role.name.eql?('Student')
      redirect_to users_path(:school_id=> @user.school_id, :role_id=>@user.role_id), notice: 'User created.' 
      @user.welcome_email(path) unless params[:user][:email].blank?
    else 
      get_all_reading_grades
      @assigned_classrooms = []
      @school_specific_classrooms = @school.classrooms("delete_flag is not true") unless @school.blank? 
	  render :action=> 'new'
    end
  end
   
  def current_user_create_accessrights
    @current_user_accessrights = []
    @current_user_accessrights = current_user.user_permission_names.collect{|i| i.name}
    if @role_id.name.eql?('School Admin')
      @access_right_name = 'Create School Admin'
    elsif @role_id.name.eql?('Teacher')
    @access_right_name = 'Create Teacher'
    elsif @role_id.name.eql?('Student')
      @access_right_name = 'Create Student'
    unless current_user.user_accessrights.blank?
      @access_right_name = []
    @access_right_name << 'Create Student'
    @access_right_name << 'Can Manage Student' if current_user.user_accessrights.last.access_flag.eql?(false)
      end
    end
  end 
   
  def edit
    @user_search_param = params[:search]
    unless current_user.is_web_admin?
      current_user_update_accessrights
      unless @access_right_name.kind_of?(Array)
        if @current_user_accessrights.include?(@access_right_name)
          user_edit
        else
          raise CanCan::Unauthorized.new("You are not authorized to access this page.", :update, User)
        end
      else
        user_edit
      end
    else
      user_edit
    end
  end 
   
  def update
    unless current_user.is_web_admin?
      current_user_update_accessrights
      unless @access_right_name.kind_of?(Array)
        if @current_user_accessrights.include?(@access_right_name)
          user_update  
        else
          raise CanCan::Unauthorized.new("You are not authorized to access this page.", :update, User)
        end
      else
        get_school_after_render
        user_update
      end
    else
    get_school_after_render
      user_update
    end   
  end
  
  def user_edit
    @existing_access_right = @user.user_permission_names.collect{|i| i.id.to_s}
    set_bread_crumb(@role_id.id, @user.school_id, @user.id)
    @assigned_classrooms = @user.classrooms if @user && @user.classrooms
  end
  
  def user_update
    if @user.update_attributes(user_params)
      unless params[:accessright].blank?
        if params[:accessright].eql?('0')
          can_manage_access_right_id = get_manage_student_accessright
          @accessright_exist = @user.user_accessrights.where("accessright_id = #{can_manage_access_right_id.id}").last
          unless @accessright_exist.blank?
            @accessright_exist.update_attributes(:accessright_id=>can_manage_access_right_id.id, :access_flag=>true, :role_id=>@user.role_id)
          end
        else
          @accessright_exist = @user.user_accessrights.where("accessright_id = #{params[:accessright]}").last
          unless @accessright_exist.blank?
            @accessright_exist.update_attributes(:accessright_id=>params[:accessright], :access_flag=>false, :role_id=>@user.role_id) 
          else
            @user.user_accessrights.create(:accessright_id=>params[:accessright], :access_flag=>false, :role_id=>@user.role_id)
          end
        end
      end 
	  unless params[:selected_ids].eql?(nil)
	    array_classroom_ids = params[:selected_ids].split(' ').map { |s| s.to_i } unless params[:selected_ids].blank?
        unless array_classroom_ids.blank? && @user.classrooms.pluck(:id) == array_classroom_ids
	  	  @user.user_classrooms.destroy_all
          array_classroom_ids.each{|classroom_id| @user.user_classrooms.create(:classroom_id=> classroom_id, :role_id=>@user.role_id) } unless array_classroom_ids.blank?
        end
	  end
      add_user_level_setting if @user.role.name.eql?('Student')
	  unless params[:user_search_param].blank?
	    redirect_to user_search_users_path
	  else
        redirect_to  user_path(:role_id=>@user.role_id, :school_id=>@user.school_id), notice: 'User updated.'
      end
	else
      get_all_reading_grades
      @assigned_classrooms = @user.classrooms if @user && @user.classrooms
      @school_specific_classrooms = @school.classrooms("delete_flag is not true") unless @school.blank?
      render :action=> 'edit'
    end
  end
  
  def current_user_update_accessrights
    @current_user_accessrights = []
    @current_user_accessrights = current_user.user_permission_names.collect{|i| i.name}
    if @user.role.name.eql?('School Admin')
      @access_right_name = 'Update School Admin'
    elsif @user.role.name.eql?('Teacher')
      @access_right_name = 'Update Teacher'
    elsif @user.role.name.eql?('Student')
      @access_right_name = 'Update Student'
      unless current_user.user_accessrights.blank?
        @access_right_name = []
        @access_right_name << 'Create Student'
        @access_right_name << 'Can Manage Student' if current_user.user_accessrights.last.access_flag.eql?(false)
      end
    end
  end
  
  def destroy
    unless current_user.is_web_admin?
    current_user_destroy_accessrights
    unless @access_right_name.kind_of?(Array)
        if @current_user_accessrights.include?(@access_right_name)
          user_destroy 
      else
        raise CanCan::Unauthorized.new("You are not authorized to access this page.", :destroy, User)
      end
    else
      user_destroy
    end
  else
    user_destroy
  end  
  end

  def user_destroy
    unless @user.license.blank?
      #@user.remove_license(@user.license_id)
      remove_license_from_user
    end
    @user.update_attributes(:delete_flag=>true)
	redirect_to users_path(:role_id => @user.role_id, :school_id=> @user.school_id), notice: 'User archived.'
    #redirect_to users_path(:role_id => @user.role_id, :school_id=> @user.school_id, :user_id=>@user.id), notice: 'User archived.'
  end
 
  def current_user_destroy_accessrights
    @current_user_accessrights = []
    @current_user_accessrights = current_user.user_permission_names.collect{|i| i.name}
    if @user.role.name.eql?('School Admin')
      @access_right_name = 'Delete School Admin'
    elsif @user.role.name.eql?('Teacher')
      @access_right_name = 'Delete Teacher'
    elsif @user.role.name.eql?('Student')
      @access_right_name = 'Delete Student'
      unless current_user.user_accessrights.blank?
        @access_right_name = []
        @access_right_name << 'Delete Student'
        @access_right_name << 'Can Manage Student' if current_user.user_accessrights.last.access_flag.eql?(false)
      end
    end
  end
  
  def add_user_level_setting 
    if @user.assign_reading_based_on.eql?('grade')
    user_level = @user.grade
  elsif @user.assign_reading_based_on.eql?('reading')
    user_level = @user.reading_ability
  end
    UserlevelSettings.create(:user_id=>@user.id, :teacher_id=>current_user.id, :status=>1, :school_id=>@user.school_id, :userlevel=>user_level, :reference=>'t_portal')
  end
  
  def delete_user
    deleted_user = ''
    User.where(id: params[:user_ids]).each do |user|
      deleted_user = user
	  @user = user
      unless @user.license.blank?
        remove_license_from_user
      end
      user.update_attributes(delete_flag: true)
    end
    redirect_to users_path(:school_id=> deleted_user.school_id, :role_id=>deleted_user.role_id), notice: 'Users archived.'
  end
  
  def get_school_specific_classrooms
    @school_specific_classrooms = @school.classrooms.un_archived unless params[:school_id].blank? 
  end
  
  def get_manage_student_accessright
    @accessright = Accessright.where("name = 'Can Manage Student'").last
  end
  
  def remove_license
    remove_license_from_user
    redirect_to user_path(@user.id, :role_id => @user.role_id, :school_id=> @user.school_id), notice: 'License Removed.' 
  end
  
  def remove_license_from_user 
    @user.update_attributes(:license_id=>"", :license_expiry_date=>"")
  end
  
  def remove_bulk_licenses
    params[:bulk_remove_user_ids].each do |user_id|
	  @user = User.find(user_id)
	  unless @user.license_id.blank?
	    remove_license_from_user
	  end
	end
	redirect_to users_path(:role_id => @user.role_id, :school_id=> @user.school_id), notice: 'License Removed.' 
  end
  
  def get_user_school_licenses
    @no_mail = params[:no_mail] unless params[:no_mail].blank?
    @licenses = @user.school.licenses.where(" expiry_date > '#{Time.now.to_date}' AND (used_liscenses < no_of_licenses) AND delete_flag is not true ")
    render :partial=>"assign_license"
  end
  
  def assign_license
  end

  def change_user_password
    render :partial=>"change_password"
  end
  
  def update_new_password
  if @user.update_attributes(change_password_params)
      redirect_to users_path(:role_id => @user.role_id), notice: 'User password changed.'
    end
  end
   
  def reset_password
    @a = @user = ""
    data_info = Base64.decode64(params[:password_key].to_s)
    @a = JSON.parse(data_info) unless data_info.blank?
    @coupon = Coupon.find_by_code(@a["coupon"])
    redirect_to "http://107.21.250.244/books-that-grow-web-app/app_demo_v1.0/#/" and return if @coupon.blank? && !@a["a_type"].blank?
    redirect_to signin_path and return if @coupon.blank? && @a["a_type"].blank?
    @email_id = Base64.decode64(params[:email].blank? ? @a["email"].to_s : params[:email].to_s)
    @user = User.un_archived.where("lower(username) = lower('#{@a["username"]}') and school_id = '#{@a["school_id"]}'").last unless @a["username"].blank?
    render :layout=>"angular" and return unless @a["a_type"].blank?
    render :layout=>"login"
  end

  def dashboard
    set_bread_crumb
  end  
  
  def set_new_password
    if params[:password] != ""
    @user = params[:email_id].blank? ? User.un_archived.where("lower(username) = lower('#{params[:username]}') and school_id = '#{params[:school_id]}'").last : User.un_archived.where("lower(email) = lower('#{params[:email_id]}')").last
    @user.password = params[:password]
    @user.password_confirmation = params[:password]
    if @user.save
      Coupon.delete_all(:code=>params[:coupon])
      flash.now[:success] = "Signin with new password."
      redirect_to "http://107.21.250.244/books-that-grow-web-app/app_demo_v1.0/#/" and return unless params[:app_type].blank?
      redirect_to signin_path
    end
   else
     flash.now[:error] = "Please enter new password."
     redirect_to reset_password_path
   end
  end
  
  def forgot_password
    render :layout=>"login"
  end
 
  def email_for_password
    @user = User.find_by_email(params[:email].downcase)
    if @user.blank?
      flash[:error] = "That email address is not associated with a Books That Grow account. Please try a different email address or contact your administrator for help"
      redirect_to forgot_password_path
    else
      coupon = random_coupon
      Coupon.create(:code=>coupon)
      pwd_param = {"email" => @user.email, "coupon" => coupon}.to_json
      user_info = {:email => @user.email, :name=>@user.first_name, :username => @user.username, :link => "http://"+request.env['HTTP_HOST']+"/reset_password?password_key="+Base64.encode64(pwd_param.to_s), :url =>  "http://"+request.env['HTTP_HOST'] } 
      UserMailer.forgot_password_email(user_info).deliver
      flash[:success] = "Instructions will be sent to the email address you enter."
      redirect_to signin_path
    end
  end
  
  def random_coupon
    SecureRandom.urlsafe_base64(16)
  end
  
  def get_role_id
    if !params[:role_id].blank?
      @role_id = Role.where("id = '#{params[:role_id]}' ").last 
    elsif !params[:user][:role_id].blank?
      @role_id = Role.where("id = '#{params[:user][:role_id]}' ").last 
    end
  end
  
  def email_validation
     @check_unique_email = User.where("email = '#{params[:email]}' and id != #{params[:id]}")
     unless (@check_unique_email.blank?)
        render :text => "This email is already in use."
      else
        render :text => "avaiable"
     end
   end
   
  def username_validation
    @check_unique_username = User.where("username = '#{params[:username]}' and id != #{params[:id]}")
    unless (@check_unique_username.blank?)
       render :text => "This username is already in use."
     else
       render :text => "avaiable"
    end
  end 
  
  def download_sample_list
    if params[:list_type] == "school_admin"
      if params[:format] == "xls"
        send_file "#{Rails.root}/public/download_school_admin_list.xls", :type => "application/vnd.ms-excel", :filename => "school_admin_list.xls", :stream => false    
      else
        send_file "#{Rails.root}/public/download_school_admin_list.csv", :type => "application/vnd.ms-excel", :filename => "school_admin_list.csv", :stream => false    
      end
    elsif params[:list_type] == "teacher"
      if params[:format] == "xls"
        send_file "#{Rails.root}/public/download_teacher_list.xls", :type => "application/vnd.ms-excel", :filename => "teacher_list.xls", :stream => false    
      else
        send_file "#{Rails.root}/public/download_teacher_list.csv", :type => "application/vnd.ms-excel", :filename => "teacher_list.csv", :stream => false    
      end
    else
      if params[:format] == "xls"
        send_file "#{Rails.root}/public/download_student_list.xls", :type => "application/vnd.ms-excel", :filename => "student_list.xls", :stream => false    
      else
        send_file "#{Rails.root}/public/download_student_list.csv", :type => "application/vnd.ms-excel", :filename => "student_list.csv", :stream => false    
      end
    end
  end
  
  def download_teacher_list
    send_file "#{Rails.root}/public/download_school_list.xls", :type => "application/vnd.ms-excel", :filename => "school_list.xls", :stream => false
  end

  def download_student_list
    send_file "#{Rails.root}/public/download_school_list.xls", :type => "application/vnd.ms-excel", :filename => "school_list.xls", :stream => false
  end

  def import_list
    @list_type = params[:list_type]
    @school_id = params[:school_id]
    @role_id = params[:role_id]
	set_bread_crumb(@list_type, params[:role_id], params[:school_id])
  end

  def import
    #flash[:notice].clear
    @school_id = params[:school_id]
	  set_bread_crumb
    begin
      data_file = ""
      @role_id =  Role.find_by_name(params[:list_type].downcase.tr('_', ' ').titleize).id
      File.open(Rails.root.join('public', 'tmp_files', params[:file].original_filename), 'wb') do |file|
        file.write(params[:file].read)
        data_file = file
        session[:file] = file.path
      end
      @users = get_file_data(session[:file], User, save = false, @role_id)
    rescue ActiveRecord::UnknownAttributeError => e
      #FileUtils.rm data_file
      @list_type = params[:list_type]
      flash[:notice] = 'Uploaded file is not in format specified, please refer sample sheets before uploading.'
      params['commit']=nil
      render 'import_list'
    end
  end

  def save_user_list
    @users =  get_file_data(session[:file], User, save = true, params[:role_id], params[:school_id])
    #FileUtils.rm session[:file]
    session[:file] = ""
    flash[:success] = "School's list saved successfully." 
    redirect_to users_path(:role_id=>params[:role_id]), :notice => "Users Created."
  end
  
  def get_all_reading_grades
    @reading_grades = ReadingGrade.all
  end
  
  def delete_parent
    @user = User.find(params[:id])
    @assigned_classrooms = @user.classrooms if @user && @user.classrooms
    @parent = Parent.find(params[:parent_id])
    @parent.destroy
    respond_to do |format|
    	format.html {
    	}
    	format.js{}
    end
  end
  
  def app_route
    @app_path = request.host
  end
  
  def quick_edit_user
 	return_val = @user.update_attributes("#{params[:column_name]}" => "#{params[:edited_value]}")
	if return_val.eql?(true)
      render :json=> true and return
	else
     arrValues = []
     arrValues = params[:column_name].split('_') if params[:column_name].include? "_"
	   if !arrValues.blank?
       arrValues[0].capitalize!
       arrValues[1].capitalize! 
       column_name = arrValues.join(' ')
     else
       column_name = params[:column_name].capitalize 
     end 
     render :json=> {:status=>false, :message=>" #{column_name} already exist or is invalid."}.to_json and return
	end
  end
  
  def user_search
    if params[:query_string] && !(params[:query_string].blank?)
      @users = User.search_all("%#{params[:query_string]}%").un_archived.page(params[:page]).per(10) 
    end
    set_bread_crumb
  end
  
  def undo_user
    @user = User.where("id = '#{params[:id]}' AND delete_flag = true ").last
	@user.update_attributes(:delete_flag=>false)
    redirect_to users_path(:role_id => @user.role_id, :school_id=> @user.school_id), notice: 'User un-archived.'
  end
  
  private
  def set_user
    @user = User.where("id = '#{params[:id]}' ").un_archived.last
  end
  
  def assign_root_path
    User.app_route = app_route
  end
  
  def get_current_user
    User.current_user = current_user
  end  
 
  def user_params
    params.require(:user).permit(:first_name, :last_name, :username, :email, :password, :password_confirmation, :role_id, :phone_number, :school_id, :license_expiry_date, :license_id, :grade, :reading_ability, :assign_reading_based_on, :photos, :parents_attributes=>[:id,:name,:email,:_destroy])
  end
  
  def change_password_params
    params.require(:user).permit(:password, :password_confirmation)
  end
  
end