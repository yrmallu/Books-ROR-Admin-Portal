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

# == Schema Information
#
# Table name: licenses
#
#  id               :integer          not null, primary key
#  license_group_id :integer
#  expiry_date      :date
#  no_of_licenses   :integer
#  used_liscenses   :integer
#  school_id        :integer
#  created_at       :datetime
#  updated_at       :datetime
#
