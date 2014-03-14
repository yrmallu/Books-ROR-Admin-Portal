require 'spec_helper'

describe "books/show" do
  before(:each) do
    @book = assign(:book, stub_model(Book,
      :title => "Title",
      :description => "MyText",
      :author => "Author",
      :images => "",
      :book_file_name => "Book File Name",
      :chapters => 1,
      :book_unique_id => "Book Unique"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Title/)
    rendered.should match(/MyText/)
    rendered.should match(/Author/)
    rendered.should match(//)
    rendered.should match(/Book File Name/)
    rendered.should match(/1/)
    rendered.should match(/Book Unique/)
  end
end
