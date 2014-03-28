class SessionsController < ApplicationController
  before_action :check_sign_in, only: [:new, :create]
   
  def new
  	render :layout=>"login"
  end
 
  def create
    redirect_to signin_path,:notice=>"Invalid email/password combination" and return if (params[:session][:email].blank? || params[:session][:password].blank?)
    @user = User.find_by("(email = '#{params[:session][:email].downcase}') and (delete_flag is null or delete_flag is false)")
    #@user = User.find_by(email: params[:session][:email].downcase)
    if @user && @user.authenticate(params[:session][:password])
      # Storing session in user_id
      session[:user_id] = @user.id
	  
	  # for sending welcome mail after signin
	  #UserMailer.welcome_email(@user).deliver
	  
	 # flash[:success] = "You are successfully loggedin as #{@user.firstname}."
      redirect_to dashboard_users_path
    else
      #flash.now[:error] = 'Invalid email/password combination'
      #render 'new'
	  flash[:error] = "Invalid email/password combination"
      redirect_to signin_path
    end
  end
  
  def destroy
    sign_out
	redirect_to signin_path
  end
end
