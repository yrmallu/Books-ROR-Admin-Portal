class School < ActiveRecord::Base
	validates :name, :presence=>true, :uniqueness=>{:case_sensitive=>false}
	
	has_many :licenses
	has_many :users
	has_many :classrooms
	
	accepts_nested_attributes_for :licenses, :allow_destroy=> true, :reject_if => :all_blank
	
	before_create :generate_random_code
	
	paginates_per 10
	max_paginates_per 10
	
	def generate_random_code
      self.code = School.count == 0 ? 10001:School.maximum("code") + 1
    end
	
	def self.import(file)
    spreadsheet = open_spreadsheet(file)
    header = spreadsheet.row(1)
    (2..spreadsheet.last_row).each do |i|
      row = Hash[[header, spreadsheet.row(i)].transpose]
      name = find_by_name(row["Name"])
      
      if name.nil?
        school = School.new(:name => row["Name"], :address => row["Address"], :city => row["City"], :district => row["District"], :state => row["State"], :phone => row["Phone"])
        school.save!
      end
    end
  end

  def self.open_spreadsheet(file)
    case File.extname(file.original_filename)
      # when ".csv" then Roo::CSV.new(file.path,csv_options: {encoding: Encoding::UTF_8})
       when ".xls" then Roo::Excel.new(file.path, nil, :ignore)
    end
  end 
end
