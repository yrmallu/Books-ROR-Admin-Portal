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

# == Schema Information
#
# Table name: books
#
#  id             :integer          not null, primary key
#  title          :string(255)
#  description    :text
#  author         :string(255)
#  book_file_name :string(255)
#  chapters       :integer
#  book_unique_id :string(255)
#  created_at     :datetime
#  updated_at     :datetime
#
