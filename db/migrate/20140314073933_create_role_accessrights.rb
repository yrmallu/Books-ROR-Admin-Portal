class CreateRoleAccessrights < ActiveRecord::Migration
  def change
    create_table :role_accessrights do |t|
      t.column :role_id, :integer, null:false
      t.column :user_id, :integer, null:false
      t.timestamps
    end
  end
end
