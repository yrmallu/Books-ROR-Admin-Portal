class Api::BooksController < ApplicationController
	skip_before_filter  :verify_authenticity_token

	def read
		book_unique_id = params[:book_unique_id]
		render :file => "#{Rails.root}/public/books/#{book_unique_id}/OEBPS/index.html", :layout => false, :status => 200
	end

	def table_of_content
		book_unique_id = params[:book_unique_id]
		file_path = "#{Rails.root}/public/books/#{book_unique_id}/OEBPS/toc.ncx"
		File.open(file_path, "r") {|file|  @toc = Nokogiri::HTML(file.read)} 
		render json: jsonify_toc(@toc), status: 200
	end

	private

	def jsonify_toc(toc)
		toc_json = {}
		count = 0
		toc.css('navpoint').each do |navpoint|	
			id = navpoint.attributes["id"].value	
			text = navpoint.at_css('text').text
			src = navpoint.at_css('content').attributes['src'].value
			toc_json.merge!(count.to_s => { "id" => id, "text" => text, "src" => src})
			count += 1
		end
		toc_json
	end
end


