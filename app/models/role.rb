class Role < ActiveRecord::Base
  has_many :users
  has_many :user_accessrights
  has_and_belongs_to_many :accessrights

  validates :name, :length => {:maximum => 255}, :allow_blank=>true
  
  def add_accessrights(accessright)
    unless accessright.blank?
      accessrights = check_accessright(accessright)
      unless accessrights.blank?
        delete_user_role_cache
        self.user_accessrights.delete_all unless self.user_accessrights.blank?
        accessrights.each{|x| self.accessrights << x}
      end
    end
  end
  
  def remove_accessright(removed_rights)
    unless removed_rights.blank?
      removedrights = check_accessright(removed_rights)
      unless removedrights.blank?
        delete_user_role_cache
        self.user_accessrights.delete_all unless self.user_accessrights.blank?
        removedrights.each{|x| self.accessrights.delete(x)}
      end
    end
  end
  
  def check_accessright(accessright)
    #Accessright.find(:all, :conditions=>"id in (#{accessright.join(",")})")
	Accessright.where("id in (#{accessright.join(",")})").to_a
  end
  
  def delete_user_role_cache
    self.users.each{|user| Rails.cache.delete('user_accessrights_'+user.id.to_s)} unless self.users.blank?
  end
end
