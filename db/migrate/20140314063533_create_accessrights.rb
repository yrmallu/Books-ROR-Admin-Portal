class CreateAccessrights < ActiveRecord::Migration
  def change
    create_table :accessrights do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
