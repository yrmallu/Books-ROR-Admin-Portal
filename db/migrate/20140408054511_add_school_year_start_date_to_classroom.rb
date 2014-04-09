class AddSchoolYearStartDateToClassroom < ActiveRecord::Migration
  def change
    add_column :classrooms, :school_year_start_date, :date
  end
end
