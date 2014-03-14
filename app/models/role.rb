class Role < ActiveRecord::Base
  has_many :role_accessrights
  has_many :accessrights, :through => :role_accessrights
  has_many :users
end
