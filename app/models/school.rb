class School < ActiveRecord::Base
  has_many :licenses
  has_many :users
end
