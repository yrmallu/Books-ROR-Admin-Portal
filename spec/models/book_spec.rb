require 'spec_helper'

describe Book do
  context 'To ensure that a column of the database are actually exists' do
    it { should have_db_column(:id).of_type(:integer) }
    it { should have_db_column(:title).of_type(:string).with_options(:limit => 255)}  
    it { should have_db_column(:description).of_type(:text)}
    it { should have_db_column(:author).of_type(:string).with_options(:limit => 255)}  
    it { should have_db_column(:book_file_name).of_type(:string).with_options(:limit => 255) }
    it { should have_db_column(:chapters).of_type(:integer)}
    it { should have_db_column(:book_unique_id).of_type(:string).with_options(:limit => 255)}  
    it { should have_db_column(:created_at).of_type(:datetime) }
    it { should have_db_column(:updated_at).of_type(:datetime) }
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
