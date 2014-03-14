# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :license do
    license_group_id 1
    datetime ""
    no_of_licenses 1
    allocated_to ""
    used_liscenses 1
    school_id 1
  end
end
