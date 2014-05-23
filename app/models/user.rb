class User < ActiveRecord::Base
 
  include CommonQueries
  paginates_per 10
  max_paginates_per 10
  has_secure_password
  store_accessor :userinfo, :phone_number, :user_level, :grade, :reading_ability, :reading_based_on
  cattr_accessor :app_route
  cattr_accessor :current_user
  ###########################################################################################
  ## Callbacks
  ###########################################################################################      

  before_save { self.email = email.downcase }  
  
  ###########################################################################################
  ## Relationships
  ###########################################################################################      
  
  has_many :user_classrooms    
  has_many :classrooms, :through => :user_classrooms
  has_many :accessrights, :through => :user_accessrights  
  belongs_to :school
  belongs_to :role
  has_many :user_accessrights
  has_one :reading_grade
  has_many :parents
  belongs_to :license
  before_update :update_license_count
  before_update :user_details_change_email
  
  accepts_nested_attributes_for :parents, :allow_destroy=> true, :reject_if => :all_blank

  ###########################################################################################
  ## Attachments
  ###########################################################################################

  has_attached_file :photos, :style => { :medium => "300x300>",  :thumb => "100x100>" },
                             :url  => "/users/images/:id/:style/:basename.:extension",
                             :path => ":rails_root/public/users/images/:id/:style/:basename.:extension"
                 
  
  ###########################################################################################
  ## Scopes
  ###########################################################################################

  scope :by_newest, -> {order("created_at DESC")}
  scope :un_archived, -> {where(delete_flag: false)}
  scope :web_admins, -> { where(role_id: 1) }
  scope :school_admins, -> { where(role_id: 2) }
  scope :teachers, -> { where(role_id: 3) }
  scope :students, -> { where(role_id: 4) }



  ###########################################################################################
  ## Validations
  ###########################################################################################  

  validates :username, :presence=> true, :length => {:maximum => 255}, :format => {:with=> NO_SPACE_REGEX}, :uniqueness=>{:case_sensitive=>false}, :if => :username_uniqness?
  validates :email, :presence=> true, :length => {:maximum => 255}, :if => :not_student?
  validates :email, :format=>{:with=> VALID_EMAIL_REGEX }, :allow_blank=>true, :uniqueness=>{:case_sensitive=>false, conditions: -> { where.not(delete_flag: 'true') }}
  validates :first_name, :presence=> true, :length => {:maximum => 255}, :format => { :with => LETTER_ONLY_REGEX }
  validates :last_name, :presence=> true, :length => {:maximum => 255}, :format => { :with => LETTER_ONLY_REGEX }
  #validates :school_id, :presence=> {:message => "Select School."}
  #validates :password, :presence => true, :confirmation => true, :format => {:with=> NO_SPACE_REGEX}, :length => { :minimum => 5, :message =>  'Minimum length 5 charater.'}
  validates_attachment_size :photos, :less_than => 5.megabytes
  validates_attachment_content_type :photos, :content_type => /\Aimage\/.*\Z/
  
  ###########################################################################################
  ## Methods
  ###########################################################################################

  def not_student?
    if (self.role.name.eql?('Web Admin') || self.role.name.eql?('School Admin') || self.role.name.eql?('Teacher'))
      return true
    else
      return false
    end unless self.role.blank?
  end
  
  def username_uniqness?
    query = "username = '#{username}'"
    query << " and school_id = '#{school_id}'" unless school_id.blank?
    query << " and id != #{id}" unless id.blank?
    query << " and role_id = '#{role_id}'" unless role_id.blank? if school_id.blank?
    user = User.where(query)
    unless user.blank?
      return true
    else
      return false
    end
  end
  
  def is_web_admin?
  	 self.role.name.eql?("Web Admin") unless self.role.blank?
  end
  
  def is_school_admin?
  	 self.role.name.eql?("School Admin") unless self.role.blank?
  end
 
  def assign_accessright(accessright_id)
    self.user_accessrights.create(:accessright_id=>accessright_id, :access_flag=>false, :role_id=>self.role_id) unless accessright_id.blank?
  end
  
  def update_license_count
    if self.license_id_was.blank?
  	  assign_new_license unless self.license_id.blank?
  	elsif self.license_id != (self.license_id_was)
  	  remove_license(self.license_id_was)
  	  assign_new_license unless self.license_id.blank?
  	end	
  end
  
  def assign_new_license
    @new_license = License.find(self.license_id)
    @new_license.update_attributes(:used_liscenses=> @new_license.used_liscenses.to_i + 1)
  end
  
  def remove_license(license_id)
    @old_license = License.find(license_id) 
    @old_license.update_attributes(:used_liscenses=> @old_license.used_liscenses.to_i - 1)
  end
  
  def welcome_email(path)
    user_info = {:email => self.email, :firstname => self.first_name, :lastname => self.last_name.to_s, :username=> self.username.to_s, :reset_pass_url => "http://"+path+"/reset_password?email="+Base64.encode64(self.email), :link => "http://"+path+"/users/"+self.id.to_s+"/edit?role_id="+self.role_id.to_s+"&school_id="+self.school_id.to_s, :login_url =>  "http://"+path } 
	UserMailer.welcome_email(user_info).deliver
  end
  
  def user_details_change_email
    if !self.email.blank? && !current_user.blank?
      unless self.school_id.blank? 
        link_url = "http://"+app_route+"/users/"+self.id.to_s+"/edit?role_id="+self.role_id.to_s+"&school_id="+self.school_id.to_s 
      else
        link_url = "http://"+app_route+"/users/"+self.id.to_s+"/edit?role_id="+self.role_id.to_s
      end
    
	  arr_changed_attributes = []
	  if !self.first_name_was.eql?(self.first_name) && !self.first_name.blank?
	    arr_changed_attributes << 'First Name'
	  end
      if !self.last_name_was.eql?(self.last_name) && !self.last_name.blank?
        arr_changed_attributes << 'Last Name'
      end
      if !self.username_was.eql?(self.username) && !self.username.blank?
	    arr_changed_attributes << 'Username'
      end
	  if !self.userinfo_was.eql?(self.userinfo) && !self.userinfo.blank?
	    arr_changed_attributes << 'Phone Number OR Grade OR Reading level'
	  end
	  if !self.password_digest_was.eql?(self.password_digest) && !self.password_digest.blank?
	    arr_changed_attributes << 'Password'
	  end
      if !self.email_was.eql?(self.email) && !self.email.blank? 
	    arr_changed_attributes << 'Email'
	    user_info = {:email => email_was, :name => self.first_name, :username => self.username.to_s, :current_user => current_user.first_name+" "+current_user.last_name.to_s, :new_email=> self.email, :changed_attributes => arr_changed_attributes.join(","), :reset_pass_url => "http://"+app_route+"/reset_password?email="+Base64.encode64(self.email), :link => link_url, :login_url =>  "http://"+app_route } 
	    UserMailer.user_email_changed(user_info).deliver unless self.email_was.blank?
	  end
	  unless arr_changed_attributes.empty?
        user_info = {:email => self.email, :name => self.first_name, :username => self.username.to_s, :current_user => current_user.first_name+" "+current_user.last_name.to_s, :changed_attributes => arr_changed_attributes.join(","), :reset_pass_url => "http://"+app_route+"/reset_password?email="+Base64.encode64(self.email), :link => link_url, :login_url =>  "http://"+app_route } 
	    UserMailer.user_details_changed(user_info).deliver
      end
    end
  end
  
	#   def user_details_change_email(current_user, path)
	#     user_info = {:email => self.email, :username => self.first_name+" "+self.last_name.to_s, :current_user => current_user, :reset_pass_url => "http://"+path+"/reset_password?email="+Base64.encode64(self.email), :link => "http://"+path+"/users/"+self.id.to_s+"/edit?role_id="+self.role_id.to_s+"&school_id="+self.school_id.to_s, :login_url =>  "http://"+path } 
	# UserMailer.user_details_changed(user_info).deliver
	#   end
	#   
	#   def user_email_change_email(current_user, path, emails)
	#     user_info = {:email => self.email, :username => self.first_name+" "+self.last_name.to_s, :current_user => current_user, :reset_pass_url => "http://"+path+"/reset_password?email="+Base64.encode64(self.email), :link => "http://"+path+"/users/"+self.id.to_s+"/edit?role_id="+self.role_id.to_s+"&school_id="+self.school_id.to_s, :login_url =>  "http://"+path } 
	#     UserMailer.user_email_changed(user_info, emails).deliver
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
  
  def self.search(query_string, role_id, school_id)
    roleid = role_id.id.to_i
    schoolid = role_id.name.eql?("Web Admin") ? nil : school_id.to_i  
    user = User.arel_table
    users = User.where(
      user[:role_id].eq(roleid).and(
        user[:school_id].eq(schoolid).and(
          user[:first_name].matches(query_string).or(
            user[:last_name].matches(query_string).or(
              user[:username].matches(query_string).or(
                user[:email].matches(query_string)
                )
              )
            )
          )
        )
      )
  end
  
  def self.search_all(query_string)
    arr_query_string = query_string.split(',')
    arrayConditions = Array.new
	school_ids = []
	arrayConditions << '(first_name ILIKE ' + "'%" + arr_query_string[0].tr("%'","").to_s + "%')" unless(arr_query_string[0].tr("%'","").to_s.blank?)
	arrayConditions << '(last_name ILIKE ' + "'%" + arr_query_string[1].tr("%'","").to_s + "%')" unless(arr_query_string[1].tr("%'","").to_s.blank?)
	arrayConditions << '(username ILIKE ' + "'%" + arr_query_string[2].tr("%'","").to_s + "%')" unless(arr_query_string[2].tr("%'","").to_s.blank?)
	arrayConditions << '(email ILIKE ' + "'%" + arr_query_string[3].tr("%'","").to_s + "%')" unless(arr_query_string[3].tr("%'","").to_s.blank?)
	strConditions = arrayConditions.join(' OR ') unless arrayConditions.empty?
    if strConditions.blank? && !arr_query_string[4].tr("%'","").to_s.blank?
	  school_ids = School.where('(name ILIKE ' + "'%" + arr_query_string[4].tr("%'","").to_s + "%') AND delete_flag = false").map(&:id)
	  arrayConditions << 'school_id IN ' + '(' + school_ids.join(",") + ')' unless school_ids.blank?
	  final_strCondition = arrayConditions unless arrayConditions.empty?
	else 
	  unless arr_query_string[4].tr("%'","").to_s.blank?
	    school_ids = School.where('(name ILIKE ' + "'%" + arr_query_string[4].tr("%'","").to_s + "%') AND delete_flag = false").map(&:id)
	    final_strCondition = '(' + strConditions + ')' + 'AND (school_id IN ' + '(' + school_ids.join(",") + '))' unless school_ids.blank?
	  end
	  final_strCondition = strConditions
	end
	users = User.where(final_strCondition)

    #user = User.arel_table
	# users = User.where(
#   	    user[:first_name].matches(qs_fn).or(
#   			user[:last_name].matches(qs_ln).or(
# 			   user[:email].matches(qs_email).or(
#   				  user[:username].matches(qs_un)
#  				  )
# 				)
# 			)
#   		)
  end
  
end
