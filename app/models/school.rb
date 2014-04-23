class School < ActiveRecord::Base
  
  before_validation :strip_whitespace
  default_scope {where.not(delete_flag: true)}	
  validates :name, :presence=>true, :uniqueness=>{:case_sensitive=>false, conditions: -> { where.not(delete_flag: 'true') }}
	
	has_many :licenses
	has_many :users
	has_many :classrooms
	
	accepts_nested_attributes_for :licenses, :allow_destroy=> true, :reject_if => :all_blank
	
	scope :by_newest, -> {order("created_at DESC")}
	
	before_create :generate_random_code
	
	paginates_per 10
	max_paginates_per 10
	
	def generate_random_code
      self.code = School.count == 0 ? 10001:School.maximum("code") + 1
  end

  def strip_whitespace
    self.name = self.name.strip
  end

end
