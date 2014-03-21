class UserAccessright < ActiveRecord::Base
     belongs_to :accessright  # foreign key - accessright_id
     belongs_to :user     # foreign key - user_id
     belongs_to :role     # foreign key - role_id
     #before_save :check_flag
  
    # def check_flag
#       Rails.cache.delete('user_accessrights_'+self.user.id.to_s) if (self.access_flag_changed? || self.new_record?)
#     end
end
