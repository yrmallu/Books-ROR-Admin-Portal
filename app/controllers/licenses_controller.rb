class LicensesController < ApplicationController
  before_action :set_license, only: [:show, :edit, :destroy, :update]

  def index
    @licenses = License.all
  end

  def show
  end

  def new
    @licenses = License.where("school_id = #{params[:school_id]} AND delete_flag is not true").order("created_at DESC").page params[:page]
    @license = License.new
    @school_id = params["school_id"]
	set_bread_crumb(@school_id)
  end

  def edit
     @license = License.find(params[:id])
     @school_id = @license.school_id
     @licenses = License.where("school_id = #{params[:school_id]} AND delete_flag is not true").order("created_at DESC").page params[:page]
  end

  def create
   @license = License.new(license_params)
   @school_id = license_params[:school_id]
   respond_to do |format|
    	format.html {
			if @license.save
			    redirect_to @license
			else
			    render 'new'
			end
		}  
		format.js {
              @license.save 
              refresh_licenses_list
    }
	end
  end

  def update
    @license = License.find(params[:id])
    @school_id = @license.school_id
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
                  refresh_licenses_list
				}                         
    end
  end
  
 def destroy
   @license.update_attributes(:delete_flag=>true)
   @licenses = License.where("school_id = '#{@license.school_id}' AND delete_flag is not true").order("created_at DESC").page params[:page]
   respond_to do |format|
      format.html { redirect_to licenses_url }
      format.js {  }
    end
  end

  private
    def set_license
      @license = License.find(params[:id])
    end

    def license_params
      params.require(:license).permit(:no_of_licenses, :expiry_date, :school_id, :license_batch_name)
    end

    def refresh_licenses_list
      @license = License.new
      @licenses = License.where("school_id = #{@school_id} AND delete_flag is not true").order("created_at DESC")
    end  
end
