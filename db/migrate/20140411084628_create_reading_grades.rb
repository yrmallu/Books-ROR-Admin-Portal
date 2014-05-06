class CreateReadingGrades < ActiveRecord::Migration
  def change
    create_table :reading_grades do |t|
      t.string :grade_short
      t.string :grade_name
      t.string :grade_name_short

      t.timestamps
    end
  end
end
