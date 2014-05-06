class CreateUserlevelSettings < ActiveRecord::Migration
  def change
    create_table :userlevel_settings do |t|
      t.integer :book_id
      t.integer :user_id
      t.integer :book_changed_id
      t.integer :classroom_id
      t.integer :teacher_id
      t.integer :status
      t.integer :school_id
      t.integer :userlevel
      t.string :reference

      t.timestamps
    end
  end
end
