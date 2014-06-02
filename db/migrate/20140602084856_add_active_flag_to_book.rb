class AddActiveFlagToBook < ActiveRecord::Migration
  def change
    add_column :books, :active_flag, :boolean, default: false
  end
end
