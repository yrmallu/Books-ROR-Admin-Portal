class LicensesController < ApplicationController
  before_action :set_license, only: [:show, :edit, :destroy, :update]

  def index
    @licenses = License.all
  end

  def show
  end

  def new
    @licenses = License.where("school_id = '#{params[:school_id]}'").order("created_at DESC")
    @license = License.new
  end

  def edit
  end

  def create
    @license = License.new(license_params)
	respond_to do |format|
    	format.html {
			if @license.save
				#flash[:success] = "License created."
			    redirect_to @license
			else
			    render 'new'
			end
		 }  
		 format.js {
              @license.save  
			  get_licenses_list
			  #flash[:success] = "License created."
         }
	end
  end

  def update
    get_licenses_list
    respond_to do |format|
      format.html {
                     if @license.update_attributes(license_params)
                        redirect_to @license
                      else
                        render 'new'    
                      end 
                  }   
      format.js {
                  @license.update_attributes(license_params) 
				  @license = License.new
                }                         
    end
  end
  
 def destroy
    @license.destroy
	get_licenses_list
	respond_to do |format|
      format.html { redirect_to licenses_url }
      format.js {  }
    end
  end

  def get_licenses_list
    @licenses = License.where("school_id = '#{@license.school_id}'").order("created_at DESC")
  end
  
  private
    def set_license
      @license = License.find(params[:id])
    end

    def license_params
      params.require(:license).permit(:no_of_licenses, :expiry_date, :school_id)
    end
end
