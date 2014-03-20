class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         
  has_many :user_classrooms    
  has_many :classrooms, :through => :user_classrooms  
  has_one :studentinfo 
  has_one :userinfo
  belongs_to :school
  belongs_to :role
  has_many :accessrights, :through => :user_accessrights
  
  # def role_access_rights
#     self.role.blank? ? [] : self.role.accessrights.blank? ? [] : self.role.accessrights
#   end
#   
#   def added_user_access_rights
#     self.accessrights.where("access_flag = false")
#   end
#   
#   def role_access_rights
#     self.role.blank? ? [] : self.role.accessrights.blank? ? [] : self.role.accessrights
#   end
#   
#   def user_permissions
#     return (role_access_rights + added_user_access_rights) - removed__user_access_rights
#   end
#   
#   def user_permission_names
#     user_permissions.blank? ? role_access_rights : user_permissions
#   end
  
  
end
