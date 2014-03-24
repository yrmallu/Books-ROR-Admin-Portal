require 'spec_helper'

describe Classroom do
  context 'associations' do
    it { should have_many(:user_classrooms)}
  end
  context 'To ensure that a column of the database are actually exists' do
    it { should have_db_column(:id).of_type(:integer) }
    it { should have_db_column(:code).of_type(:integer)}
    it { should have_db_column(:name).of_type(:string).with_options(:limit => 255)}  
    it { should have_db_column(:cover_image).of_type(:string).with_options(:limit => 255) }
    it { should have_db_column(:secret_key).of_type(:string).with_options(:limit => 255)}  
    it { should have_db_column(:created_at).of_type(:datetime) }
    it { should have_db_column(:updated_at).of_type(:datetime) }
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
