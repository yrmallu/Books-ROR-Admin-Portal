class AddDeleteFlagToLicense < ActiveRecord::Migration
  def change
    add_column :licenses, :delete_flag, :boolean
  end
end
