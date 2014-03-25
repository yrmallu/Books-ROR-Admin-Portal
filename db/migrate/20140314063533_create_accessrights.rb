class CreateAccessrights < ActiveRecord::Migration
  def change
    create_table :accessrights do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
    change_column :accessrights, :id, :integer, :limit => 8
  end
end
