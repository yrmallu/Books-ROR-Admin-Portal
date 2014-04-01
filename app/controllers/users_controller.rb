class UsersController < ApplicationController

  before_action :logged_in?, :except => [:forgot_password, :reset_password, :set_new_password, :email_for_password]
  before_action :check_sign_in, :only => [:forgot_password, :reset_password, :set_new_password, :email_for_password]
  before_action :get_all_schools, :only=> [:new, :edit]
  
  before_action :set_user, :only => [:show, :edit, :update, :destroy]
  before_action :get_role_id, :only => [:new, :index, :edit, :show, :create] 
  
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
    session[:school_id] = nil
    session[:school_id] = params[:school_id] 
    @user = User.new
    set_bread_crumb @role_id
  end
 
  def edit
    set_bread_crumb @role_id
  end
 
  def create
    @user = User.new(user_params)
    @user.school_id = session[:school_id]
      if @user.save
        redirect_to users_path(:school_id=> @user.school_id, :role_id=> @user.role_id ), notice: 'User was successfully created.' 
      else 
        render :action=> 'new'
	  end
  end
   
  def update
    if @user.update_attributes(user_params)
      redirect_to @user, notice: 'User was successfully updated.'
    end
  end
  
  def destroy
    @user.update_attributes(:delete_flag=>true)
    redirect_to users_url
  end
  
  def get_user_school_licenses
    @user_id = params[:id] 
	user = User.find(params[:id])
	@licenses = License.where(" school_id = '#{user.school_id}'")
    render :partial=>"assign_license"
  end
  
  def update_user_license
    p "user to update===",@user = User.find(params[:id])
	p "exp date===", params[:expiry_date]
	if @user.update_attributes(user_license_params)
      redirect_to @user, notice: 'User was successfully updated.'
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
  
  def delete_user
    User.where(id: params[:user_ids]).each do |user|
      user.update_attributes(delete_flag: true)
    end
    respond_to do |format|
      format.js
    end  
  end
  
  def get_role_id
  	@role_id = params[:role_id]
  end
  
  private
    def set_user
      @user = User.find(params[:id])
    end
 
  def user_params
    params.require(:user).permit(:first_name, :last_name, :username, :email, :password, :password_confirmation, :role_id, :phone_number, :school_id)
  end
  
  def user_license_params
    params.require(:user).permit(:license_expiry_date, :license_id)
  end
  
end