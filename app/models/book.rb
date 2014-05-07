require 'zip/zip'
class Book < ActiveRecord::Base

  self.primary_key = "id"

  # extends ...................................................................

  # includes ..................................................................
  include CommonQueries 
  
  # relationships .............................................................
  has_many :preview_images, :dependent => :destroy  
  
  # attachments ...............................................................
  has_attached_file :epub,
  :url  => "/images/assets/template/books/:id/:style/:basename.:extension",
  :path => ":rails_root/public/images/assets/template/books/:id/:style/:basename.:extension",
  :use_timestamp => false
  
  has_attached_file :book_cover, :styles => { :large => "300x300>", :small => "100x100>" }, :default_url => "/images/:style/missing.png",
  :url  => "/images/assets/template/books/:id/:style/:basename.:extension",
  :path => ":rails_root/public/images/assets/template/books/:id/:style/:basename.:extension",
  :use_timestamp => false

  # validations ...............................................................
  validates_attachment_content_type :book_cover, :content_type => /\Aimage\/.*\Z/
  validates_attachment_content_type :epub, :content_type => ['application/epub+zip', 'application/octet-stream']
  validates_attachment_presence :epub
  validates_attachment_presence :book_cover
  validates :title, :presence=> true, :length => {:maximum => 255}
  validates :description, :length => {:maximum => 255}, :allow_blank => true
  validates :author, :length => {:maximum => 255}, :allow_blank => true
  

  # callbacks .................................................................
  after_save :update_preview_name

  # scopes ....................................................................

  # additional config (i.e. accepts_nested_attribute_for etc...) ..............
  paginates_per 10
  max_paginates_per 10  
  @trigger_after_save = nil
  accepts_nested_attributes_for :preview_images, :allow_destroy=> true, :reject_if => :all_blank


  # class methods .............................................................
  def self.search(query_string)
    book = Book.arel_table
    books = Book.where(
      book[:title].matches(query_string).or(
        book[:description].matches(query_string).or(
          book[:author].matches(query_string)
        )
      )
    )
  end

  # public instance methods ...................................................

  def parse_epub
    list_file_names = Array.new
    list_files = {}
    xhtml_files = []    
    dir_name = FileUtils.mkdir_p(book_unique_id)
    dest_path = "#{Rails.root}/public/books/#{dir_name.first}"
    Zip::ZipFile.open(epub.path) { |zip_file|
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
    css_tags, js_tags = get_css_js_tags list_files, server_ip
    path_with_ip = dest_path.gsub("#{Rails.root}/public","http://#{server_ip}" )
    index_file_string = generate_index_file_string xhtml_files, list_files, index_file_string, css_tags.join(" "), js_tags.join(" "), path_with_ip
    cp_file_list = [dest_path+"/OEBPS/covers/", dest_path+"/OEBPS/css/", dest_path+"/OEBPS/fonts/", dest_path+"/OEBPS/images/", dest_path+"/OEBPS/js/", dest_path+"/OEBPS/package.opf",dest_path+"/OEBPS/toc.ncx" ]
    FileUtils.cp_r cp_file_list, dest_path rescue
    FileUtils.rm_rf [dest_path+"/OEBPS", dest_path+"/META-INF"]
    FileUtils.remove_file dest_path+"/mimetype"
    FileUtils.rm_rf  "#{Rails.root}/#{dir_name.first}"
    File.open(dest_path+"/index.html" , "w") {|fi| fi.puts index_file_string}
  end

  def delete_book
    delete_flag = true
    save
  end
  # protected instance methods ................................................

  # private instance methods ..................................................
  private

  def local_ip
    orig, Socket.do_not_reverse_lookup = Socket.do_not_reverse_lookup, true  # turn off reverse DNS resolution temporarily
    
    UDPSocket.open do |s|
      s.connect '64.233.187.99', 1
      s.addr.last
    end
  ensure
    Socket.do_not_reverse_lookup = orig
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
      end
      File.open(list_files[x], "r") {|file| index_file_string << @body_doc.xpath("//body").to_html}
      index_file_string.slice! "<body>"
      index_file_string.slice! "</body>"
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

  def update_preview_name
    if !@trigger_after_save
      @trigger_after_save = true
      self.preview_name = Hash[self.preview_images.pluck("id", "preview_image_file_name")]
      save
    end
  end
end
