class CreateParents < ActiveRecord::Migration
  def change
    create_table :parents do |t|
      t.text :name
      t.string :email
      t.integer :user_id

      t.timestamps
    end
  end
end
