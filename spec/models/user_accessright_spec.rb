require 'spec_helper'

describe UserAccessright do
  pending "add some examples to (or delete) #{__FILE__}"
end

# == Schema Information
#
# Table name: user_accessrights
#
#  id             :integer          not null, primary key
#  user_id        :integer
#  accessright_id :integer
#  access_flag    :boolean
#  created_at     :datetime
#  updated_at     :datetime
#  role_id        :integer
#
