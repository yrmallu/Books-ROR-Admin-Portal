class CreateRoles < ActiveRecord::Migration
  def change
    create_table :roles do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
    change_column :roles, :id, :integer, :limit => 8
  end
end
