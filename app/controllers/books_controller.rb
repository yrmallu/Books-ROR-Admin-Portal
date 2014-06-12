# require 'rubyzip'
class BooksController < ApplicationController

  before_action :logged_in?
  before_action :set_book, only: [:show, :edit, :update, :destroy]
  before_action :set_bread_crumb, only: [:index, :show, :edit, :new]
  before_action :get_reading_grades, only: [:new, :edit, :create, :update]

  load_and_authorize_resource :only=>[:show, :new, :edit, :destroy, :index]

  def index
    if params[:query_string] && !(params[:query_string].blank?)
      @books = Book.search("%#{params[:query_string]}%").un_archived.page(params[:page]).per(10) 
      @search_flag = true
    elsif params[:show_all].blank?
      @books = Book.un_archived.by_newest.page params[:page]
      @search_flag = false
    elsif params[:show_all].eql?('true')
      @books = Book.un_archived.by_newest
    end  
  end

  def show
    @arr_concatinated_reading_levels = []
    unless @book.book_reading_grades.blank?
      arr_reading_level_ids = @book.book_reading_grades.map(&:reading_grade_id) 
      arr_reading_level_ids.each do |reading_level_id|
        @arr_concatinated_reading_levels << ReadingGrade.find(reading_level_id).grade_short + "( " + ReadingGrade.find(reading_level_id).grade_name + " )"
      end
    end  
  end

  def new
    @book = Book.new
  end

  def edit
    @book.preview_images.build
  end

  def create
    @book = Book.new(book_params)
    @book.book_unique_id = Time.now.to_i.to_s
    respond_to do |format|
      if @book.save
        @book.parse_epub 
        format.html { 
          params[:reading_level].each{|reading_level_id| @book.book_reading_grades.create(:book_id=> @book.id, :reading_grade_id=>reading_level_id) } unless params[:reading_level].blank?
          redirect_to @book, notice: 'Book created.' 
        }
        format.json { render action: 'show', status: :created, location: @book }
      else
        format.html { render action: 'new' }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @book.update(book_params)
        FileUtils.rm_rf  "#{Rails.root}/public/books/#{@book.book_unique_id}"
        @book.parse_epub 
        format.html { 
          unless params[:reading_level].blank?
            @book.book_reading_grades.destroy_all
            params[:reading_level].each{|reading_level_id| @book.book_reading_grades.create(:book_id=> @book.id, :reading_grade_id=>reading_level_id) } unless params[:reading_level].blank?
          end
          redirect_to @book, notice: 'Book updated.' 
        }
        format.json { render action: 'show', status: :ok, location: @book }
      else
        format.html { render action: 'edit' }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @book.update_attributes(:delete_flag => true)
    FileUtils.rm_rf  "#{Rails.root}/public/books/#{@book.book_unique_id}"
    respond_to do |format|
      format.html { redirect_to books_url, notice: 'Book archived.' }
      format.json { head :no_content }
    end
  end
  
  def delete_book
    Book.where(id: params[:book_ids]).each do |book|
      book.update_attributes(:delete_flag => true)
      FileUtils.rm_rf  "#{Rails.root}/public/books/#{book.book_unique_id}"
    end
    flash[:success] = "Books archived." 
    redirect_to books_path
  end

  def get_reading_grades
    @reading_grades = ReadingGrade.all
  end

  def show_all_books
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_book
      @book = Book.includes(:preview_images).find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def book_params
      params.require(:book).permit(:title, :student_description, :teacher_description, :interest_level_from, :interest_level_to, :active_flag, :author, :book_cover, :epub, :preview_images_attributes=> [:preview_image, :book_id, :_destroy, :id ])
    end
    
end








