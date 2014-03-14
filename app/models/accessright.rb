class Accessright < ActiveRecord::Base
  has_many :role_accessrights
  has_many :roles, :through => :role_accessrights
end
