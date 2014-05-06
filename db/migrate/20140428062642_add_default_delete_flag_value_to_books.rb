class AddDefaultDeleteFlagValueToBooks < ActiveRecord::Migration
  def change
  	 add_column :books, :delete_flag_tmp, :boolean, :default => false
  	 Book.reset_column_information
  	 remove_column :books, :delete_flag
	 rename_column :books, :delete_flag_tmp, :delete_flag
  end
end
