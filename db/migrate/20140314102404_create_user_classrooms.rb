class CreateUserClassrooms < ActiveRecord::Migration
  def change
    create_table :user_classrooms do |t|
      t.integer :user_id
      t.integer :classroom_id
      t.integer :user_type
    end
  end
end
