class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :title
      t.text :description
      t.string :author
     # t.hstore :images
      t.string :book_file_name
      t.integer :chapters
      t.string :book_unique_id

      t.timestamps
    end
  end
end
