class Classroom < ActiveRecord::Base
  has_many :user_classrooms
  has_many :users, :through => :user_classrooms
  belongs_to :school
  
  before_create :generate_random_code
  
  scope :by_newest, -> {order("created_at DESC")}
  #store_accessor :classroom_count, :student_count, :teacher_count, :school_admin_count
  
  paginates_per 10
  max_paginates_per 10
  
  def generate_random_code
    self.code = Classroom.count == 0 ? 10001:Classroom.maximum("code") + 1
  end

  def self.search(query_string)
  qs = query_string.tr("%","").to_i 
  classroom = Classroom.arel_table
  classrooms = Classroom.where(
    classroom[:code].eq(qs).or(
        classroom[:name].matches(query_string)
      )
    )
  end
end
