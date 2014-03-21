class Role < ActiveRecord::Base
  has_many :users
  has_many :user_accessrights
  has_and_belongs_to_many :accessrights
end
