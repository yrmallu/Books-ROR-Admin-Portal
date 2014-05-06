class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  include SessionsHelper
  hide_action :current_user
  
  before_filter :authentication_check
  
  rescue_from Exception, :with => :render_error
  rescue_from ActiveRecord::RecordNotFound, :with => :render_not_found   
  rescue_from ActionController::RoutingError, :with => :render_not_found
  
  USER, PASSWORD = 'books-that-grow', 'qwerty123'
    
  helper_method :current_user
  helper_method :local_ip
  
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  
  def authentication_check
    authenticate_or_request_with_http_basic do |user, password|
      user == USER && password == PASSWORD
    end
  end
 
   #called by last route matching unmatched routes.  Raises RoutingError which will be rescued from in the same way as other exceptions.
   def raise_not_found!
     raise ActionController::RoutingError.new("No route matches #{params[:unmatched_route]}")
   end
 
   #render 500 error 
   def render_error(e)
     respond_to do |f| 
       f.html{ render :file => "#{Rails.root}/public/500.html", :status => 500 }
       # f.js{ render :partial => "public/ajax_500", :status => 500 }
     end
   end
  
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
      @schools = School.by_newest.page params[:page]
	  else
	    @schools << @current_user.school
	  end
  end
  
  def get_all_schools
    @schools = School.by_newest
  end
  
  def get_school_by_id
    @school = School.find(params[:school_id]) unless params[:school_id].blank?
  end
  
  def get_accessright
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
    
    case selector

      when "users#dashboard"
        @breadcrumb = {
          :title=>"Dashboard",
          :breadcrumb=>{
            "Dashboard"=> ""
          }
        }
		
      when "accessrights#new"
        @breadcrumb = {
          :title=>"Add Accessrights",
		  :icon=>"glyphicon glyphicon-ban-circle",
          :breadcrumb=>{
            "Add Accessright"=> ""
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
		
      when "schools#show"
       @breadcrumb = {
       :title=>"School Details",
	   :icon=>"fa fa-building-o",
       :breadcrumb=>{
	     "School List"=> schools_path,
         "School Details"=> "",
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
          :title=>"Edit School Details",
		  :icon=>"fa fa-building-o",
          :breadcrumb=>{
            "School List"=> schools_path,
            "Edit School Details"=> "",
          }
        }


      when "users#new-2"
	  @breadcrumb = {
        :title=>"Add School Admin",
		:icon=>"btg btg-admin",
        :breadcrumb=>{
          "School List"=> schools_path,
          "School Admin List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
          "Add School Admin"=> "",
        }
      }    
      when "users#index-2"
      @breadcrumb = {
        :title=>"School Admin List",
		:icon=>"btg btg-admin",
        :breadcrumb=>{
          "School List"=> schools_path,
		  "School Admin List"=> "",
        }
      }
      when "users#show-2"
       @breadcrumb = {
       :title=>"School Admin Details",
	   :icon=>"btg btg-admin",
       :breadcrumb=>{
	     "School List"=> schools_path,
         "School Admin List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
         "School Admin Details"=> "",
         }
       }
      when "users#edit-2"
      @breadcrumb = {
        :title=>"Edit School Admin Details",
		:icon=>"btg btg-admin",
        :breadcrumb=>{
          "School List"=> schools_path,
          "School Admin List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
          "Edit School Admin Details"=> "",
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
        when "users#index-1"
        @breadcrumb = {
          :title=>"Web Admin List",
		  :icon=>"fa fa-user",
          :breadcrumb=>{
            "Web Admin List"=> "",
          }
        }
        when "users#show-1"
         @breadcrumb = {
         :title=>"Web Admin Details",
  	     :icon=>"fa fa-user",
         :breadcrumb=>{
           "Web Admin List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0]),
           "School Admin Details"=> "",
           }
         }
        when "users#edit-1"
        @breadcrumb = {
          :title=>"Edit Web Admin Details",
		  :icon=>"fa fa-user",
          :breadcrumb=>{
            "Web Admin List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0]),
            "Edit web admin info"=> "",
          }
        }   


        when "users#new-3"
        @breadcrumb = {
          :title=>"Add Teacher",
		  :icon=>"btg btg-teacher",
          :breadcrumb=>{
            "School List"=> schools_path,
            "Teacher List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
            "Add Teacher"=> "",
          }
        }
        when "users#index-3"
        @breadcrumb = {
          :title=>"Teacher List",
		  :icon=>"btg btg-teacher",
          :breadcrumb=>{
           "School List"=> schools_path,
            "Teacher List"=> "",
          }
        }
        when "users#show-3"
         @breadcrumb = {
         :title=>"Teacher Details",
  	     :icon=>"btg btg-teacher",
         :breadcrumb=>{
  	       "School List"=> schools_path,
           "Teacher List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
           "Teacher Details"=> "",
           }
         }
        when "users#edit-3"
        @breadcrumb = {
          :title=>"Edit Teacher Details",
		  :icon=>"btg btg-teacher",
          :breadcrumb=>{
           "School List"=> schools_path,
            "Teacher List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
            "Edit teacher info"=> "",
          }
        }


        when "users#new-4"
        @breadcrumb = {
          :title=>"Add Student",
		  :icon=>"btg btg-student",
          :breadcrumb=>{
            "School List"=> schools_path,
            "Student List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
            "Add Student"=> "",
          }
        }
        when "users#edit-4"
        @breadcrumb = {
          :title=>"Edit Student Details",
		  :icon=>"btg btg-student",
          :breadcrumb=>{
            "School List"=> schools_path,
            "Student List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
            "Edit Student info"=> "",
          }
        }
        when "users#show-4"
         @breadcrumb = {
         :title=>"Student Details",
  	     :icon=>"btg btg-student",
         :breadcrumb=>{
  	       "School List"=> schools_path,
           "Student List"=> (url_for :controller => 'users', :action => 'index', :role_id => parameters[0], :school_id => parameters[1]),
           "Student Details"=> "",
           }
         }
        when "users#index-4"
        @breadcrumb = {
          :title=>"Student List",
		  :icon=>"btg btg-student",
          :breadcrumb=>{
           "School List"=> schools_path,
            "Student List"=> "",
          }
        }
		
        when "classrooms#index"
          @breadcrumb = {
            :title=>"Classroom List",
			:icon=>"fa fa-users",
            :breadcrumb=>{
			  "School List"=> schools_path,
              "Classroom List"=> "",
            }
          }
        when "classrooms#new"
		  @breadcrumb = {
            :title=>"Add New Classroom",
			:icon=>"fa fa-users",
            :breadcrumb=>{
              "School List"=> schools_path,
			  "Classroom List"=> (url_for :controller => 'classrooms', :action => 'index', :school_id => parameters[0]),
              "Add new classroom"=> "",
            }
          }
        when "classrooms#edit"
          @breadcrumb = {
            :title=>"Edit Classroom Details",
			:icon=>"fa fa-users",
            :breadcrumb=>{
              "School List"=> schools_path,
              "Classroom List"=> (url_for :controller => 'classrooms', :action => 'index', :school_id => parameters[0]),
              "Edit classroom info"=> "",
            }
          } 
		  
          when "classrooms#show"
            @breadcrumb = {
              :title=>"Classroom Details",
  			  :icon=>"fa fa-users",
              :breadcrumb=>{
                "School List"=> schools_path,
                "Classroom List"=> (url_for :controller => 'classrooms', :action => 'index', :school_id => parameters[0]),
                "Edit classroom info"=> "",
              }
            }
			
         when "licenses#new"
  		  @breadcrumb = {
            :title=>"Add / Edit / Delete License",
  			:icon=>"btg btg-lisence",
              :breadcrumb=>{
              "School List"=> schools_path,
  			  "School List"=> (url_for :controller => 'schools', :action => 'index', :school_id => parameters[0]),
              "Add new license"=> "",
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
         :title=>"Book Details",
  	     :icon=>"glyphicon glyphicon-book",
         :breadcrumb=>{
		   "Books List"=> books_path,
           "Book Details"=> "",
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
            :title=>"Edit Book Details",
  		    :icon=>"glyphicon glyphicon-book",
            :breadcrumb=>{
              "Books List"=> books_path,
              "Edit Book Details"=> "",
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
