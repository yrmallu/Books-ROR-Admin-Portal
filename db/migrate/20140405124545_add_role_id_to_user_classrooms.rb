class AddRoleIdToUserClassrooms < ActiveRecord::Migration
  def change
    add_column :user_classrooms, :role_id, :integer
  end
end
