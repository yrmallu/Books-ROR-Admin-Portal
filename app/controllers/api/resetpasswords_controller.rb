class Api::ResetpasswordsController < ApplicationController
	skip_before_filter :authentication_check
	before_filter :set_headers
  
  def get_student_email
      student_info = JSON.parse(params[:p])
      query = ""
      query << "lower(username) = lower('#{student_info["username"]}')"
      query << " and school_id = '#{student_info["school_id"]}'" unless student_info["school_id"].blank?
      query << " and role_id = '#{student_info["role_id"]}'" unless student_info["role_id"].blank?
      @user = User.includes(:classrooms, :parents).where(query).last
      response_data = []
      s_teachers = []
      s_parents = []
      unless @user.blank?
        json_data = {"return_code" => 1, "return_msg" => "linked email addresses for student"}
        @user.classrooms.each do |room|
          room.users.un_archived.teachers.each do |teacher|
            teachers = {}
            teachers.store("id",teacher.id)
            teachers.store("name",teacher.first_name+" "+teacher.last_name.to_s)
            teachers.store("email",teacher.email)
            teachers.store("role","Teacher")
            s_teachers << teachers
          end
        end
        @user.parents.each do |parent|
          parents = {}
          parents.store("id",parent.id)
          parents.store("name",parent.name)
          parents.store("email",parent.email)
          parents.store("role","Parent")
          s_parents << parents
          p s_parents
        end
        response_data += s_parents.uniq unless s_parents.blank?
        response_data += s_teachers.uniq unless s_teachers.blank?
        json_data.store("response_data",response_data)
      else
        json_data = {"return_code" => 0, "return_msg" => "not found"}
      end
      render :json => json_data
  end
  
  def send_reset_password_email
    user_mail = JSON.parse(params[:p])
    unless user_mail["email"].blank?
      @user = User.where("lower(email) = lower('#{user_mail["email"]}')").last || Parent.where("lower(email) = lower('#{user_mail["email"]}')").last
      unless @user.blank?
        unless user_mail["username"].blank?
          pwd_param = {"username" => user_mail["username"], "school_id" => user_mail["school_id"], "a_type" => "angular"}.to_json
          user_info = {:email => @user.email, :username => User.eql?(@user.class) ?  @user.first_name+" "+@user.last_name.to_s : @user.name, :link => "http://"+request.env['HTTP_HOST']+"/reset_password?password_key="+Base64.encode64(pwd_param.to_s), :url =>  "http://"+request.env['HTTP_HOST'] } 
        else
          pwd_param = {"email" => @user.email, "a_type" => "angular"}.to_json
          user_info = {:email => @user.email, :username => @user.first_name+" "+@user.last_name.to_s, :link => "http://"+request.env['HTTP_HOST']+"/reset_password?password_key="+Base64.encode64(pwd_param.to_s), :url =>  "http://"+request.env['HTTP_HOST'] } 
        end
        UserMailer.forgot_password_email(user_info).deliver
        json_data = {"return_code" => 1, "return_msg" => "sent successfully", "response_data" => ""}
      else
        json_data = {"return_code" => 0, "return_msg" => "not found", "response_data" => ""}
      end
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

