class AddDefaultValueToLicense < ActiveRecord::Migration
  def change
    change_column :licenses, :used_liscenses, :integer, :default => 0
  end
end
