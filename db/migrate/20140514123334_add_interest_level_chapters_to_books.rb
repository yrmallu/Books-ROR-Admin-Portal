class AddInterestLevelChaptersToBooks < ActiveRecord::Migration
  def change
    add_column :books, :chapters, :integer, :default => 40
    add_column :books, :interest_level, :text
  end
end
