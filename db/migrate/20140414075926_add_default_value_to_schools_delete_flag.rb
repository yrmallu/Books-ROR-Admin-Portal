class AddDefaultValueToSchoolsDeleteFlag < ActiveRecord::Migration
  def change
  	change_column :schools, :delete_flag, :boolean, default: false
  end
end
