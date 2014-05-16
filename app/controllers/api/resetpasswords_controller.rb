class Api::ResetpasswordsController < ApplicationController
	skip_before_filter :authentication_check
	before_filter :set_headers
  
  def get_student_email
      student_info = JSON.parse(params[:p])
      query = ""
      query << "username = '#{student_info["username"]}'"
      query << " and school_id = '#{student_info["school_id"]}'" unless params[:school_id].blank?
      query << " and role_id = '#{student_info["role_id"]}'" unless params[:role_id].blank?
      @user = User.includes(:classrooms).where(query).last
      json_data = {"return_code" => 1, "return_msg" => "linked email addresses for student"}
      response_data = []
      teachers = {}
      parents = {}
      unless @user.blank?
        @user.classrooms.each do |room|
          room.users.teachers.each do |teacher|
            teachers.store("id",teacher.id)
            teachers.store("name",teacher.first_name)
            teachers.store("email",teacher.email)
            teachers.store("role","teacher")
          end
        end
        @user.parents.each do |parent|
          parent.store("id",parent.id)
          parent.store("name",parent.name)
          parent.store("email",parent.email)
          parent.store("role","parent")
        end
      end
      response_data << parents << teachers
      json_data.store("response_data",response_data)
      render :json => json_data
  end
  
  def send_reset_password_email
    user_mail = JSON.parse(params[:p])
    unless user_mail["email"].blank?
      @user = User.where("email = '#{user_mail["email"]}'").last || Parent.where("email = '#{user_mail["email"]}'").last
      unless @user.blank?
        unless user_mail["username"].blank?
          user_info = {:email => @user.email, :username => @user.name, :link => "http://"+request.env['HTTP_HOST']+"/reset_password?username="+Base64.encode64(user_mail["username"])+"&school_id="+Base64.encode64(user_mail["school_id"].to_s), :url =>  "http://"+request.env['HTTP_HOST'] } 
        else
          user_info = {:email => @user.email, :username => @user.first_name+" "+@user.last_name.to_s, :link => "http://"+request.env['HTTP_HOST']+"/reset_password?email="+Base64.encode64(@user.email), :url =>  "http://"+request.env['HTTP_HOST'] } 
        end
        UserMailer.forgot_password_email(user_info).deliver
      end
      json_data = {"return_code" => 1, "return_msg" => "sent successfully", "response_data" => ""}  
    else
      json_data = {"return_code" => 1, "return_msg" => "not found", "response_data" => ""}    
    end
    render :json => json_data
  end
	
	 def set_headers
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Expose-Headers'] = 'Etag'
      headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD'
      headers['Access-Control-Allow-Headers'] = '*, x-requested-with, Content-Type, If-Modified-Since, If-None-Match'
      headers['Access-Control-Max-Age'] = '86400'
    end
end
# [{"id":"about_book", "name":"About this book"},{"id":"welcome", "name":"About Borne Digital"},{"id":"story1", "name":"Story"}]

