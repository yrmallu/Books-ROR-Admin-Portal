class Accessright < ActiveRecord::Base
  has_and_belongs_to_many :roles
  has_many :user_accessrights
  has_many :users, :through => :user_accessrights
end
