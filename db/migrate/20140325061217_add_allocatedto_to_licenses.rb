class AddAllocatedtoToLicenses < ActiveRecord::Migration
  def up
    add_column :licenses, :allocated_to, :hstore
  end
 
  def down
    remove_column :licenses, :allocated_to
  end
end
