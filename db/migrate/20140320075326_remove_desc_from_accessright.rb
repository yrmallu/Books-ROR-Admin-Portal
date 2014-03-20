class RemoveDescFromAccessright < ActiveRecord::Migration
  def change
    remove_column :accessrights, :description, :text
  end
end
