require 'spec_helper'

describe "books/edit" do
  before(:each) do
    @book = assign(:book, stub_model(Book,
      :title => "MyString",
      :description => "MyText",
      :author => "MyString",
      :images => "",
      :book_file_name => "MyString",
      :chapters => 1,
      :book_unique_id => "MyString"
    ))
  end

  it "renders the edit book form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", book_path(@book), "post" do
      assert_select "input#book_title[name=?]", "book[title]"
      assert_select "textarea#book_description[name=?]", "book[description]"
      assert_select "input#book_author[name=?]", "book[author]"
      assert_select "input#book_images[name=?]", "book[images]"
      assert_select "input#book_book_file_name[name=?]", "book[book_file_name]"
      assert_select "input#book_chapters[name=?]", "book[chapters]"
      assert_select "input#book_book_unique_id[name=?]", "book[book_unique_id]"
    end
  end
end
