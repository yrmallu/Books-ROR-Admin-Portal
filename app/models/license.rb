class License < ActiveRecord::Base
	belongs_to :school
	has_many :users
	
	paginates_per 10
	max_paginates_per 10
end
