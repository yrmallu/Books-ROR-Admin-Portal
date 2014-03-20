class CreateSchools < ActiveRecord::Migration
  def change
    create_table :schools do |t|
      t.integer :code
      t.string :name
      t.string :address
      t.string :city
      t.string :district
      t.string :state
      t.string :country
      t.string :phone

      t.timestamps
    end
  end
end
