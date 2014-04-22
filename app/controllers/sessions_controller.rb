class SessionsController < ApplicationController
  before_action :check_sign_in, only: [:new, :create]
   
  def new
  	render :layout=>"login"
  end
 
  def create
    redirect_to signin_path,:notice=>"Invalid email/password combination" and return if (params[:session][:email].blank? || params[:session][:password].blank?)
    @user = User.find_by("(email = '#{params[:session][:email].downcase}') AND (delete_flag is null OR delete_flag is false)")
	unless @user.blank?
	  if @user.role.name.eql?("Web Admin")
	    if @user && @user.authenticate(params[:session][:password]) 
          session[:user_id] = @user.id
          redirect_to schools_path
        else
	      flash[:error] = "Invalid email/password combination"
          redirect_to signin_path
        end
	  else
	    if @user && @user.authenticate(params[:session][:password]) && (@user.license_expiry_date.to_s > "#{Time.now.to_date.to_s}")
          session[:user_id] = @user.id
          redirect_to school_path(:id=>@user.school_id)
        else
	      flash[:error] = "Invalid email/password combination OR license must have expired."
          redirect_to signin_path
        end
	  end
	else
       flash[:error] = "Email does not exist."
       redirect_to signin_path
	end
  end
  
  def destroy
    sign_out
	redirect_to signin_path
  end
end
