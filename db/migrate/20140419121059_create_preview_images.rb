class CreatePreviewImages < ActiveRecord::Migration
  def change
    create_table :preview_images do |t|
      t.integer		  :book_id
	  t.string        :preview_image
      t.string        :preview_image_file_name
      t.string        :preview_image_content_type
      t.integer       :preview_image_file_size
      t.datetime      :preview_image_updated_at
      t.timestamps

    end
  end
end
