class AddDefaultDeleteFlagValueToClassroom < ActiveRecord::Migration
  def change
    change_column :classrooms, :delete_flag, :boolean, :default => false
  end
end
