class ClassroomsController < ApplicationController
  
  before_action :set_classroom, only: [:show, :edit, :update, :destroy]
  before_action :set_bread_crumb, only: [:index, :show, :edit, :new]
  before_action :get_school_by_id, only: [:new, :index, :edit]
  
  def index
    @classrooms = Classroom.where("school_id = '#{params[:school_id]}' AND delete_flag is not true").order("created_at DESC").page params[:page]
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
    if @classroom.save
      redirect_to classrooms_path(:school_id=> @classroom.school_id), notice: 'Classroom created.'
	else
      render :action=> 'new'
	end
  end

  def update
    if @classroom.update(classroom_params)
      redirect_to classroom_path(:school_id=> @classroom.school_id), notice: 'Classroom updated.'
    else
      render :action=> 'edit'
    end
  end

  def destroy
    @classroom.update_attributes(:delete_flag=>true)
    redirect_to classrooms_path(:school_id=> @classroom.school_id), notice: 'Classroom deleted.' 
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
      params.require(:classroom).permit(:code, :name, :school_id)
    end
end
