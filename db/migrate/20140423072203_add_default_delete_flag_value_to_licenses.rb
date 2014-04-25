class AddDefaultDeleteFlagValueToLicenses < ActiveRecord::Migration
  def change
    change_column :licenses, :delete_flag, :boolean, :default => false
  end
end


