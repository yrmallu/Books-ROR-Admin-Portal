class AddDeleteFlagToSchool < ActiveRecord::Migration
  def change
    add_column :schools, :delete_flag, :boolean
  end
end
