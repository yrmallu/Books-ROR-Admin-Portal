class LicensesController < ApplicationController
  before_action :set_license, only: [:show, :edit, :update, :destroy]

  def index
    @licenses = License.all
  end

  def show
  end

  def new
    @license = License.new
  end

 def edit
  end

  def create
    @license = License.new(license_params)
	respond_to do |format|
    	format.html {
			if @license.save
				flash[:success] = "License created."
			    redirect_to @license
			else
			    render 'new'
			end
		 }  
		 format.js {
              @license.save  
			  get_license_by_school_id
			  flash[:success] = "License created."
         }
	end
  end

  def update
    respond_to do |format|
      if @license.update(license_params)
        format.html { redirect_to @license, notice: 'License was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @license.errors, status: :unprocessable_entity }
      end
    end
  end

 def destroy
    @license.destroy
    respond_to do |format|
      format.html { redirect_to licenses_url }
      format.json {  }
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
