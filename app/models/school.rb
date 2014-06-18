class School < ActiveRecord::Base

  #include CommonQueries 
	
	paginates_per 10
	max_paginates_per 10

  ###########################################################################################
  ## Relationships
  ###########################################################################################

	has_many :users
	has_many :classrooms
	has_many :licenses
	accepts_nested_attributes_for :licenses, :allow_destroy=> true, :reject_if => :all_blank
	
	###########################################################################################
  ## Callbacks
  ###########################################################################################

	before_validation :strip_whitespace
	before_create :generate_random_code
  before_save :reset_params_datatype
  before_save :check_valid_country_or_state
	###########################################################################################
  ## Scopes
  ###########################################################################################
	
	scope :by_newest, -> {order("created_at DESC")}
	scope :un_archived, -> {where(delete_flag: false)}
  scope :archived, -> {where(delete_flag: true)}
	#default_scope {where.not(delete_flag: true)}	

  ###########################################################################################
  ## Validations
  ###########################################################################################
  validates :code, :uniqueness => {:case_sensitive => false}
  validates :name, :presence => {:message => "School name can't be blank."}, :length => {:maximum => 255}#, :uniqueness => { :case_sensitive => false, conditions: -> { where.not(delete_flag: 'true') }}
  validates :address, :length => {:maximum => 255}, :allow_blank=>true
  validates :city, :length => {:maximum => 255}, :allow_blank=>true
  validates :district, :length => {:maximum => 255}, :allow_blank=>true
  validates :state, :length => {:maximum => 255}, :allow_blank=>true, :if => :check_valid_country_or_state
  validates :country, :length => {:maximum => 255}, :allow_blank=>true, :if => :check_valid_country_or_state
  validate :check_school_code_existance
  #validates :phone, :length => {:maximum => 255}, :allow_blank=>true

	###########################################################################################
  ## Methods
  ###########################################################################################

  def generate_random_code
    self.code = School.count == 0 ? (1000001.to_i) : (School.maximum("code").to_i + 1.to_i) if [nil,"",0].include?(code)
  end
  
  def reset_params_datatype
    self.code = code.to_i
   # self.phone = phone.to_i
  end
  
  def check_valid_country_or_state
    return true if self.country.blank? && self.state.blank?
    if self.country.blank? && !self.state.blank?
      state_error_msg
    elsif !self.country.blank?
      p country  = Carmen::Country.coded(self.country)
      unless country.blank?
        unless self.state.blank?
          unless country.subregions.coded(self.state).blank?
            return true
          else
            state_error_msg
          end
        end
        return true
      else
        errors.add(:country, ": Sorry but the country (state) code you entered is invalid. Please refer to the spreadsheet for detailed instructions.")
        return false
      end
    end
  end
  
  def state_error_msg
    errors.add(:state, ": Sorry but the country (state) code you entered is invalid. Please refer to the spreadsheet for detailed instructions.")
    return false
  end
  
  def check_school_code_existance
    return true if self.code.blank? 
    school = School.where("code = '#{code.to_i}'").last
    if school.blank?
      errors.add( :code, "There is no school with the code #{code.to_i}. If you wish to create a new school, simply leave the field blank and the system will assign a code.")
      return false
    else
      return true
    end
  end

  def strip_whitespace
    self.code = code.to_i unless code.blank?
  	self.name = self.name.strip unless self.name.blank?
  end

  def self.search(query_string)
  	qs = query_string.tr("%","").to_s 
  	school = School.arel_table
  	schools = School.where(
  		school[:code].eq(qs).or(
  			school[:name].matches(query_string).or(
  				school[:district].matches(query_string).or(
  					school[:city].matches(query_string).or(
  						school[:state].matches(query_string).or(
  							school[:country].matches(query_string)

  							)

  						)
  					)
  				)
  			)
  		)
  end

end
