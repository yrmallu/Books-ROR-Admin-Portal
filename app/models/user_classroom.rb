class RoleAccessright < ActiveRecord::Base

  belongs_to :role
  belongs_to :accessright

end