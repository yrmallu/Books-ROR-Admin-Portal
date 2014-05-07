class ReadingGrade < ActiveRecord::Base
  belongs_to :users

  validates :grade_short, :length => {:maximum => 255}, :allow_blank=>true
  validates :grade_name, :length => {:maximum => 255}, :allow_blank=>true
  validates :grade_name_short, :length => {:maximum => 255}, :allow_blank=>true

end
