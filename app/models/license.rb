class License < ActiveRecord::Base
	belongs_to :school
	has_many :users
	
	# include UserCount # Gives teachers_count, school_admins_count and students_count menthods
	
	paginates_per 10
	max_paginates_per 10
	
	def get_license_batch_name_date
      self.license_batch_name + " (" + self.expiry_date.to_s + ") " + "(" + self.used_liscenses.to_s + "/" + self.no_of_licenses.to_s + ")"  unless self.expiry_date.blank?
    end
end
