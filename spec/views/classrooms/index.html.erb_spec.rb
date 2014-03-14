require 'spec_helper'

describe "classrooms/index" do
  before(:each) do
    assign(:classrooms, [
      stub_model(Classroom,
        :code => 1,
        :name => "Name",
        :cover_image => "Cover Image",
        :secret_key => "Secret Key",
        :classroom_count => ""
      ),
      stub_model(Classroom,
        :code => 1,
        :name => "Name",
        :cover_image => "Cover Image",
        :secret_key => "Secret Key",
        :classroom_count => ""
      )
    ])
  end

  it "renders a list of classrooms" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "Cover Image".to_s, :count => 2
    assert_select "tr>td", :text => "Secret Key".to_s, :count => 2
    assert_select "tr>td", :text => "".to_s, :count => 2
  end
end
