class School < ActiveRecord::Base
	validates :name, :presence=>true
	validates :name, :presence=>true, :uniqueness=>{:case_sensitive=>false}
	
	has_many :licenses
	has_many :users
	has_many :classrooms
	
	accepts_nested_attributes_for :licenses, :allow_destroy=> true, :reject_if => :all_blank
	
	before_create :generate_random_code
	
	paginates_per 10
	max_paginates_per 10
	
	def generate_random_code
    self.code = School.count == 0 ? 10001:School.maximum("code") + 1
  end
	
end
