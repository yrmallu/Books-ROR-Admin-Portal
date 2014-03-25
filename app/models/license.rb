class License < ActiveRecord::Base
	belongs_to :school
	has_one :user
	
	store_accessor :allocated_to, :role_id,:count
end
