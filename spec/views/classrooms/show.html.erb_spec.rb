require 'spec_helper'

describe "classrooms/show" do
  before(:each) do
    @classroom = assign(:classroom, stub_model(Classroom,
      :code => 1,
      :name => "Name",
      :cover_image => "Cover Image",
      :secret_key => "Secret Key",
      :classroom_count => ""
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/1/)
    rendered.should match(/Name/)
    rendered.should match(/Cover Image/)
    rendered.should match(/Secret Key/)
    rendered.should match(//)
  end
end
