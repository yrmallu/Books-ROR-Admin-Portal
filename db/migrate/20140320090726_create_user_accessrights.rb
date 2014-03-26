class CreateUserAccessrights < ActiveRecord::Migration
  def change
    create_table :user_accessrights do |t|
      t.integer :user_id
      t.integer :accessright_id
      t.boolean :access_flag

      t.timestamps
    end
    change_column :user_accessrights, :id, :integer, :limit => 8
  end
end
