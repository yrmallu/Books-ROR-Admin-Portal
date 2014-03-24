require 'spec_helper'

describe School do
  context 'associations' do
    it { should have_many(:licenses)}
  end
  context 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name) }
  end
  context 'To ensure that a column of the database are actually exists' do
    it { should have_db_column(:id).of_type(:integer) }
    it { should have_db_column(:code).of_type(:integer)}
    it { should have_db_column(:name).of_type(:string).with_options(:limit => 255)}  
    it { should have_db_column(:address).of_type(:string).with_options(:limit => 255) }
    it { should have_db_column(:city).of_type(:string).with_options(:limit => 255)}  
    it { should have_db_column(:district).of_type(:string).with_options(:limit => 255) }
    it { should have_db_column(:state).of_type(:string).with_options(:limit => 255) }
    it { should have_db_column(:country).of_type(:string).with_options(:limit => 255)}  
    it { should have_db_column(:country).of_type(:string).with_options(:limit => 255) }
    it { should have_db_column(:phone).of_type(:string).with_options(:limit => 255)}  
    it { should have_db_column(:created_at).of_type(:datetime) }
    it { should have_db_column(:updated_at).of_type(:datetime) }
    it { should have_db_column(:delete_flag).of_type(:boolean)}
  end
end

# == Schema Information
#
# Table name: schools
#
#  id          :integer          not null, primary key
#  code        :integer
#  name        :string(255)
#  address     :string(255)
#  city        :string(255)
#  district    :string(255)
#  state       :string(255)
#  country     :string(255)
#  phone       :string(255)
#  created_at  :datetime
#  updated_at  :datetime
#  delete_flag :boolean
#
