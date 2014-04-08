class AddSchoolYearEndDateToClassroom < ActiveRecord::Migration
  def change
    add_column :classrooms, :school_year_end_date, :date
  end
end
