class CreateLicenses < ActiveRecord::Migration
  def change
    create_table :licenses do |t|
      t.integer :license_group_id
      t.datetime :expiry_date
      t.integer :no_of_licenses
     # t.hstore :allocated_to
      t.integer :used_liscenses
      t.integer :school_id

      t.timestamps
    end
  end
end
