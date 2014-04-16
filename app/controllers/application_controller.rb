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
    if current_user.is_web_admin?
	  @schools = School.where("delete_flag is not true").order("created_at DESC").page params[:page] 
	else
	  school = current_user.school
	  if school.delete_flag != true
	    @schools = current_user.school 
	  else
	    @schools = nil
	  end
	end
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
    parameters = []
    if extras.empty? 
      extra = ""
    else
     extra = "#{extras.join(",")}"
    end

    #p "extras=====",parameters = extra.split(",")
	selector =  parameters.empty? ? "#{params[:controller]}##{params[:action]}" : (("classrooms").eql?("#{params[:controller]}") || ("licenses").eql?("#{params[:controller]}")) ? "#{params[:controller]}##{params[:action]}" : "#{params[:controller]}##{params[:action]}".concat("-"+parameters[0])  
    
    case selector

      when "users#dashboard"
        @breadcrumb = {
          :title=>"Dashboard",
          :breadcrumb=>{
            "Dashboard"=> ""
          }
        }
		
       when "schools#index"
        @breadcrumb = {
          :title=>"School List",
		  :icon=>"fa fa-table",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "School List"=> "",
          }
        }
      when "schools#new"
        @breadcrumb = {
          :title=>"Add new school",
		  :icon=>"fa fa-building-o",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "Add new school"=> "",
          }
        }
      when "schools#edit"
        @breadcrumb = {
          :title=>"Edit school info",
		  :icon=>"fa fa-building-o",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "School List"=> schools_path,
            "Edit school info"=> "",
          }
        }


      when "users#new-2"
	  @breadcrumb = {
        :title=>"Add School Admin",
		:icon=>"fa fa-user",
        :breadcrumb=>{
          "Dashboard"=> root_path,
          "School Admin List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
          "Add School Admin"=> "",
        }
      }    
      when "users#index-2"
      @breadcrumb = {
        :title=>"School Admin List",
		:icon=>"fa fa-user",
        :breadcrumb=>{
          "Dashboard"=> root_path,
		  "School Admin List"=> "",
        }
      }
      when "users#edit-2"
      @breadcrumb = {
        :title=>"Edit school admin info",
		:icon=>"fa fa-user",
        :breadcrumb=>{
          "Dashboard"=> root_path,
          "School Admin List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
          "Edit school admin info"=> "",
        }
      }

	  
      when "users#new-1"
		@breadcrumb = {
          :title=>"Add Web Admin",
		  :icon=>"fa fa-user",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "Web Admin List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0]),
            "Add Web Admin"=> "",
          }
        }   
        when "users#index-1"
        @breadcrumb = {
          :title=>"Web Admin List",
		  :icon=>"fa fa-user",
          :breadcrumb=>{
            "Dashboard"=> root_path,
			"School Listing" => schools_path,	
            "Web Admin List"=> "",
          }
        }
        when "users#edit-1"
        @breadcrumb = {
          :title=>"Edit web admin info",
		  :icon=>"fa fa-user",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "Web Admin List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0]),
            "Edit web admin info"=> "",
          }
        }   


        when "users#new-3"
        @breadcrumb = {
          :title=>"Add Teacher",
		  :icon=>"fa fa-user",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "Teacher List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
            "Add Teacher"=> "",
          }
        }
        when "users#index-3"
        @breadcrumb = {
          :title=>"Teacher List",
		  :icon=>"fa fa-user",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "Teacher List"=> "",
          }
        }
        when "users#edit-3"
        @breadcrumb = {
          :title=>"Edit teacher info",
		  :icon=>"fa fa-user",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "Teacher List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
            "Edit teacher info"=> "",
          }
        }


        when "users#new-4"
        @breadcrumb = {
          :title=>"Add Student",
		  :icon=>"fa fa-user",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "Student List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
            "Add Student"=> "",
          }
        }
        when "users#edit-4"
        @breadcrumb = {
          :title=>"Edit student info",
		  :icon=>"fa fa-user",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "Student List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
            "Edit Student info"=> "",
          }
        }
        when "users#index-4"
        @breadcrumb = {
          :title=>"Student List",
		  :icon=>"fa fa-user",
          :breadcrumb=>{
            "Dashboard"=> root_path,
            "Student List"=> "",
          }
        }
		
        when "classrooms#index"
          @breadcrumb = {
            :title=>"Classroom List",
			:icon=>"fa fa-users",
            :breadcrumb=>{
              "Dashboard"=> root_path,
              "Classroom List"=> "",
            }
          }
        when "classrooms#new"
		  @breadcrumb = {
            :title=>"Add new classroom",
			:icon=>"fa fa-users",
            :breadcrumb=>{
              "Dashboard"=> root_path,
			  "Classroom List"=> (url_for :controller => 'classrooms', :action => 'index', :school_id => parameters[0]),
              "Add new classroom"=> "",
            }
          }
        when "classrooms#edit"
          @breadcrumb = {
            :title=>"Edit classroom info",
			:icon=>"fa fa-users",
            :breadcrumb=>{
              "Dashboard"=> root_path,
              "Classroom List"=> (url_for :controller => 'classrooms', :action => 'index', :school_id => parameters[0]),
              "Edit classroom info"=> "",
            }
          } 
		  
		  
         when "licenses#new"
  		  @breadcrumb = {
            :title=>"Add License",
  			:icon=>"fa fa-tag",
              :breadcrumb=>{
              "Dashboard"=> root_path,
  			  "School List"=> (url_for :controller => 'schools', :action => 'index', :school_id => parameters[0]),
              "Add new license"=> "",
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
