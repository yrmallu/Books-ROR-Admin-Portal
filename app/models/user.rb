class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         
  has_many :user_classrooms    
  has_many :classrooms, :through => :user_classrooms  
  has_one :studentinfo 
  has_one :userinfo
  belongs_to :school_id
  belongs_to :role_id
end
