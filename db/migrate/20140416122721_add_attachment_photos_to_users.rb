class AddAttachmentPhotosToUsers < ActiveRecord::Migration
  def self.up
    change_table :users do |t|
      t.attachment :photos
    end
  end

  def self.down
    drop_attached_file :users, :photos
  end
end
