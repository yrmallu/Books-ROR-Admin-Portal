class RemoveLicenseGroupIdFromLicense < ActiveRecord::Migration
  def change
    remove_column :licenses, :license_group_id, :integer
  end
end
