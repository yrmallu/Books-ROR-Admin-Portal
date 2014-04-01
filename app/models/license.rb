class License < ActiveRecord::Base
	belongs_to :school
	belongs_to :user
	
	store_accessor :allocated_to, :role_id,:count
end
