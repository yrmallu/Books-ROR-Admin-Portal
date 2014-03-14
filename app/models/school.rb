class School < ActiveRecord::Base
  has_many :licenses
  has_many :users

	validates :name, :presence=>true
end
