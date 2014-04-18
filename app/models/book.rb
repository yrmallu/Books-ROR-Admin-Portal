class Book < ActiveRecord::Base
  self.primary_key = "id"
  has_many :images
  
  accepts_nested_attributes_for :images, :allow_destroy=> true, :reject_if => :all_blank
  validates_presence_of :title
 
  paginates_per 10
  max_paginates_per 10
end
