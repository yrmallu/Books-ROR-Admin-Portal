class CreateLicenses < ActiveRecord::Migration
  def change
    create_table :licenses do |t|
      t.integer :license_group_id
      t.date :expiry_date
      t.integer :no_of_licenses
      t.integer :used_liscenses
      t.integer :school_id

      t.timestamps
    end
    change_column :licenses, :id, :integer, :limit => 8
  end
end
