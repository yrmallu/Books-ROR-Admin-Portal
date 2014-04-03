class RemoveAllocatedToFromLicense < ActiveRecord::Migration
  def change
    remove_column :licenses, :allocated_to, :hstore
  end
end
