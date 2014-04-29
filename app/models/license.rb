class License < ActiveRecord::Base
  
  include CommonQueries
  belongs_to :school
  has_many :users
  
  paginates_per 10
  max_paginates_per 10

  scope :by_newest, -> {order("created_at DESC")}
	
  def get_license_batch_name_date
    self.license_batch_name + " (" + self.expiry_date.to_s + ") " + "(" + self.used_liscenses.to_s + "/" + self.no_of_licenses.to_s + ")"  unless self.expiry_date.blank?
  end
end
