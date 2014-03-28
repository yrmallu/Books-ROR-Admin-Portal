class AddAttachmentBookCoverBookCoverLargePreviewBookImageEpubBookToBooks < ActiveRecord::Migration
  def self.up
    change_table :books do |t|
      t.attachment :book_cover
      t.attachment :epub_book
    end
  end

  def self.down
    drop_attached_file :books, :book_cover
    drop_attached_file :books, :epub_book
  end
end
