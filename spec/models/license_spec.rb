require 'spec_helper'

describe License do
  context 'associations' do
     it { should belong_to(:school)}
  end
  context 'To ensure that a column of the database are actually exists' do
    it { should have_db_column(:id).of_type(:integer) }
    it { should have_db_column(:expiry_date).of_type(:date)}
    it { should have_db_column(:no_of_licenses).of_type(:integer)}  
    it { should have_db_column(:used_liscenses).of_type(:integer)}
    it { should have_db_column(:school_id).of_type(:integer)}  
    it { should have_db_column(:created_at).of_type(:datetime) }
    it { should have_db_column(:updated_at).of_type(:datetime) }
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
