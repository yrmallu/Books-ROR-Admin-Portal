class CreateStudentinfo < ActiveRecord::Migration
  def change
    create_table :studentinfos do |t|
      t.string :user_level
      t.string :grade
      t.string :reading_ability
     # t.enum :reading_based_on
      t.string :profile_pic
     # t.hstore :parent_name
     # t.hstore :parent_email
      t.integer :license_id
      t.integer :user_id
      t.timestamps
    end
  end
end
