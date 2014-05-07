class CreateUserAccessrights < ActiveRecord::Migration
  def change
    create_table :user_accessrights do |t|
      t.integer :user_id
      t.integer :accessright_id
      t.boolean :access_flag
	  t.integer :role_id

      t.timestamps
    end
  end
end
