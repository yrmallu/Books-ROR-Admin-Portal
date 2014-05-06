class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :name
      t.attachment :book_cover
      t.attachment :book_cover_large
      t.attachment :preview_book_image
      t.attachment :epub_book
      t.integer :book_id

      t.timestamps
    end
  end
end
