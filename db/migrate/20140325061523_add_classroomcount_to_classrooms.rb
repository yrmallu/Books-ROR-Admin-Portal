class AddClassroomcountToClassrooms < ActiveRecord::Migration
  def up
    add_column :classrooms, :classroom_count, :hstore
  end
 
  def down
    remove_column :classrooms, :classroom_count
  end
end
