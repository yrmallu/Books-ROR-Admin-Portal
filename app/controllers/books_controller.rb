class BooksController < ApplicationController
  before_action :set_book, only: [:show, :edit, :update, :destroy]

  # GET /books
  # GET /books.json
  def index
    @books = Book.all
  end

  # GET /books/1
  # GET /books/1.json
  def show
  end

  # GET /books/new
  def new
    @book = Book.new
  end

  # GET /books/1/edit
  def edit
  end

  # POST /books
  # POST /books.json
  def create
    @book = Book.new(book_params)
    binding.pry
    respond_to do |format|
      if @book.save
        format.html { redirect_to @book, notice: 'Book was successfully created.' }
        format.json { render action: 'show', status: :created, location: @book }
      else
        format.html { render action: 'new' }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

def parse_epub
  path = "/Users/cuelogic/Downloads/the_necklace.epub"
    list_file_names = Array.new
    file_name = ""
    preview_splash_path=""
    list_files = {}
    xml_file = ""
    xhtml_files = []    
    spine_files = []
    dest_path = "#{Rails.root}/public/images/assets/template/2/original/"
    Zip::File.open(path) { |zip_file|
      zip_file.each { |f|
        next if f.name =~ /__MACOSX/ or f.name =~ /\.DS_Store/ or !f.file?
        p "1",f.name
        list_file_names.push(f.name)
        f_path = File.join(dest_path, f.name)
        p "2",f_path
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
    
    @doc_opf.xpath("//spine").each do |x|
      x.xpath("//itemref").each{|y| spine_files << y.attributes['idref'].value }
    end
    p "spine_files", spine_files
    # we can to in normal after saving 
    re = ""
    list_files.keys.each do |x|
      next if !xhtml_files.include?(File.basename(x))
      p "writing to an html",list_files[x], re
      File.open(list_files[x], "r") {|file|  @body_doc = Nokogiri::HTML(file.read)} 
      File.open(list_files[x], "r") {|file| re << @body_doc.xpath("//body").to_html}
      re.slice! "<body>"
      re.slice! "</body>"
    end

    File.open("/Users/cuelogic/ruby-zip/public/images/assets/template/2/original/OEBPS/#{Time.now.to_i}.xhtml", "w") {|fi| fi.puts re}
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
      @book = Book.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def book_params
      params.require(:book).permit(:title, :description, :author, :book_cover, :epub_book)
    end
end
