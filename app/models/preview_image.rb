class PreviewImage < ActiveRecord::Base

	belongs_to :book

	 has_attached_file :preview_image, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png",
                    :url  => "/images/assets/template/:id/:style/:basename.:extension",
                    :path => ":rails_root/public/images/assets/template/:id/:style/:basename.:extension",
                    :use_timestamp => false

    validates_attachment_content_type :preview_image, :content_type => /\Aimage\/.*\Z/
end
