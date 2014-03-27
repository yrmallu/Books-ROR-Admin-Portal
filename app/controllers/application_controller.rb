class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  include SessionsHelper
  hide_action :current_user

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  
  helper_method :current_user
  
  
  def get_schools
    @schools = School.where("delete_flag is not true").order("created_at DESC").page params[:page]
  end
  
  def get_accessright
    if current_user.role_id.eql?(1)
      @accessrights = Accessright.where("id > 4")	
	end
  end
  
  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url, :alert => exception.message
  end	
  
end
