class RemoveInterstLevelFromBook < ActiveRecord::Migration
  def change
    remove_column :books, :interest_level, :text
  end
end
