class CreateClassrooms < ActiveRecord::Migration
  def change
    create_table :classrooms do |t|
      t.string :code
      t.string :name
      t.string :cover_image
      t.string :secret_key
      t.hstore :classroom_count
      t.integer :school_id
      t.boolean :delete_flag, default: false
      t.date :school_year_start_date
      t.date :school_year_end_date

      t.timestamps
    end
  end
end
