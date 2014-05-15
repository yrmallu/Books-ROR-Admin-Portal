class CreateBookReadingGrades < ActiveRecord::Migration
  def change
    create_table :book_reading_grades do |t|
      t.integer :book_id
      t.integer :reading_grade_id

      t.timestamps
    end
  end
end
