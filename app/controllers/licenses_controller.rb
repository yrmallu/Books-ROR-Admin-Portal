class LicensesController < ApplicationController
  before_action :set_license, only: [:show, :edit, :destroy]

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
			  get_license_by_school_id
			  #flash[:success] = "License created."
         }
	end
  end

  def update
    @license = License.find(params[:id])
	  @licenses = License.where("school_id = '#{params[:license][:school_id]}'").order("created_at DESC")
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
                }                         
    end
  end
  
 def destroy
    @license.destroy
	@licenses = License.where("school_id = '#{params[:school_id]}'").order("created_at DESC")
    respond_to do |format|
      format.html { redirect_to licenses_url }
      format.js {  }
    end
  end

  def get_license_by_school_id
  	@licenses = License.where("school_id = '#{params[:license][:school_id]}'").order("created_at DESC")
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_license
      @license = License.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def license_params
      params.require(:license).permit(:no_of_licenses, :expiry_date, :school_id)
    end
end
