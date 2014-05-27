class AddDescriptionToBook < ActiveRecord::Migration
  def change
    add_column :books, :teacher_description, :text
    add_column :books, :student_description, :text
	add_column :books, :interest_level_from, :string
	add_column :books, :interest_level_to, :string    
  end
end
