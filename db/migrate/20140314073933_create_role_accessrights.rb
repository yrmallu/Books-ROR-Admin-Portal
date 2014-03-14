class CreateRoleAccessrights < ActiveRecord::Migration
  def change
    create_table :role_accessrights do |t|
      t.integer :role_id
      t.integer :user_id
      t.timestamps
    end
  end
end
