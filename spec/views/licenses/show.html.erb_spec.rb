require 'spec_helper'

describe "licenses/show" do
  before(:each) do
    @license = assign(:license, stub_model(License,
      :license_group_id => 1,
      :datetime => "",
      :no_of_licenses => 2,
      :allocated_to => "",
      :used_liscenses => 3,
      :school_id => 4
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/1/)
    rendered.should match(//)
    rendered.should match(/2/)
    rendered.should match(//)
    rendered.should match(/3/)
    rendered.should match(/4/)
  end
end
