class Parent < ActiveRecord::Base
  belongs_to :user

  validates :name, :length => {:maximum => 255}, :allow_blank=>true
  validates :email, :format=>{:with=> VALID_EMAIL_REGEX }, :allow_blank=>true, :length => {:maximum => 255}
  
  
end
