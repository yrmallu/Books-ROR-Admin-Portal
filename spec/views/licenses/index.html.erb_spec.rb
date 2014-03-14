require 'spec_helper'

describe "licenses/index" do
  before(:each) do
    assign(:licenses, [
      stub_model(License,
        :license_group_id => 1,
        :datetime => "",
        :no_of_licenses => 2,
        :allocated_to => "",
        :used_liscenses => 3,
        :school_id => 4
      ),
      stub_model(License,
        :license_group_id => 1,
        :datetime => "",
        :no_of_licenses => 2,
        :allocated_to => "",
        :used_liscenses => 3,
        :school_id => 4
      )
    ])
  end

  it "renders a list of licenses" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => "".to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => "".to_s, :count => 2
    assert_select "tr>td", :text => 3.to_s, :count => 2
    assert_select "tr>td", :text => 4.to_s, :count => 2
  end
end
