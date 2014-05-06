class AddAssignReadingBasedOnToUser < ActiveRecord::Migration
  def change
    add_column :users, :assign_reading_based_on, :string
  end
end
