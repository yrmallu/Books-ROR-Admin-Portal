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
    # binding.pry
    respond_to do |format|
      if @book.save
        # binding.pry
        parse_epub @book.images.find_by_epub_book_content_type("application/epub+zip").epub_book.path
        # binding.pry
        format.html { redirect_to @book, notice: 'Book was successfully created.' }
        format.json { render action: 'show', status: :created, location: @book }
      else
        format.html { render action: 'new' }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

def parse_epub(path)
  # path = "/Users/cuelogic/Downloads/the_necklace.epub"
    list_file_names = Array.new
    file_name = ""
    preview_splash_path = ""
    list_files = {}
    xml_file = ""
    xhtml_files = []    
    spine_files = []
    arr = path.split("/")
    arr.pop
    dest_path = arr.join("/")+"/"
    # binding.pry
    RubyZip::File.open(path) { |zip_file|
      zip_file.each { |f|
        next if f.name =~ /__MACOSX/ or f.name =~ /\.DS_Store/ #or !f.file?
        p "1",f.name
        # binding.pry
        list_file_names.push(f.name)
        # binding.pry
        f_path = File.join(dest_path, f.name)
        # binding.pry
        p "2",f_path
        list_files.store(f.name,f_path)
        # binding.pry
        FileUtils.mkdir_p(File.dirname(f_path))
        zip_file.extract(f, f_path) unless File.exist?(f_path)
      }
    }
    # binding.pry
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
    
    @doc_opf.xpath("//spine").each do |x|
      x.xpath("//itemref").each{|y| spine_files << y.attributes['idref'].value }
    end
    p "spine_files", spine_files
    # we can to in normal after saving 
    css_tags = []
    js_tags = []

    list_files.each do |k, v|
      if k.split("/").last.split(".").last == "css" 
       css_tags <<  "<link rel=\"stylesheet\" type=\"text/css\" href=\"" + v + "\" />"
      elsif k.split("/").last.split(".").last == "js"
        js_tags << "<script type=\"text/javascript\" src=\"" + v + "\"></script>"
      end
    end 

    re = css_tags.join(" ")
    style_tag = "<style type=\"text/css\"> .disallowselection {  -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: -moz-none;-ms-user-select: none; user-select: none; background: red; } </style>"
    re << style_tag

    list_files.keys.each do |x|
      next if !xhtml_files.include?(File.basename(x))
      # binding.pry
      div_id = x.split("/").last.split(".").first
      start_div = " <div id=\"" + div_id + "\" class=\"bookchapterholder\">"
      re << start_div
      p "writing to an html",list_files[x], re
      File.open(list_files[x], "r") {|file|  @body_doc = Nokogiri::HTML(file.read)} 
      File.open(list_files[x], "r") {|file| re << @body_doc.xpath("//body").to_html}
      re.slice! "<body>"
      re.slice! "</body>"
      re << "</div>"
    end
    re << js_tags.join(" ")
    # book_id = ""
    # path.split("/").each{|val| id = val if val.to_i > 0}
    File.open(dest_path + "OEBPS/index.xhtml", "w") {|fi| fi.puts re}
    p "all html data", re
    p "very good", xhtml_files, list_files[xhtml_files[0]]

  end

  # PATCH/PUT /books/1
  # PATCH/PUT /books/1.json
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
