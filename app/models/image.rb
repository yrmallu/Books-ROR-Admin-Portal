class Image < ActiveRecord::Base
  belongs_to :book
  
  has_attached_file :book_cover, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png",
                    :url  => "/images/assets/template/:id/:style/:basename.:extension",
                    :path => ":rails_root/public/images/assets/template/:id/:style/:basename.:extension",
                    :use_timestamp => false
  has_attached_file :book_cover_large, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png",
                    :url  => "/images/assets/template/:id/:style/:basename.:extension",
                    :path => ":rails_root/public/images/assets/template/:id/:style/:basename.:extension",
                    :use_timestamp => false
  has_attached_file :preview_book_image, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png",
                    :url  => "/images/assets/template/:id/:style/:basename.:extension",
                    :path => ":rails_root/public/images/assets/template/:id/:style/:basename.:extension",
                    :use_timestamp => false
  has_attached_file :epub_book,
                    :url  => "/images/assets/template/:id/:style/:basename.:extension",
                    :path => ":rails_root/public/images/assets/template/:id/:style/:basename.:extension",
                    :use_timestamp => false
                                                
  validates_attachment_content_type :book_cover, :content_type => /\Aimage\/.*\Z/
  validates_attachment_content_type :book_cover_large, :content_type => /\Aimage\/.*\Z/
  validates_attachment_content_type :preview_book_image, :content_type => /\Aimage\/.*\Z/
  validates_attachment_content_type :epub_book, :content_type => ['application/epub+zip']
end
