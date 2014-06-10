class Classroom < ActiveRecord::Base

  include CommonQueries
 
  ###########################################################################################
  ## Relationships
  ########################################################################################### 
  has_many :user_classrooms
  has_many :users, :through => :user_classrooms
  belongs_to :school
  
  ###########################################################################################
  ## Callbacks
  ###########################################################################################
  before_validation :reset_params_datatype
  before_create :generate_random_code
  before_save :reset_params_datatype
  ###########################################################################################
  ## Scopes
  ###########################################################################################
  scope :by_newest, -> {order("created_at DESC")}
  scope :un_archived, -> {where(delete_flag: false)}
  scope :archived, -> {where(delete_flag: true)}
  #store_accessor :classroom_count, :student_count, :teacher_count, :school_admin_count
  
  paginates_per 10
  max_paginates_per 10
  
  ###########################################################################################
  ## Validations
  ###########################################################################################
  validates :code, :uniqueness => {:case_sensitive => false}
  validates :name, :presence => { :message => "Classroom Name can't be blank." }, :length => {:maximum => 255}
  validate :check_class_code_existance

  ###########################################################################################
  ## Methods
  ###########################################################################################
  def generate_random_code
    self.code = Classroom.count == 0 ? (10001.to_i) : (Classroom.maximum("code").to_i + 1.to_i) if [nil,"",0].include?(code)
  end
  
  def reset_params_datatype
    self.code = code.to_i unless code.blank?
  end
  
  def check_class_code_existance
    return true if self.code.blank? 
    classroom = Classroom.where("code = '#{code.to_i}'").last
    if classroom.blank?
      errors.add( :code, "There is no class with the code #{code.to_i}. If you wish to create a new class, simply leave the field blank and the system will assign a code.")
      return false
    else
      return true
    end
  end

  def self.search(query_string, school_id)
  qs = query_string.tr("%","").to_s
  classroom = Classroom.arel_table
  classrooms = Classroom.where(
  classroom[:school_id].eq(school_id).and(
    classroom[:code].eq(qs).or(
        classroom[:name].matches(query_string)
      )
    )
  )
  end
end
