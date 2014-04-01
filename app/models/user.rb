class User < ActiveRecord::Base
  
  paginates_per 10
  max_paginates_per 10
  
  has_secure_password
  before_save { self.email = email.downcase }
         
  has_many :user_classrooms    
  has_many :classrooms, :through => :user_classrooms
  has_many :accessrights, :through => :user_accessrights  
  belongs_to :school
  belongs_to :role
  has_many :user_accessrights
  belongs_to :user
  has_one :license
  #before_save :update_license_count
  
  store_accessor :userinfo, :phone_number, :license_id, :user_level, :grade, :reading_ability, :reading_based_on, :profile_pic, :parent_name, :parent_email
  
  def welcome_email(path)
    user_info = {:email => self.email, :username => self.first_name+" "+self.last_name.to_s, :reset_pass_url => "http://"+path+"/reset_password?email="+Base64.encode64(self.email), :link => "http://"+path+"/users/"+self.id.to_s+"/edit?role_id="+self.role_id.to_s, :login_url =>  "http://"+path } 
	UserMailer.welcome_email(user_info).deliver
  end
  
  def user_details_change_email(current_user, path)
    changed_vals = Array.new  
	if !self.first_name.eql?(self.first_name_was)
	  changed_vals << "First Name " 
	elsif !self.last_name != (self.last_name_was)	 
	  changed_vals << "Last Name "
	elsif !self.email != (self.email_was)	 
	  changed_vals << "Email "
      user_info = {:email => self.email, :username => self.first_name+" "+self.last_name.to_s, :current_user => current_user, :new_email => self.email , :reset_pass_url => "http://"+path+"/reset_password?email="+Base64.encode64(self.email), :link => "http://"+path+"/users/"+self.id.to_s+"/edit?role_id="+self.role_id.to_s, :login_url =>  "http://"+path } 
  	  UserMailer.user_email_changed(user_info).deliver
	end

    user_info = {:email => self.email, :username => self.first_name+" "+self.last_name.to_s, :current_user => current_user, :changed_values => changed_vals , :reset_pass_url => "http://"+path+"/reset_password?email="+Base64.encode64(self.email), :link => "http://"+path+"/users/"+self.id.to_s+"/edit?role_id="+self.role_id.to_s, :login_url =>  "http://"+path } 
	UserMailer.user_details_changed(user_info).deliver
  end
  
  # def update_license_count
#     p "current lic====", user.license_id
# 	p "old lic ====", user.license_id_was	
#   end
  
  def access_to_remove_or_add(options={})
    options[:accessright].each do |access|
      unless (options[:removed] + options[:added]).include?(access)
        self.user_accessrights.create(:accessright_id=>access, :access_flag=>options[:boolean], :role_id=>self.role.id)
      else
        self.user_accessrights.where("accessright_id=#{access}").first.update({:access_flag=>options[:boolean], :role_id=>self.role.id})
      end        
    end 
  end
  
  def added_user_access_rights
    self.accessrights.where("access_flag = false")
  end
  
  def removed__user_access_rights
    self.accessrights.where("access_flag = true")
  end
  
  def role_access_rights
    self.role.blank? ? [] : self.role.accessrights.blank? ? [] : self.role.accessrights
  end
  
  def user_permissions
    return (role_access_rights + added_user_access_rights) - removed__user_access_rights
  end
  
  def user_permission_names
    user_permissions.blank? ? role_access_rights : user_permissions
  end
  
  def check_user_role_id
    Rails.cache.delete('user_accessrights_'+self.id.to_s) if self.role_id_changed?
  end
  
end
