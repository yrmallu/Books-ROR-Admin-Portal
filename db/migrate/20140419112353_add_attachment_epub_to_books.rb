class AddAttachmentEpubToBooks < ActiveRecord::Migration
  def self.up
    change_table :books do |t|
      t.attachment :epub
    end
  end

  def self.down
    drop_attached_file :books, :epub
  end
end
