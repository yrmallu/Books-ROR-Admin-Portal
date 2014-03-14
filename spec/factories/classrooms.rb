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
