class CreateLicenses < ActiveRecord::Migration
  def change
    create_table :licenses do |t|
      t.date :expiry_date
      t.integer :no_of_licenses, default: 0
      t.integer :used_liscenses, default: 0
      t.integer :school_id
      t.boolean :delete_flag, default:false
      t.string  :license_batch_name
	  
      t.timestamps
    end
  end
end
