class Api::BooksController < ApplicationController
	skip_before_filter :authentication_check
	before_filter :set_headers
	def read
		book_unique_id = params[:book_unique_id]
		render :file => "#{Rails.root}/public/books/#{book_unique_id}/index.html", :layout => false, :status => 200
	end

	def table_of_content
		toc = ""
		book_unique_id = params[:book_unique_id]
		file_path = "#{Rails.root}/public/books/#{book_unique_id}/toc.ncx"
		File.open(file_path, "r") {|file|  toc = Nokogiri::HTML(file.read)} 
		render json: jsonify_toc(toc), status: 200
	end

	private

	def jsonify_toc(toc)
		# toc_json = {}
		toc_json = []
		# count = 0
		toc.css('navpoint').each do |navpoint|	
			id = navpoint.attributes["id"].value	
			name = navpoint.at_css('text').text
			# src = navpoint.at_css('content').attributes['src'].value
			# toc_json.merge!(count.to_s => { "id" => id, "text" => text, "src" => src})
			toc_json << { :id => id, :name => text}
		end
		toc_json
	end

	 def set_headers
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Expose-Headers'] = 'Etag'
      headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD'
      headers['Access-Control-Allow-Headers'] = '*, x-requested-with, Content-Type, If-Modified-Since, If-None-Match'
      headers['Access-Control-Max-Age'] = '86400'
    end
end
# [{"id":"about_book", "name":"About this book"},{"id":"welcome", "name":"About Borne Digital"},{"id":"story1", "name":"Story"}]

