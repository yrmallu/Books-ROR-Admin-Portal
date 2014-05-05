require 'rubyzip'
class BooksController < ApplicationController

  before_action :logged_in?
  before_action :set_book, only: [:show, :edit, :update, :destroy]

  # GET /books
  # GET /books.json
  def index
    #@books = Book.all
    # @books = Book.order("created_at DESC").page params[:page]
    if params[:query_string] && !(params[:query_string].blank?)
      @books = Book.search("%#{params[:query_string]}%").page(params[:page]).per(10) 
      @search_flag = true
    else
      @books = Book.page params[:page]
      @search_flag = false
    end
    
  end

  # GET /books/1
  # GET /books/1.json
  def show
  end

  # GET /books/new
  def new
    @book = Book.new
    # @book.preview_images.build
  end

  # GET /books/1/edit
  def edit
    @book.preview_images.build
  end

  # POST /books
  # POST /books.json
  def create
    @book = Book.new(book_params)
    @book.book_unique_id = Time.now.to_i.to_s
    respond_to do |format|
      if @book.save
        parse_epub @book, @book.epub.path
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
    server_ip = ""
    case local_ip.split(".").first
      when '192'
        server_ip = "#{local_ip}:3000"
      when '10'
        server_ip = "54.83.84.222"
    end
    xhtml_files = get_xhtml_files list_files   
    # we can to in normal after saving 
    css_tags, js_tags = get_css_js_tags list_files, server_ip
    # ["jquery_1.7.2.min.js", "page_flip.js", "reader_reusables.js", "touchswipe.js"].each{|js| js_tags << "<script type=\"text/javascript\" src=\" http://#{local_ip}:3000/public/js/#{js} \"></script>" }
    # ["jquery_1.7.2.min.js", "page_flip.js", "reader_reusables.js", "touchswipe.js"].each{|js| js_tags << "<script type=\"text/javascript\" src=\" http://107.21.250.244/books-that-grow-web-app/uploads_dir/js/#{js} \"></script>" }
    

    
    path_with_ip = dest_path.gsub("#{Rails.root}/public","http://#{server_ip}" )
    # path_with_ip = dest_path.gsub("#{Rails.root}/public/books/","http://107.21.250.244/books-that-grow-web-app/uploads_dir/read-book/" )
    index_file_string = generate_index_file_string xhtml_files, list_files, index_file_string, css_tags.join(" "), js_tags.join(" "), path_with_ip
    cp_file_list = [dest_path+"/OEBPS/covers/", dest_path+"/OEBPS/css/", dest_path+"/OEBPS/fonts/", dest_path+"/OEBPS/images/", dest_path+"/OEBPS/js/", dest_path+"/OEBPS/package.opf",dest_path+"/OEBPS/toc.ncx" ]
    FileUtils.cp_r cp_file_list, dest_path rescue
    FileUtils.rm_rf [dest_path+"/OEBPS", dest_path+"/META-INF"]
    FileUtils.remove_file dest_path+"/mimetype"
    FileUtils.rm_rf  "#{Rails.root}/#{dir_name.first}"
    # file_path = dest_path + "/OEBPS/index.html"
    File.open(dest_path+"/index.html" , "w") {|fi| fi.puts index_file_string}
  end

  def update
    respond_to do |format|
      if @book.update(book_params)
         FileUtils.rm_rf  "#{Rails.root}/public/books/#{@book.book_unique_id}"
         parse_epub @book, @book.epub.path
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
    dir_name = @book.book_unique_id
    @book.destroy
    FileUtils.rm_rf  "#{Rails.root}/public/books/#{dir_name}"
    respond_to do |format|
      format.html { redirect_to books_url }
      format.json { head :no_content }
    end
  end
  
  def delete_book
    deleted_book = ''
    Book.where(id: params[:book_ids]).each do |book|
    deleted_book = book
    dir_name = book.book_unique_id
    book.destroy
    FileUtils.rm_rf  "#{Rails.root}/public/books/#{dir_name}"
    end
  redirect_to books_path
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_book
      @book = Book.includes(:preview_images).find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def book_params
      params.require(:book).permit(:id, :title, :description, :author, :book_cover, :epub, :preview_images_attributes=> [:preview_image, :book_id, :_destroy, :id ])
    end

    def get_xhtml_files(list_files)
      xml_file = ""
      xhtml_files = []    
      spine_files = []

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
      xhtml_files
    end

    def get_css_js_tags(list_files, server_ip)
      css_tags = []
      js_tags = []
      js_list = ["jquery_1.7.2.min.js", "reader_reusables.js"]
      list_files.each do |k, v|
        ip_path = v.gsub("#{Rails.root}/public","http://#{server_ip}" )
        ip_path = ip_path.gsub("OEBPS/","" )
        if v.split("/").last.split(".").last == "css" 
         css_tags <<  "
         <link rel=\"stylesheet\" type=\"text/css\" href=\"" + ip_path + " \"> </link>"
        elsif (v.split("/").last.split(".").last == "js") && (js_list.include? v.split("/").last)
          binding.pry
          js_tags <<  "
          <script type=\"text/javascript\" src=\"" + ip_path + " \"></script>"
        end
      end 
      css_tags.delete_at(0)

      return css_tags, js_tags
    end

    def generate_index_file_string(xhtml_files, list_files, index_file_string, css_tags, js_tags, path_with_ip)
      index_file_string = css_tags
      style_tag = "
      <style type=\"text/css\"> 
      .disallowselection {  
        -webkit-touch-callout: none;
        -webkit-user-select: none; -khtml-user-select: none; 
        -moz-user-select: -moz-none;-ms-user-select: none; 
         user-select: none; background: red; 
       } 
       </style>"
      index_file_string << style_tag
      index_file_string << "
      <div id=\"content\">
       <div class=\"story_content\" id=\"story_content\">" 
      xhtml_files.each do |f|    
        x = "OEBPS/" + f
        div_id = f.split(".").first
        bookchapterholder_div = " 
        <div id=\"" + div_id + "\" class=\"bookchapterholder\"> </div>"
        index_file_string << bookchapterholder_div
        File.open(list_files[x], "r") {|file|  @body_doc = Nokogiri::HTML(file.read)} 
        @body_doc.css("img").each do |link|
          link.attributes["src"].value = path_with_ip + "/" + link.attributes["src"].value
          # link.attributes["src"].value = "http://107.21.250.244/books-that-grow-web-app/uploads_dir/read-book/#{dir_name.first}/OEBPS/" + link.attributes["src"].value  
        end
        File.open(list_files[x], "r") {|file| index_file_string << @body_doc.xpath("//body").to_html}
        index_file_string.slice! "<body>"
        index_file_string.slice! "</body>"
        # re << "</div>"
      end
      index_file_string << "</div>
       </div>"
      
      index_file_string << js_tags
      # index_file_string = add_js_script(index_file_string, path_with_ip)
    end 

    def add_js_script(index_file_string, path_with_ip)

        js_script = "
        <script type=\"text/javascript\">
        if (window.navigator.userAgent.indexOf(\"MSIE \") > 0)
        {
         var contentObject = document.getElementById(\"content\");         

         var touchJavaScript = document.createElement('script');
         touchJavaScript.type = 'text/javascript';
         touchJavaScript.src = '#{path_with_ip}/js/jquery_touch.js';
         contentObject.appendChild(touchJavaScript);

         var swipeJavaScript = document.createElement('script');
         swipeJavaScript.type = 'text/javascript';
         swipeJavaScript.src = '#{path_with_ip}/js/jquery_swipe.js';
         contentObject.appendChild(swipeJavaScript);
        }
        else
        {
        var swipeJavaScript = document.createElement('script');
             swipeJavaScript.type = 'text/javascript';
             swipeJavaScript.src = '#{path_with_ip}/js/touchswipe.js';
             contentObject.appendChild(swipeJavaScript);
        }
        </script>"
        index_file_string << js_script

    end
end
