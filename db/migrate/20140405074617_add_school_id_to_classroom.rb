class AddSchoolIdToClassroom < ActiveRecord::Migration
  def change
    add_column :classrooms, :school_id, :integer
  end
end
