require 'spec_helper'

describe "classrooms/edit" do
  before(:each) do
    @classroom = assign(:classroom, stub_model(Classroom,
      :code => 1,
      :name => "MyString",
      :cover_image => "MyString",
      :secret_key => "MyString",
      :classroom_count => ""
    ))
  end

  it "renders the edit classroom form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", classroom_path(@classroom), "post" do
      assert_select "input#classroom_code[name=?]", "classroom[code]"
      assert_select "input#classroom_name[name=?]", "classroom[name]"
      assert_select "input#classroom_cover_image[name=?]", "classroom[cover_image]"
      assert_select "input#classroom_secret_key[name=?]", "classroom[secret_key]"
      assert_select "input#classroom_classroom_count[name=?]", "classroom[classroom_count]"
    end
  end
end
