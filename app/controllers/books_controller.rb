require 'rubyzip'
class BooksController < ApplicationController
  before_action :set_book, only: [:show, :edit, :update, :destroy]

  # GET /books
  # GET /books.json
  def index
    #@books = Book.all
    @books = Book.order("created_at DESC").page params[:page]
  end

  # GET /books/1
  # GET /books/1.json
  def show
  end

  # GET /books/new
  def new
    @book = Book.new
    @images = @book.images.build
  end

  # GET /books/1/edit
  def edit
  end

  # POST /books
  # POST /books.json
  def create
    @book = Book.new(book_params)
    @book.book_unique_id = Time.now.to_i.to_s
    binding.pry
    respond_to do |format|
      if @book.save
        parse_epub @book, @book.images.find_by_epub_book_content_type("application/epub+zip").epub_book.path
        format.html { redirect_to @book, notice: 'Book was successfully created.' }
        format.json { render action: 'show', status: :created, location: @book }
      else
        format.html { render action: 'new' }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

def parse_epub(book, path)
    list_file_names = Array.new
    file_name = ""
    preview_splash_path = ""
    list_files = {}
    xml_file = ""
    xhtml_files = []    
    spine_files = []
    arr = path.split("/")
    arr.pop
    dir_name = FileUtils.mkdir_p(book.book_unique_id)
    dest_path = "#{Rails.root}/public/books/#{dir_name.first}"
    RubyZip::File.open(path) { |zip_file|
      zip_file.each { |f|
        next if f.name =~ /__MACOSX/ or f.name =~ /\.DS_Store/ #or !f.file?
        list_file_names.push(f.name)
        f_path = File.join(dest_path, f.name)
        list_files.store(f.name,f_path)
        FileUtils.mkdir_p(File.dirname(f_path))
        zip_file.extract(f, f_path) unless File.exist?(f_path)
      }
    }

    f =  list_files["META-INF/container.xml"] if list_files.keys.include?("META-INF/container.xml")
    File.open(f, "r") {|file|  @doc = Nokogiri::HTML(file.read)} 
    @doc.xpath("//rootfile").each{|x|  xml_file=x.attributes["full-path"].value}
    File.open(list_files[xml_file], "r") {|file|  @doc_opf = Nokogiri::HTML(file.read)} 
    
    @doc_opf.xpath("//spine").each do |x|
      x.xpath("//itemref").each{|y| spine_files << y.attributes['idref'].value }
    end
    
    @doc_opf.xpath("//manifest").each do |x|
      x.xpath("//item").each{|y| next if !spine_files.include?(y.attributes['id'].value); xhtml_files << y.attributes['href'].value if File.extname(y.attributes['href'].value).eql?(".xhtml")}
    end
    # we can to in normal after saving 
    css_tags = []
    js_tags = []
    ["jquery_1.7.2.min.js", "page_flip.js", "reader_reusables.js", "touchswipe.js"].each{|js| js_tags << "<script type=\"text/javascript\" src=\" http://#{local_ip}:3000/public/js/#{js} \"></script>" }
    path_with_ip = dest_path.gsub("#{Rails.root}/public","http://#{local_ip}:3000" )
    list_files.each do |k, v|
      ip_path = v.gsub("#{Rails.root}/public","http://#{local_ip}:3000" )
      if v.split("/").last.split(".").last == "css" 
       css_tags <<  "<link rel=\"stylesheet\" type=\"text/css\" href=\"" + ip_path + " \"> </link>"
      end
    end 
    css_tags.delete_at(0)
    re = css_tags.join(" ")
    style_tag = "<style type=\"text/css\"> .disallowselection {  -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: -moz-none;-ms-user-select: none; user-select: none; background: red; } </style>"
    re << style_tag
    re << "<div id=\"content\"> <div class=\"story_content\" id=\"story_content\">" 
    xhtml_files.each do |f|    
      x = "OEBPS/" + f
      div_id = f.split(".").first
      bookchapterholder_div = " <div id=\"" + div_id + "\" class=\"bookchapterholder\"> </div>"
      re << bookchapterholder_div
      p "writing to an html",list_files[x], re
      File.open(list_files[x], "r") {|file|  @body_doc = Nokogiri::HTML(file.read)} 
      @body_doc.css("img").each do |link|
        link.attributes["src"].value = path_with_ip + "/OEBPS/" + link.attributes["src"].value 
      end
      File.open(list_files[x], "r") {|file| re << @body_doc.xpath("//body").to_html}
      re.slice! "<body>"
      re.slice! "</body>"
      re << "</div>"
    end
    re << "</div> </div>"
    re << js_tags.join(" ")
    file_path = dest_path + "/OEBPS/index.html"
    File.open(file_path , "w") {|fi| fi.puts re}
  end

  def update
    respond_to do |format|
      if @book.update(book_params)
        format.html { redirect_to @book, notice: 'Book was successfully updated.' }
        format.json { render action: 'show', status: :ok, location: @book }
      else
        format.html { render action: 'edit' }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /books/1
  # DELETE /books/1.json
  def destroy
    @book.destroy
    respond_to do |format|
      format.html { redirect_to books_url }
      format.json { head :no_content }
    end
  end
  

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_book
      @book = Book.includes(:images).find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def book_params
      params.require(:book).permit(:id, :title, :description, :author, :images_attributes=> [:name,:book_cover,:book_cover_large,:preview_book_image,:epub_book,:book_id])
    end
end
