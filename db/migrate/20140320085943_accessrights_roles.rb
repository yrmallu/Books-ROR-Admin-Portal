class AccessrightsRoles < ActiveRecord::Migration
  def change
    create_table :accessrights_roles, :id => false do |t|
      t.integer :accessright_id
      t.integer :role_id
    end
  end
end
