class BookReadingGrade < ActiveRecord::Base
	belongs_to :book
    belongs_to :reading_grade
end
