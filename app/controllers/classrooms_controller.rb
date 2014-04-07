class ClassroomsController < ApplicationController
  before_action :set_classroom, only: [:show, :edit, :update, :destroy]
  
  before_action :set_bread_crumb, only: [:index, :show, :edit, :new]

  def index
    @classrooms = Classroom.order("created_at DESC").page params[:page]
  end

  def show
  end

  def new
    @classroom = Classroom.new
  end

  def edit
  end

  def create
    @classroom = Classroom.new(classroom_params)

    respond_to do |format|
      if @classroom.save
        format.html { redirect_to @classroom, notice: 'Classroom was successfully created.' }
        format.json { render action: 'show', status: :created, location: @classroom }
      else
        format.html { render action: 'new' }
        format.json { render json: @classroom.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @classroom.update(classroom_params)
        format.html { redirect_to @classroom, notice: 'Classroom was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @classroom.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @classroom.destroy
    respond_to do |format|
      format.html { redirect_to classrooms_url }
      format.json { head :no_content }
    end
  end

  def delete_classroom
    Classroom.where(id: params[:classroom_ids]).each do |classroom|
      classroom.destroy
    end
    respond_to do |format|
      format.js
    end  
  end
  
  private
    def set_classroom
      @classroom = Classroom.find(params[:id])
    end

    def classroom_params
      params.require(:classroom).permit(:code, :name, :cover_image, :secret_key, :classroom_count, :teacher_count, :student_count, :school_id)
    end
end
