# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user_accessright do
    user_id 1
    accessright_id 1
    access_flag false
  end
end

# == Schema Information
#
# Table name: user_accessrights
#
#  id             :integer          not null, primary key
#  user_id        :integer
#  accessright_id :integer
#  access_flag    :boolean
#  created_at     :datetime
#  updated_at     :datetime
#  role_id        :integer
#
