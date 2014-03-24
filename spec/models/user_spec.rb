require 'spec_helper'

describe User do
  context 'associations' do
    it { should belong_to(:school)}
  end
  context 'To ensure that a column of the database are actually exists' do
    it { should have_db_column(:id).of_type(:integer) }
    it { should have_db_column(:first_name).of_type(:string).with_options(:limit => 255)}
    it { should have_db_column(:last_name).of_type(:string).with_options(:limit => 255)}  
    it { should have_db_column(:username).of_type(:string).with_options(:limit => 255) }
    it { should have_db_column(:license_expiry_date).of_type(:date)}  
    it { should have_db_column(:delete_flag).of_type(:boolean)}

    it { should have_db_column(:email).of_type(:string).with_options(:limit => 255) }
    it { should have_db_column(:encrypted_password).of_type(:string).with_options(:limit => 255) }
    it { should have_db_column(:device_id).of_type(:integer)}  
    it { should have_db_column(:role_id).of_type(:integer) }
    it { should have_db_column(:reset_password_token).of_type(:string).with_options(:limit => 255)}
    it { should have_db_column(:reset_password_sent_at).of_type(:datetime) }
    it { should have_db_column(:remember_created_at).of_type(:datetime) }
    it { should have_db_column(:sign_in_count).of_type(:integer) }
    it { should have_db_column(:current_sign_in_at).of_type(:datetime) }
    it { should have_db_column(:last_sign_in_at).of_type(:datetime) }
    it { should have_db_column(:current_sign_in_ip).of_type(:string).with_options(:limit => 255)}
    it { should have_db_column(:last_sign_in_ip).of_type(:string).with_options(:limit => 255)}
    it { should have_db_column(:created_at).of_type(:datetime) }
    it { should have_db_column(:updated_at).of_type(:datetime) }
    
  end
end

# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  first_name             :string(255)
#  last_name              :string(255)
#  username               :string(255)
#  license_expiry_date    :date
#  delete_flag            :boolean          default(FALSE)
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  device_id              :integer
#  role_id                :integer
#  school_id              :integer
#  reset_password_token   :string(255)
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string(255)
#  last_sign_in_ip        :string(255)
#  created_at             :datetime
#  updated_at             :datetime
#
