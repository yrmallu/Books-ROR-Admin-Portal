class UsersController < ApplicationController

  before_action :logged_in?, :except => [:forgot_password, :reset_password, :set_new_password, :email_for_password]
  before_action :check_sign_in, :only => [:forgot_password, :reset_password, :set_new_password, :email_for_password]
  before_action :set_user, :only => [:show, :edit, :update, :destroy, :get_user_school_licenses, :change_user_password, :remove_license ]
  before_action :get_role_id, :only => [:new, :index, :edit, :show, :create, :destroy] 
  before_action :get_manage_student_accessright, :only => [:new, :edit]
  before_action :get_classrooms, :only => [:new]
  before_action :get_school_by_id, :only => [:new, :edit, :index, :show]
  
  load_and_authorize_resource :only=>[:show, :new, :edit, :destroy, :index]
  
  def index
    if !@role_id.blank? && params[:school_id].blank?
      @users = User.where("delete_flag is not true AND role_id = '#{@role_id}'").order("created_at DESC").page params[:page]
    elsif !@role_id.blank? && !params[:school_id].blank?
      @users = User.where("delete_flag is not true AND role_id = '#{@role_id}' AND school_id = '#{params[:school_id]}'").order("created_at DESC").page params[:page]
	else
	  @users = User.where("delete_flag is not true").order("created_at DESC").page params[:page]
	end
	set_bread_crumb @role_id
  end
  
  def show
  end
 
  def new
    @user = User.new
	set_bread_crumb @role_id
  end
 
  def edit
    @existing_access_right = @user.user_permission_names.collect{|i| i.id.to_s}
	#@already_assigned_classrooms = @user.user_classrooms
	#@already_assigned_classrooms.each{ |classroom| @existing_classrooms = classroom.id}
    set_bread_crumb @role_id
  end
 
  def create
    @user = User.new(user_params)
	path = request.env['HTTP_HOST']
    if @user.save
	  unless params[:accessright].eql?('0')
	    @user.assign_accessright(params[:accessright]) 
  	  end
	  unless params[:classroom_ids].blank?
	    @array_classroom_ids = params[:classroom_ids].split(',') 
	    @array_classroom_ids.each do |classroom_id|
	      @user.user_classrooms.create(:classroom_id=> classroom_id)
	    end
	  end	
	  redirect_to users_path(:id=>@user, :school_id=> @user.school_id, :role_id=>@user.role_id), notice: 'User created.' 
	  #@user.welcome_email(path)
    else 
      render :action=> 'new'
	end
  end
   
  def update
    path = request.env['HTTP_HOST']
	if @user.update_attributes(user_params)
	  #p "accessid===",params[:accessright]
	  unless params[:accessright].blank?
	    # if params[:accessright].eql?('0')
# 	      @accessright_exist = @user.user_accessrights.last
# 	      @accessright_exist.update_attributes(:accessright_id=>params[:accessright], :access_flag=>true, :role_id=>@user.role_id)
# 	    else
# 	      @accessright_exist = @user.user_accessrights.where("accessright_id = #{params[:accessright]}").last
# 		  if @accessright_exist.blank?
# 	        @user.user_accessrights.create(:accessright_id=>params[:accessright], :access_flag=>false, :role_id=>@user.role_id) 
# 	      end
#         end
	  end 
	  redirect_to  user_path(:role_id=>@user.role_id, :school_id=>@user.school_id), notice: 'User updated.'
	  if  params[:send_mail].blank?
	    #@user.user_details_change_email(current_user.first_name, path)
	  end
	else
	  render :action=> 'new'
	end
  end
  
  def destroy
    unless @user.license.blank?
  	  @user.remove_license(@user.license_id)
	  remove_license_from_user
	end
	  @user.update_attributes(:delete_flag=>true)
	redirect_to users_path(:role_id => @user.role_id, :school_id=> @user.school_id), notice: 'User deleted.' 
  end
  
  def get_manage_student_accessright
    @accessright = Accessright.where("name = 'Can Manage Student'").last
  end
  
  def remove_license
     remove_license_from_user
	 redirect_to users_path(:role_id => @user.role_id, :school_id=> @user.school_id), notice: 'License Removed.' 
  end
  
  def remove_license_from_user 
    @user.update_attributes(:license_id=>"", :license_expiry_date=>"")
  end
  
  def get_user_school_licenses
    @no_mail = params[:no_mail] unless params[:no_mail].blank?
    @licenses = @user.school.licenses.where(" expiry_date > '#{Time.now.to_date}' AND (used_liscenses < no_of_licenses) AND delete_flag is not true ")
    render :partial=>"assign_license"
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
    @email_id = Base64.decode64(params[:email])
  	render :layout=>"login"
  end

  def dashboard
    set_bread_crumb
  end  
  
  def set_new_password
    if params[:password] != ""
 	  @user = User.find_by_email(params[:email_id].downcase)
 	  @user.password = params[:password]
 	  @user.password_confirmation = params[:password]
 	  if @user.save
	    flash[:success] = "Signin with new password."
 		redirect_to signin_path
 	  end
   else
     flash[:error] = "Please enter new password."
 	   redirect_to reset_password_path
 	 end
  end
  
  def forgot_password
  	render :layout=>"login"
  end
 
  def email_for_password
    @user = User.find_by_email(params[:email].downcase)
 	if @user.blank?
      flash[:error] = "Email does not exist."
 	  redirect_to forgot_password_path
 	else
 	  user_info = {:email => @user.email, :username => @user.first_name+" "+@user.last_name.to_s, :link => "http://"+request.env['HTTP_HOST']+"/reset_password?email="+Base64.encode64(@user.email), :url =>  "http://"+request.env['HTTP_HOST'] } 
 	  UserMailer.forgot_password_email(user_info).deliver
	  flash[:success] = "Email sent with password reset instructions."
 	  redirect_to signin_path
    end
  end
  
  # def delete_user
#     User.where(id: params[:user_ids]).each do |user|
#       user.update_attributes(delete_flag: true)
#     end
#     respond_to do |format|
#       format.js
#     end  
#   end
  
  def get_role_id
  	@role_id = params[:role_id]
  end
  
  def email_validation
     @check_unique_email = User.where("email = '#{params[:email]}' and id != #{params[:id]}")
     unless (@check_unique_email.blank?)
        render :text => "This email is already in use."
      else
        render :text => "avaiable"
     end
   end
  
  
  private
  def set_user
    @user = User.where("id = #{params[:id]}").last
  end
 
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :role_id, :phone_number, :school_id, :license_expiry_date, :license_id, :parent_name, :parent_email, :grade, :reading_ability)
  end
  
  def change_password_params
    params.require(:user).permit(:password, :password_confirmation)
  end
  
end