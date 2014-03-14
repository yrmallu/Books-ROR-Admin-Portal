class CreateUserinfo < ActiveRecord::Migration
  def change
    create_table :userinfos do |t|
     # t.hstore :phone_number
      t.integer :license_id
      t.integer :user_id
      t.timestamps
    end
  end
end
