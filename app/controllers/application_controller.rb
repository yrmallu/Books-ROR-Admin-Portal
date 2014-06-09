class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  include SessionsHelper
  hide_action :current_user
  #before_filter :authentication_check
  #USER, PASSWORD = 'books-that-grow', 'qwerty123'
  
  #rescue_from Exception, :with => :render_error
  rescue_from ActiveRecord::RecordNotFound, :with => :render_not_found   
  rescue_from ActionController::RoutingError, :with => :render_not_found   
	
  helper_method :current_user
  helper_method :local_ip
  
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  
  # def authentication_check
#     authenticate_or_request_with_http_basic do |user, password|
#       user == USER && password == PASSWORD
#     end
#   end
  
  #called by last route matching unmatched routes.  Raises RoutingError which will be rescued from in the same way as other exceptions.
  def raise_not_found!
    raise ActionController::RoutingError.new("No route matches #{params[:unmatched_route]}")
  end
 
  #render 500 error 
  # def render_error(e)
#     respond_to do |f| 
#       f.html{ render :file => "#{Rails.root}/public/500.html", :status => 500 }
#         # f.js{ render :partial => "public/ajax_500", :status => 500 }
#     end
#   end
  
     #render 404 error 
  def render_not_found(e)
    respond_to do |f| 
      f.html{ render :file => "#{Rails.root}/public/404.html", :status => 404 }
      # f.js{ render :partial => "#{Rails.root}/public/ajax_404", :status => 404 }
    end
  end
	 
  def local_ip
    orig, Socket.do_not_reverse_lookup = Socket.do_not_reverse_lookup, true  # turn off reverse DNS resolution temporarily
    
    UDPSocket.open do |s|
      s.connect '64.233.187.99', 1
      s.addr.last
    end
  ensure
    Socket.do_not_reverse_lookup = orig
  end
  
  def get_schools
    @schools = []
    if current_user.role.name.eql?("Web Admin")
      @schools = School.un_archived.by_newest.page params[:page]
	else
	  @schools << @current_user.school
	end
    #@schools = School.by_newest.page params[:page]
  end
  
  def get_all_schools
    @schools = School.un_archived.by_newest
  end
  
  def get_school_by_id
    @school = School.find(params[:school_id]) unless params[:school_id].blank?
  end

  def get_particular_school(school_id)
    @school_name = School.find(school_id)
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
  
  def get_file_data(file, obj, save_list = false, role = nil, school = nil)
    data_list = []
    case File.extname(file)
      when ".csv" then data_list = parse_csv(file, obj, role, save_list, school)
      when ".xls" then data_list = parse_spreadsheet(file, obj, role, save_list, school)
    end
    data_list
  end

  def parse_spreadsheet(file, obj, role, save_list, school)
    require 'roo'
    spreadsheet = Roo::Excel.new(file, nil, :ignore)
   
    header = spreadsheet.row(1).map{|h| h.to_sym.try(:downcase) unless h.blank?}
    data_list = []
    data_flag = false
    (2..spreadsheet.last_row).each do |i|
      row = Hash[[header, spreadsheet.row(i)].transpose]
      next if row.blank?
      row.merge!(:role_id => role) if role && !role.blank?
      row.merge!(:school_id => school) if !school.blank?
      data_obj = obj.new(row)
      puts "new recode", row.to_hash
      if save_list
        db_exist = User.eql?(obj) ? obj.where("username = '#{data_obj.username}' and school_id = '#{school}'").last : obj.find_by_code(data_obj.code.to_i.to_s)
        if !db_exist.blank?
            db_exist.update_attributes(row.to_hash)
            data_flag = true
         elsif data_obj.valid?
             data_obj.save
             data_flag = true
         else
            data_list << data_obj
         end
      else
        error_hash = {:is_valid => data_obj.valid?, :error_messages  => data_obj.errors.full_messages}
        data_list << [data_obj, error_hash]
      end
      
    end
    return data_list,data_flag
  end

  def parse_csv(file, obj, role, save_list, school)
    require 'csv'
    data_list = []
    data_flag = false
    CSV.foreach(file, headers: true, :header_converters => lambda { |h| h.to_sym.try(:downcase) }) do |row|
      row = row.to_hash
      next if row.blank?
      row.merge!(:role_id => role) if role && !role.blank?
      row.merge!(:school_id => school) if !school.blank?
      data_obj = obj.new(row)
      if save_list
        db_exist = User.eql?(obj) ? obj.where("username = '#{data_obj.username}' and school_id = '#{school}'").last : obj.find_by_code(data_obj.code.to_i.to_s)
        if !db_exist.blank?
            db_exist.update_attributes(row.to_hash)
            data_flag = true
         elsif data_obj.valid?
             data_obj.save
             data_flag = true
         else
            data_list << data_obj
         end
      else
        error_hash = {:is_valid => data_obj.valid?, :error_messages  => data_obj.errors.full_messages}
        data_list << [data_obj, error_hash]
      end
    end
    return data_list,data_flag
  end
  
  #enable_authorization
  rescue_from CanCan::Unauthorized do |exception|
    redirect_to dashboard_users_path, :alert => exception.message
  end


  def set_bread_crumb(*extras)
    parameters = []
    if extras.empty? 
      extra = ""
    else
     extra = "#{extras.join(",")}"
    end

    p "extras=====",parameters = extra.split(",")
	selector =  parameters.empty? ? "#{params[:controller]}##{params[:action]}" : (("classrooms").eql?("#{params[:controller]}") || ("licenses").eql?("#{params[:controller]}")) ? "#{params[:controller]}##{params[:action]}" : "#{params[:controller]}##{params[:action]}".concat("-"+parameters[0])  
    p "selector=====",selector
	  
    case selector

      when "users#dashboard"
        @breadcrumb = {
          :title=>"Dashboard",
          :breadcrumb=>{
            "Dashboard"=> ""
        }
      }
	
      when "users#user_search"
        @breadcrumb = {
          :title=>"User Search",
		      :icon=>"glyphicon glyphicon-search",
          :breadcrumb=>{
            "User Search"=> ""
        }
      }
			
      when "accessrights#edit"
        @breadcrumb = {
          :title=>"Edit Accessrights",
		      :icon=>"glyphicon glyphicon-ban-circle",
          :breadcrumb=>{
            "Edit Accessrights"=> ""
        }
      }
      
      when "accessrights#new"
        @breadcrumb = {
          :title=>"Assign Accessrights",
  		    :icon=>"glyphicon glyphicon-ban-circle",
          :breadcrumb=>{
            "Assign Accessrights"=> ""
        }
      }
      
      when "accessrights#index"
        @breadcrumb = {
          :title=>"Accessrights List",
		      :icon=>"glyphicon glyphicon-ban-circle",
          :breadcrumb=>{
            "Accessrights List"=> ""
        }
      } 
     	
      when "schools#index"
        @breadcrumb = {
          :title=>"School List",
		      :icon=>"fa fa-building-o",
          :breadcrumb=>{
            "School List"=> "",
        }
      }
		
      when "schools#show-#{parameters[0]}"
        get_particular_school(parameters[0])
        @breadcrumb = {
          :title=>"School Information",
	        :icon=>"fa fa-building-o",
          :breadcrumb=>{
	          "School List"=> schools_path,
            @school_name.name => school_path(parameters[0]),
            "School Information"=> "",
        }
      }
		
      when "schools#new"
        @breadcrumb = {
          :title=>"Add New School",
		      :icon=>"fa fa-building-o",
          :breadcrumb=>{
            "Add New School"=> "",
        }
      }
      
      when "schools#edit"
        @breadcrumb = {
          :title=>"Edit School Information",
		      :icon=>"fa fa-building-o",
          :breadcrumb=>{
            "School List"=> schools_path,
            "Edit School Information"=> "",
        }
      }
      
      when "schools#import_list"
        @breadcrumb = {
          :title=>"Import School List",
		      :icon=>"fa fa-building-o",
          :breadcrumb=>{
            "School List"=> schools_path,
            "Import School List"=> "",
        }
      }	
	    
      when "schools#import"
        @breadcrumb = {
          :title=>"Import School List",
	        :icon=>"fa fa-building-o",
          :breadcrumb=>{
            "School List"=> schools_path,
            "Import School List"=> "",
        }
      }

      when "users#new-2"
        get_particular_school(parameters[1])
	      @breadcrumb = {
          :title=>"Add School Admin",
		      :icon=>"btg btg-admin",
          :breadcrumb=>{
            "School List"=> schools_path,
            @school_name.name => school_path(:id=>parameters[1], :role_id => parameters[0]),
            "School Admin List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
            "Add School Admin"=> "",
        }
      }

      when "users#index-2"
        get_particular_school(parameters[1])
        @breadcrumb = {
          :title=>"School Admin List",
		      :icon=>"btg btg-admin",
          :breadcrumb=>{
            "School List"=> schools_path,
            @school_name.name => school_path(:id=>parameters[1], :role_id => parameters[0]),
		        "School Admin List"=> "",
        }
      }
      
      when "users#show-2"
        get_particular_school(parameters[1])  
	      if !parameters[2].blank? && parameters[2].eql?(current_user.id.to_s)
          @breadcrumb = {
            :title=>"My Information",
 	          :icon=>"btg btg-admin",
            :breadcrumb=>{
 	            "School List"=> schools_path,
              "School Admin List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
              "My Information"=> "",
          }
        }
	      else
          @breadcrumb = {
            :title=>"School Admin Information",
 	          :icon=>"btg btg-admin",
            :breadcrumb=>{
 	            "School List"=> schools_path,
              @school_name.name => school_path(:id=>parameters[1], :role_id => parameters[0]),
              "School Admin List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
              "School Admin Information"=> "",
          }
        }
	    end

      when "users#edit-2"
        get_particular_school(parameters[1])
	      if !parameters[2].blank? && parameters[2].eql?(current_user.id.to_s)
          @breadcrumb = {
            :title=>"Edit My Information",
  		      :icon=>"btg btg-admin",
            :breadcrumb=>{
              "School List"=> schools_path,
              "School Admin List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
              "Edit My Information"=> "",
          }
        }
	      else
          @breadcrumb = {
            :title=>"Edit School Admin Information",
  		      :icon=>"btg btg-admin",
            :breadcrumb=>{
              "School List"=> schools_path,
              @school_name.name => school_path(:id=>parameters[1], :role_id => parameters[0]),
              "School Admin List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
              "Edit School Admin Information"=> "",
          }
        }
	    end
      
      when "users#import_list-school_admin"
        @breadcrumb = {
          :title=>"Import School Admin List",
		      :icon=>"fa fa-building-o",
          :breadcrumb=>{
            "School Admin List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[1], :school_id => parameters[2]),
            "Import School Admin List"=> "",
        }
      }
	  
      when "users#new-1"
		    @breadcrumb = {
          :title=>"Add Web Admin",
		      :icon=>"fa fa-user",
          :breadcrumb=>{
            "Web Admin List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0]),
            "Add Web Admin"=> "",
        }
      }  
		
      when "users#create-1"
		    @breadcrumb = {
          :title=>"Add Web Admin",
  		    :icon=>"fa fa-user",
          :breadcrumb=>{
              "Web Admin List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0]),
              "Add Web Admin"=> "",
        }
      } 
    
      when "users#index-1"
        @breadcrumb = {
          :title=>"Web Admin List",
		      :icon=>"fa fa-user",
          :breadcrumb=>{
            "Web Admin List"=> "",
        }
      }
      
      when "users#show-1"
		    if !parameters[1].blank? && parameters[1].eql?(current_user.id.to_s)
          @breadcrumb = {
          :title=>"My Information",
   	      :icon=>"fa fa-user",
          :breadcrumb=>{
            "Web Admin List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0]),
            "My Information"=> "",
          }
        }
		    else
          @breadcrumb = {
          :title=>"Web Admin Information",
   	      :icon=>"fa fa-user",
          :breadcrumb=>{
            "Web Admin List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0]),
            "School Admin Information"=> "",
          }
        }
	 	  end
         
      when "users#edit-1"
		    if !parameters[2].blank? && parameters[2].eql?(current_user.id.to_s)
          @breadcrumb = {
            :title=>"Edit My Information",
  		      :icon=>"fa fa-user",
            :breadcrumb=>{
              "Web Admin List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0]),
              "Edit My Information"=> "",
          }
        }
		    else
          @breadcrumb = {
            :title=>"Edit Web Admin Information",
  		      :icon=>"fa fa-user",
            :breadcrumb=>{
              "Web Admin List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0]),
              "Edit Web Admin Information"=> "",
          }
        }
		  end

      when "users#un_archive_users_list-1"
        @breadcrumb = {
          :title=>"Un-archived Web Admin List",
          :icon=>"fa fa-user",
          :breadcrumb=>{
            "Un-archived Web Admin List"=> "",
        }
      }
         
      when "users#new-3"
        get_particular_school(parameters[1])
        @breadcrumb = {
          :title=>"Add Teacher",
		      :icon=>"btg btg-teacher",
          :breadcrumb=>{
            "School List"=> schools_path,
            @school_name.name => school_path(:id=>parameters[1], :role_id => parameters[0]),
            "Teacher List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
            "Add Teacher"=> "",
        }
      }
      
      when "users#index-3"
        get_particular_school(parameters[1])
        @breadcrumb = {
          :title=>"Teacher List",
		      :icon=>"btg btg-teacher",
          :breadcrumb=>{
           "School List"=> schools_path,
           @school_name.name => school_path(:id=>parameters[1], :role_id => parameters[0]),
            "Teacher List"=> "",
        }
      }
      
      when "users#show-3"
        get_particular_school(parameters[1])
		    if !parameters[2].blank? && parameters[2].eql?(current_user.id.to_s)
          @breadcrumb = {
          :title=>"My Information",
   	      :icon=>"btg btg-teacher",
          :breadcrumb=>{
   	       "School List"=> schools_path,
            "Teacher List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
            "My Information"=> "",
          }
        }
		    else
          @breadcrumb = {
          :title=>"Teacher Information",
   	      :icon=>"btg btg-teacher",
          :breadcrumb=>{
   	       "School List"=> schools_path,
           @school_name.name => school_path(:id=>parameters[1], :role_id => parameters[0]),
            "Teacher List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
            "Teacher Information"=> "",
          }
        }
		  end
         
      when "users#edit-3"
        get_particular_school(parameters[1])
		    if !parameters[2].blank? && parameters[2].eql?(current_user.id.to_s)
          @breadcrumb = {
            :title=>"Edit My Information",
  		      :icon=>"btg btg-teacher",
            :breadcrumb=>{
             "School List"=> schools_path,
              "Teacher List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
              "Edit My Information"=> "",
          }
        }
		    else
          @breadcrumb = {
            :title=>"Edit Teacher Information",
  		      :icon=>"btg btg-teacher",
            :breadcrumb=>{
             "School List"=> schools_path,
             @school_name.name => school_path(:id=>parameters[1], :role_id => parameters[0]),
              "Teacher List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
              "Edit Teacher Information"=> "",
          }
        }	
		  end
      
      when "users#import_list-teacher"
        @breadcrumb = {
          :title=>"Import Teacher List",
  		    :icon=>"fa fa-building-o",
          :breadcrumb=>{
            "Teacher List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[1], :school_id => parameters[2]),
            "Import Teacher List"=> "",
        }
      }
       
      when "users#new-4"
        get_particular_school(parameters[1])
        @breadcrumb = {
          :title=>"Add Student",
		      :icon=>"btg btg-student",
          :breadcrumb=>{
            "School List"=> schools_path,
            @school_name.name => school_path(:id=>parameters[1], :role_id => parameters[0]),
            "Student List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
            "Add Student"=> "",
        }
      }
      
      when "users#edit-4"
        get_particular_school(parameters[1])
        @breadcrumb = {
          :title=>"Edit Student Information",
		      :icon=>"btg btg-student",
          :breadcrumb=>{
            "School List"=> schools_path,
            @school_name.name => school_path(:id=>parameters[1], :role_id => parameters[0]),
            "Student List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
            "Edit Student Information"=> "",
        }
      }
      
      when "users#show-4"
        get_particular_school(parameters[1])
        @breadcrumb = {
          :title=>"Student Information",
  	      :icon=>"btg btg-student",
          :breadcrumb=>{
  	        "School List"=> schools_path,
            @school_name.name => school_path(:id=>parameters[1], :role_id => parameters[0]),
            "Student List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
            "Student Information"=> "",
        }
      }
      
      when "users#index-4"
        get_particular_school(parameters[1])
        @breadcrumb = {
          :title=>"Student List",
		      :icon=>"btg btg-student",
          :breadcrumb=>{
            "School List"=> schools_path,
            @school_name.name => school_path(:id=>parameters[1], :role_id => parameters[0]),
            "Student List"=> "",
        }
      }
      
      when "users#import_list-student"
        @breadcrumb = {
          :title=>"Import Student List",
  		    :icon=>"fa fa-building-o",
          :breadcrumb=>{
            "Student List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[1], :school_id => parameters[2]),
            "Import Student List"=> "",
        }
      }
      
      when "users#import"
        @breadcrumb = {
          :title=>"Import User List",
  		    :icon=>"fa fa-user",
          :breadcrumb=>{
           # "Student List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[1], :school_id => parameters[2]),
            "Import User List"=> "",
        }
      }
      
      when "classrooms#import"
        @breadcrumb = {
          :title=>"Import Class List",
          :icon=>"fa fa-users",
          :breadcrumb=>{
            "Class List"=> (url_for :controller => 'classrooms', :action => 'index', :school_id => parameters[0]),
            "Import Class List"=> "",
        }
      }

      when "classrooms#import_list"
        @breadcrumb = {
          :title=>"Import Class List",
          :icon=>"fa fa-users",
          :breadcrumb=>{
            "Class List"=> (url_for :controller => 'classrooms', :action => 'index', :school_id => parameters[0]),
            "Import Class List"=> "",
        }
      }

      when "classrooms#index"
        get_particular_school(parameters[0])
        @breadcrumb = {
          :title=>"Class List",
			    :icon=>"fa fa-users",
          :breadcrumb=>{
			      "School List"=> schools_path,
            @school_name.name => school_path(:id=>parameters[0]),
            "Class List"=> "",
        }
      }
      
      when "classrooms#new"
        get_particular_school(parameters[0])
		    @breadcrumb = {
          :title=>"Add New Class",
			    :icon=>"fa fa-users",
          :breadcrumb=>{
            "School List"=> schools_path,
            @school_name.name => school_path(:id=>parameters[0]),
			      "Class List"=> (url_for :controller => 'classrooms', :action => 'index', :school_id => parameters[0]),
            "Add New Class"=> "",
        }
      }
      
      when "classrooms#edit"
        get_particular_school(parameters[0])
        @breadcrumb = {
          :title=>"Edit Class Information",
			    :icon=>"fa fa-users",
          :breadcrumb=>{
            "School List"=> schools_path,
            @school_name.name => school_path(:id=>parameters[0]),
            "Class List"=> (url_for :controller => 'classrooms', :action => 'index', :school_id => parameters[0]),
            "Edit Class Information"=> "",
        }
      } 
		  
      when "classrooms#show"
        get_particular_school(parameters[0])
        @breadcrumb = {
          :title=>"Class Information",
  			  :icon=>"fa fa-users",
          :breadcrumb=>{
            "School List"=> schools_path,
            @school_name.name => school_path(:id=>parameters[0]),
            "Class List"=> (url_for :controller => 'classrooms', :action => 'index', :school_id => parameters[0]),
            "Class Information"=> "",
        }
      }
			
      when "licenses#new"
        get_particular_school(parameters[0])
  		  @breadcrumb = {
          :title=>"Add / Edit / Delete License",
  		    :icon=>"btg btg-lisence",
          :breadcrumb=>{
            "School List"=> schools_path,
            @school_name.name => school_path(:id=>parameters[0]),
  			    "School List"=> (url_for :controller => 'schools', :action => 'index', :school_id => parameters[0]),
            "Add / Edit / Delete License"=> "",
        }
      }
      
      when "books#index"
        @breadcrumb = {
          :title=>"Book List",
  		    :icon=>"glyphicon glyphicon-book",
          :breadcrumb=>{
            "Book List"=> "",
        }
      }
		
      when "books#show"
        @breadcrumb = {
          :title=>"Book Information",
  	      :icon=>"glyphicon glyphicon-book",
          :breadcrumb=>{
		        "Books List"=> books_path,
            "Book Information"=> "",
        }
      }
		
      when "books#new"
        @breadcrumb = {
          :title=>"Add New Book",
  		    :icon=>"glyphicon glyphicon-book",
          :breadcrumb=>{
            "Add New Book"=> "",
        }
      }
      
      when "books#edit"
        @breadcrumb = {
          :title=>"Edit Book Information",
  	      :icon=>"glyphicon glyphicon-book",
          :breadcrumb=>{
            "Books List"=> books_path,
            "Edit Book Information"=> "",
        }
      }	
         
      else
        @breadcrumb = {
          :title=>"Dashboard",
          :breadcrumb=>{
            "School List"=> "",
          }
        }  
      end  
  end
end
