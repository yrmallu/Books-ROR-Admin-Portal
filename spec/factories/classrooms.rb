# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :classroom do
    code 1
    name "MyString"
    cover_image "MyString"
    secret_key "MyString"
    classroom_count ""
  end
end

# == Schema Information
#
# Table name: classrooms
#
#  id          :integer          not null, primary key
#  code        :integer
#  name        :string(255)
#  cover_image :string(255)
#  secret_key  :string(255)
#  created_at  :datetime
#  updated_at  :datetime
#
