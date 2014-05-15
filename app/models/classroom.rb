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
  before_create :generate_random_code
  before_save :reset_params_datatype
  ###########################################################################################
  ## Scopes
  ###########################################################################################
  scope :by_newest, -> {order("created_at DESC")}
  #store_accessor :classroom_count, :student_count, :teacher_count, :school_admin_count
  
  paginates_per 10
  max_paginates_per 10
  
  ###########################################################################################
  ## Validations
  ###########################################################################################
  validates :name, :presence => { :message => "Classroom Name can't be blank." }, :length => {:maximum => 255}


  ###########################################################################################
  ## Methods
  ###########################################################################################
  def generate_random_code
    self.code = Classroom.count == 0 ? (10001.to_i) : (Classroom.maximum("code").to_i + 1.to_i) if [nil,"",0].include?(code)
  end
  
  def reset_params_datatype
    self.code = code.to_i
  end

  def self.search(query_string)
  qs = query_string.tr("%","").to_s
  classroom = Classroom.arel_table
  classrooms = Classroom.where(
    classroom[:code].eq(qs).or(
        classroom[:name].matches(query_string)
      )
    )
  end
end
