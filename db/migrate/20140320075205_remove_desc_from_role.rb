class RemoveDescFromRole < ActiveRecord::Migration
  def change
    remove_column :roles, :description, :text
  end
end
