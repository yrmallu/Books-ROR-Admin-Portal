class AddUserinfoToUsers < ActiveRecord::Migration
  def up
    add_column :users, :userinfo, :hstore
  end
 
  def down
    remove_column :users, :userinfo
  end
end
