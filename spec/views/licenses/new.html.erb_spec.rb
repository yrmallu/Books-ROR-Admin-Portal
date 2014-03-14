require 'spec_helper'

describe "licenses/new" do
  before(:each) do
    assign(:license, stub_model(License,
      :license_group_id => 1,
      :datetime => "",
      :no_of_licenses => 1,
      :allocated_to => "",
      :used_liscenses => 1,
      :school_id => 1
    ).as_new_record)
  end

  it "renders new license form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", licenses_path, "post" do
      assert_select "input#license_license_group_id[name=?]", "license[license_group_id]"
      assert_select "input#license_datetime[name=?]", "license[datetime]"
      assert_select "input#license_no_of_licenses[name=?]", "license[no_of_licenses]"
      assert_select "input#license_allocated_to[name=?]", "license[allocated_to]"
      assert_select "input#license_used_liscenses[name=?]", "license[used_liscenses]"
      assert_select "input#license_school_id[name=?]", "license[school_id]"
    end
  end
end
