class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  prepend_before_filter :authenticate_user!, :except => [:not_authenticated]
  
  def get_schools
    @schools = School.where("delete_flag is not true").order("created_at DESC").page params[:page]
  end
  
  layout :layout_by_page_type
  private
  def layout_by_page_type
      if devise_controller?
          "login"
      else
          "application"
      end
  end

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url, :alert => exception.message
  end	
  
end
