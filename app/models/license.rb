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
  scope :un_archived, -> {where(delete_flag: false)}
	
  ###########################################################################################
  ## Validations
  ###########################################################################################

  validates :no_of_licenses, :presence => { :message => "Please enter number greater than zero." }, :length => {:maximum => 8}
  validates :license_batch_name, :presence => { :message => "Please enter license batch name." }, :length => {:maximum => 255}
  validates :expiry_date, :presence => { :message => "Please enter license expiration date." }

  ###########################################################################################
  ## Methods
  ###########################################################################################

  def get_license_batch_name_date
    self.license_batch_name + " (" + self.expiry_date.to_s + ") " + "(" + self.used_liscenses.to_s + "/" + self.no_of_licenses.to_s + ")"  unless self.expiry_date.blank?
  end

  def get_license_batch_name_exp_date
    self.license_batch_name + " (" + self.expiry_date.to_s + ") " unless self.expiry_date.blank?
  end
  
  def self.search(query_string, school_id)
  qs = query_string.tr("%","").to_s
  license = License.arel_table
  licenses = License.where(
  license[:school_id].eq(school_id).and(
    license[:no_of_licenses].eq(qs).or(
        license[:license_batch_name].matches(query_string)
      )
    )
  )
  end
  
  
end
