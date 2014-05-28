class AddInterestLevelToBook < ActiveRecord::Migration
  def change
    add_column :books, :interest_level, :string
  end
end
