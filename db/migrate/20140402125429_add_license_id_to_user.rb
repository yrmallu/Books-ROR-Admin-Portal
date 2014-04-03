class AddLicenseIdToUser < ActiveRecord::Migration
  def change
    add_column :users, :license_id, :integer
  end
end
