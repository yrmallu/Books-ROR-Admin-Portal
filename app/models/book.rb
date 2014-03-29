class Book < ActiveRecord::Base
  has_attached_file :book_cover, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  has_attached_file :epub_book,
                    :url  => "/images/assets/template/:id/:style/:basename.:extension",
                    :path => ":rails_root/public/images/assets/template/:id/:style/:basename.:extension"
                                                
  validates_attachment_content_type :book_cover, :content_type => /\Aimage\/.*\Z/
  validates_attachment_content_type :epub_book, :content_type => ['application/epub+zip']

  validates :book_cover, :attachment_presence => true
  validates :epub_book, :attachment_presence => true
end
