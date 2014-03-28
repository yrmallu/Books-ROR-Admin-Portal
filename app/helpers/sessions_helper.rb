module SessionsHelper

  # To check the user is logdined or not
  def logged_in?
      if session? == nil || session? == false 
        flash[:error] = "Please signin"
        redirect_to signin_url
      end
  end

  def signed_in?
    !current_user.nil?
  end
  
  def session?
     session[:user_id]
  end
    
  def session_id
     session[:user_id]
  end  
  #To check the user is already loggedin or not
  def check_sign_in
     if session? then
       flash[:error] = "You are already loggedin"
       redirect_to dashboard_users_path
     end
  end

  #deleting the session upon signout
  def sign_out
      session[:user_id] = nil  
      session.delete(:user)
  end
end