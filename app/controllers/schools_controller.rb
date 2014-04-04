class SchoolsController < ApplicationController
  before_action :set_school, only: [:show, :edit, :update, :destroy, :get_schoolwise_license_list]
  before_action :get_schools, only: [:index]

  before_action :set_bread_crumb, only: [:index, :show, :edit, :new]
  
  load_and_authorize_resource :only=>[:show, :new, :edit, :destroy, :index]
  
  def index
  end

  def show
  end

  def new
    @school = School.new
	  @licenses = @school.licenses.build()
  end

  def edit
  end

  def create
    @school = School.new(school_params)
    @school.country = 'US'
    respond_to do |format|
      if @school.save
        format.html { 
						flash[:success] = "School created."
						redirect_to @school  
					}
        format.json { render action: 'show', status: :created, location: @school }
      else
        format.html { render action: 'new' }
        format.json { render json: @school.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @school.country = 'US'
    respond_to do |format|
      if @school.update(school_params)
        format.html { 
						flash[:success] = "School updated." 
						redirect_to @school
					}
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @school.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    respond_to do |format|
      format.html { 
	  			      @school.update_attributes(:delete_flag=>true)
					  @licenses = @school.licenses
					  @licenses.each do |license|
					    license.update_attributes(:delete_flag=>true)
					  end
				      flash[:success] = "School deleted." 
  				      redirect_to schools_url	
				  }
      format.json { head :no_content }
    end
  end
  
  def get_schoolwise_license_list
     @license_assign_count = []
    @licenses = @school.licenses.where("delete_flag is not true").order("created_at DESC").page params[:page]
	p "school admin cnt====", @licenses_allocated = User.select("role_id, school_id, count(license_id) as total_license_count").group("role_id, school_id").having("school_id =?", params[:id])
    @licenses_allocated.each{|x|  @license_assign_count << x.total_license_count}
	@admin_licenses = @license_assign_count[0]
	@teacher_licenses = @license_assign_count[1]
	@student_licenses = @license_assign_count[2]
	render :partial=>"license_list"
  end
  
  def delete_school
    School.where(id: params[:school_ids]).each do |school|
      school.update_attributes(delete_flag: true)
    end
    respond_to do |format|
      format.js
    end
  end
  
  def subregion_options
    render partial: 'subregion_select'
  end
  
  private
    def set_school
      @school = School.find(params[:id])
    end

    def school_params
      params.require(:school).permit(:code, :name, :address, :city, :district, :state, :country, :phone,:licenses_attributes=> [:id,:license_group_id,:expiry_date,:no_of_licenses,:school_id])
    end
end
