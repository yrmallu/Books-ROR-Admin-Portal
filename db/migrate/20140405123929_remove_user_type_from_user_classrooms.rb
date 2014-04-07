class RemoveUserTypeFromUserClassrooms < ActiveRecord::Migration
  def change
    remove_column :user_classrooms, :user_type, :integer
  end
end
