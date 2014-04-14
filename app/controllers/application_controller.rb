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
  
  def get_school_by_id
    @school = School.find(params[:school_id]) unless params[:school_id].blank?
  end
  
  def get_accessright
    # if current_user.role_id.eql?(1)
#       @accessrights = Accessright.where("id > 4")	
# 	end
    @accessrights = Accessright.all
  end
  
  def get_classrooms
    unless params[:school_id].blank?
      @school = School.find(params[:school_id])
      @classrooms = @school.classrooms
    end
  end
  
  def get_file_data(file, obj, save_list = false, role = nil)
    data_list = []
    case File.extname(file)
      when ".csv" then data_list = parse_csv(file, obj, role, save_list)
      when ".xls" then data_list = parse_spreadsheet(file, obj, role, save_list)
    end
    data_list
  end

  def parse_spreadsheet(file, obj, role, save_list)
    require 'roo'

    spreadsheet = Roo::Excel.new(file, nil, :ignore)
   
    header = spreadsheet.row(1).map{|h| h.to_sym.try(:downcase)}
    data_list = []
    (2..spreadsheet.last_row).each do |i|
      row = Hash[[header, spreadsheet.row(i)].transpose]
      row.merge!(:role_id => role) if role && !role.blank?
      data_obj = obj.new(row)
      if save_list
        data_obj.valid? ? data_obj.save : data_list << data_obj
      else
        error_hash = {:is_valid => data_obj.valid?, :error_messages  => data_obj.errors.full_messages}
        data_list << [data_obj, error_hash]
      end
      
    end
    data_list
  end

  def parse_csv(file, obj, role, save_list)
    require 'csv'
    data_list = []
    CSV.foreach(file, headers: true, :header_converters => lambda { |h| h.to_sym.try(:downcase) }) do |row|
      row = row.to_hash
      row.merge!(:role_id => role) if role && !role.blank?
      data_obj = obj.new(row)
      if save_list
        data_obj.valid? ? data_obj.save : data_list << data_obj
      else
        error_hash = {:is_valid => data_obj.valid?, :error_messages  => data_obj.errors.full_messages}
        data_list << [data_obj, error_hash]
      end
    end
    data_list
  end

  # rescue_from CanCan::AccessDenied do |exception|
#     redirect_to root_url, :alert => exception.message
#   end	
  
  rescue_from CanCan::Unauthorized do |exception|
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

      when "classrooms#index"
        @breadcrumb = {
          :title=>"Classroom List",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "Classroom List"=> "",
          }
        }
      when "classrooms#new"
        @breadcrumb = {
          :title=>"Add new classroom",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "Add new classroom"=> "",
          }
        }
      when "classrooms#edit"
        @breadcrumb = {
          :title=>"Edit classroom info",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "Classroom List"=> classrooms_path,
            "Edit classroom info"=> "",
          }
        } 

      when "schools#index"
        @breadcrumb = {
          :title=>"School List",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "School List"=> "",
          }
        }
      when "schools#new"
        @breadcrumb = {
          :title=>"Add new school",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "Add new school"=> "",
          }
        }

      when "schools#edit"
        @breadcrumb = {
          :title=>"Edit school info",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "School List"=> schools_path,
            "Edit school info"=> "",
          }
        }

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
        when "users#index-1"
        @breadcrumb = {
          :title=>"Web Admin List",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "Web Admin List"=> "",
          }
        }

        when "users#edit-1"
        @breadcrumb = {
          :title=>"Edit web admin info",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "Web Admin List"=> (url_for :controller => 'users', :action => 'index', :role_id => "1"),
            "Edit web admin info"=> "",
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
        when "users#index-2"
        @breadcrumb = {
          :title=>"School Admin List",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "School Admin List"=> "",
          }
        }
        when "users#edit-2"
        @breadcrumb = {
          :title=>"Edit school admin info",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "School Admin List"=> (url_for :controller => 'users', :action => 'index', :role_id => "2"),
            "Edit school admin info"=> "",
          }
        }  

        when "users#new-3"
        @breadcrumb = {
          :title=>"Add Teacher",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "Teacher List"=> (url_for :controller => 'users', :action => 'index', :role_id => "3"),
            "Add Teacher"=> "",
          }
        }
        when "users#index-3"
        @breadcrumb = {
          :title=>"Teacher List",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "Teacher List"=> "",
          }
        }
        when "users#edit-3"
        @breadcrumb = {
          :title=>"Edit teacher info",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "Teacher List"=> (url_for :controller => 'users', :action => 'index', :role_id => "3"),
            "Edit teacher info"=> "",
          }
        }

        when "users#new-4"
        @breadcrumb = {
          :title=>"Add Student",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "Student List"=> (url_for :controller => 'users', :action => 'index', :role_id => "4"),
            "Add Student"=> "",
          }
        }
        when "users#edit-4"
        @breadcrumb = {
          :title=>"Edit student info",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "Student List"=> (url_for :controller => 'users', :action => 'index', :role_id => "4"),
            "Edit Student info"=> "",
          }
        }
        when "users#index-4"
        @breadcrumb = {
          :title=>"Student List",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "Student List"=> "",
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
