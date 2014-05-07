class CreateSchools < ActiveRecord::Migration
  def change
    create_table :schools do |t|
      t.string :code
      t.text :name
      t.text :address
      t.string :city
      t.string :district
      t.string :state
      t.string :country
      t.string :phone
      t.boolean :delete_flag, default:false
      t.timestamps
    end
  end
end
