class UserClassroom < ActiveRecord::Base
  belongs_to :user
  belongs_to :classroom
  
  self.primary_key = :id 
end