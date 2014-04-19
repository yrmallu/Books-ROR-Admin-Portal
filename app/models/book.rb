class Book < ActiveRecord::Base
  self.primary_key = "id"
  has_many :preview_images, :dependent => :destroy  
  accepts_nested_attributes_for :preview_images, :allow_destroy=> true, :reject_if => :all_blank

  has_attached_file :epub,
                    :url  => "/images/assets/template/:id/:style/:basename.:extension",
                    :path => ":rails_root/public/images/assets/template/:id/:style/:basename.:extension",
                    :use_timestamp => false
  
  has_attached_file :book_cover, :styles => { :large => "300x300>", :small => "100x100>" }, :default_url => "/images/:style/missing.png",
                    :url  => "/images/assets/template/:id/:style/:basename.:extension",
                    :path => ":rails_root/public/images/assets/template/:id/:style/:basename.:extension",
                    :use_timestamp => false

  validates_attachment_content_type :book_cover, :content_type => /\Aimage\/.*\Z/
  # validates_attachment_content_type :book_cover_large, :content_type => /\Aimage\/.*\Z/
  # validates_attachment_content_type :preview_book_image, :content_type => /\Aimage\/.*\Z/
  validates_attachment_content_type :epub, :content_type => ['application/epub+zip']

  # accepts_nested_attributes_for :images, :allow_destroy=> true, :reject_if => :all_blank
  validates_presence_of :title
 
  paginates_per 10
  max_paginates_per 10
end
