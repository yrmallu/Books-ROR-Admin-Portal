# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :userlevel_setting, :class => 'UserlevelSettings' do
    book_id 1
    user_id 1
    book_changed_id 1
    classroom_id 1
    teacher_id 1
    status 1
    school_id 1
    userlevel 1
    reference "MyString"
  end
end
