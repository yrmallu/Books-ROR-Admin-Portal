class PreviewImage < ActiveRecord::Base

	belongs_to :book
	# before_save :test_method

	 has_attached_file :preview_image, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png",
                    :url  => "/images/assets/template/preview_images/:id/:style/:basename.:extension",
                    :path => ":rails_root/public/images/assets/template/preview_images/:id/:style/:basename.:extension",
                    :use_timestamp => false

    validates_attachment_content_type :preview_image, :content_type => /\Aimage\/.*\Z/

    # def test_method
    # 	binding.pry
    # end
end
