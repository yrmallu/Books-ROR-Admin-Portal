class School < ActiveRecord::Base
	validates :name, :presence=>true
	validates :name, :presence=>true, :uniqueness=>{:case_sensitive=>false}
	has_many :licenses
	accepts_nested_attributes_for :licenses, :allow_destroy=> true, :reject_if => :all_blank
end
