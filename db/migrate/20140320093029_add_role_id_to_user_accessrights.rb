class AddRoleIdToUserAccessrights < ActiveRecord::Migration
  def change
    add_column :user_accessrights, :role_id, :integer
  end
end
