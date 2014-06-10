class SessionsController < ApplicationController
  before_action :check_sign_in, only: [:new, :create]
  before_action :get_all_schools, only: [:new]
  before_action :get_school_by_id, only: [:create]
   
  def new
  	render :layout=>"login"
  end
 
  def create
    redirect_to signin_path,:notice=>"Invalid email/password combination" and return if (params[:session][:email].blank? || params[:session][:password].blank?)
    # Check if web admin
    @user = User.where("(email = '#{params[:session][:email].downcase}') AND (delete_flag is null OR delete_flag is false)").last
    unless @user.blank?
      if @user.is_web_admin?
        if @user && @user.authenticate(params[:session][:password]) 
          session[:user_id] = @user.id
          redirect_to schools_path
        else
          flash[:error] = "Invalid email/password combination"
          redirect_to signin_path
        end
      elsif @user.is_student? # Check if not student
        flash[:error] = "Student login is prohibited."
        redirect_to signin_path
      else
        if !params[:school_id].blank? #Check if school is selected
          @user = @school.users.where("(email = '#{params[:session][:email].downcase}') AND (delete_flag is null OR delete_flag is false)").last
          unless @user.blank?
            if @user && @user.authenticate(params[:session][:password]) && (@user.license_expiry_date.to_s > "#{Time.now.to_date.to_s}")
              session[:user_id] = @user.id
              redirect_to schools_path  
            else
              flash[:error] = "Invalid email/password combination OR license must have expired."
              redirect_to signin_path
            end
          else
            flash[:error] = "Email does not exist for selected school."
            redirect_to signin_path
          end  
        else
          flash[:error] = "Please select school."
          redirect_to signin_path
        end
      end
    else
      flash[:error] = "Email does not exist."
      redirect_to signin_path
    end  
   #  @user = @school.users.where("(email = '#{params[:session][:email].downcase}') AND (delete_flag is null OR delete_flag is false)")
	  # unless @user.blank?
	  #   if @user.role.name.eql?("Web Admin")
	  #     if @user && @user.authenticate(params[:session][:password]) 
   #        session[:user_id] = @user.id
   #        redirect_to schools_path
   #      else
	  #       flash[:error] = "Invalid email/password combination"
   #        redirect_to signin_path
   #      end
	  #   elsif !@user.role.name.eql?("Student")
	  #     if @user && @user.authenticate(params[:session][:password]) && (@user.license_expiry_date.to_s > "#{Time.now.to_date.to_s}")
   #        session[:user_id] = @user.id
   #        redirect_to school_path(:id=>@user.school_id)
   #      else
	  #     flash[:error] = "Invalid email/password combination OR license must have expired."
   #        redirect_to signin_path
   #      end
	  #   else
   #      flash[:error] = "Student login is prohibited."
   #      redirect_to signin_path
	  #   end
	  # else
   #     flash[:error] = "Email does not exist."
   #     redirect_to signin_path
	  # end
  end
  
  def destroy
    sign_out
	redirect_to signin_path
  end
end
