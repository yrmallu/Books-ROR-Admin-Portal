class DeviseCreateUsers < ActiveRecord::Migration
  def change
    create_table(:users) do |t|
      t.text :first_name
      t.text :last_name
      t.text :username
      t.date :license_expiry_date
      t.boolean :delete_flag, default:false
      t.string :email, :null => false, :default => ""
      t.integer :device_id
      t.integer :role_id
      t.integer :school_id
      t.hstore  :userinfo
      t.string  :password_digest
      t.integer :license_id
      t.string  :assign_reading_based_on
      t.attachment :photos
      
      t.timestamps
    end
    add_index :users, :role_id
    add_index :users, :school_id
  end
end
