class CreateClassrooms < ActiveRecord::Migration
  def change
    create_table :classrooms do |t|
      t.integer :code
      t.string :name
      t.string :cover_image
      t.string :secret_key
     # t.hstore :classroom_count

      t.timestamps
    end
  end
end
