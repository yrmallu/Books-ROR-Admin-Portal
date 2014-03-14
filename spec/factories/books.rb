# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :book do
    title "MyString"
    description "MyText"
    author "MyString"
    images ""
    book_file_name "MyString"
    chapters 1
    book_unique_id "MyString"
  end
end
