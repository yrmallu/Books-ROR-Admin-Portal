class FixColumnNameInBookTable < ActiveRecord::Migration
  def change
  	add_column :books, :id, :primary_key
  end
end
