class License < ActiveRecord::Base
	belongs_to :school
	belongs_to :user
	
	store_accessor :allocated_to, :role_id,:count
	
	paginates_per 10
	max_paginates_per 10
end
