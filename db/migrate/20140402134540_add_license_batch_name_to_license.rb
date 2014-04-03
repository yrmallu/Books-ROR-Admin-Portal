class AddLicenseBatchNameToLicense < ActiveRecord::Migration
  def change
    add_column :licenses, :license_batch_name, :string
  end
end
