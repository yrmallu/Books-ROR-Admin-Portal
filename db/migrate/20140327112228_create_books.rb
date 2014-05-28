class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :title
      t.text :description
      t.string :author
      t.hstore :preview_name
      t.string :book_file_name
      t.integer :chapters
      t.string :book_unique_id
      t.hstore :thumb_name
      t.string :cover
	  t.string :interest_level, limit: 60
	  t.attachment :book_cover
	  t.attachment :epub
      t.boolean :delete_flag, default: false

      t.timestamps
    end
  end
end


    