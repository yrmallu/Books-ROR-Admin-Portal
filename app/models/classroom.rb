class Classroom < ActiveRecord::Base
  has_many :user_classrooms
  has_many :users, :through => :user_classrooms
end
