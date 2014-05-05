class License < ActiveRecord::Base
  
  include CommonQueries   

  paginates_per 10
  max_paginates_per 10

  ###########################################################################################
  ## Relationships
  ###########################################################################################

  belongs_to :school
  has_many :users
 
  ###########################################################################################
  ## Scopes
  ###########################################################################################

  scope :by_newest, -> {order("created_at DESC")}
	
  ###########################################################################################
  ## Validations
  ###########################################################################################

  validates :no_of_licenses, :presence => { :message => "Please enter number greater than zero." }
  validates :license_batch_name, :presence => { :message => "Please enter license batch name." }
  validates :expiry_date, :presence => { :message => "Please enter license expiration date." }

  ###########################################################################################
  ## Methods
  ###########################################################################################

  def get_license_batch_name_date
    self.license_batch_name + " (" + self.expiry_date.to_s + ") " + "(" + self.used_liscenses.to_s + "/" + self.no_of_licenses.to_s + ")"  unless self.expiry_date.blank?
  end
end
