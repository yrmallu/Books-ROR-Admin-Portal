class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  prepend_before_filter :authenticate_user!, :except => [:not_authenticated]
  
  def get_schools
    @schools = School.where("delete_flag is not true").order("created_at DESC")
  end
  
end
