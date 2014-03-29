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
  
  def get_all_schools
    @schools = School.where("delete_flag is not true").order("created_at DESC")
  end
  
  def get_accessright
    if current_user.role_id.eql?(1)
      @accessrights = Accessright.where("id > 4")	
	end
  end
  
  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url, :alert => exception.message
  end	
  

  def set_bread_crumb(*extras)

    if extras.empty? 
      extra = ""
    else
      extra = "-#{extras.join('-')}"
    end

    selector = "#{params[:controller]}##{params[:action]}#{extra}"

    case selector
      when "users#dashboard"
        @breadcrumb = {
          :title=>"Dashboard",
          :breadcrumb=>{
            "Dashboard"=> ""
          }
        }
        when "users#new-1"
        @breadcrumb = {
          :title=>"Add Web Admin",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "Web Admin List"=> (url_for :controller => 'users', :action => 'index', :role_id => "1"),
            "Add Web Admin"=> "",
          }
        }   
        when "users#new-2"
        @breadcrumb = {
          :title=>"Add School Admin",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "School Admin List"=> (url_for :controller => 'users', :action => 'index', :role_id => "2"),
            "Add School Admin"=> "",
          }
        }    
       when "users#index-1"
        @breadcrumb = {
          :title=>"Web Admin List",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "Web Admin List"=> "",
          }
        }
        when "users#index-2"
        @breadcrumb = {
          :title=>"School Admin List",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "School Admin List"=> "",
          }
        }    
      else
        @breadcrumb = {
          :title=>"Dashboard",
          :breadcrumb=>{
            "Dashboard"=> ""
          }
        }  
      end  
  end 
end
