class AddDeleteFlagToClassroom < ActiveRecord::Migration
  def change
    add_column :classrooms, :delete_flag, :boolean
  end
end
