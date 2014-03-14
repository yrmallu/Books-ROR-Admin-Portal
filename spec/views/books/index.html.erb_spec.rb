require 'spec_helper'

describe "books/index" do
  before(:each) do
    assign(:books, [
      stub_model(Book,
        :title => "Title",
        :description => "MyText",
        :author => "Author",
        :images => "",
        :book_file_name => "Book File Name",
        :chapters => 1,
        :book_unique_id => "Book Unique"
      ),
      stub_model(Book,
        :title => "Title",
        :description => "MyText",
        :author => "Author",
        :images => "",
        :book_file_name => "Book File Name",
        :chapters => 1,
        :book_unique_id => "Book Unique"
      )
    ])
  end

  it "renders a list of books" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Title".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => "Author".to_s, :count => 2
    assert_select "tr>td", :text => "".to_s, :count => 2
    assert_select "tr>td", :text => "Book File Name".to_s, :count => 2
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => "Book Unique".to_s, :count => 2
  end
end
