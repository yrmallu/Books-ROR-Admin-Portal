class LicensesController < ApplicationController

  before_action :logged_in?
  before_action :set_license, only: [:show, :edit, :destroy, :update]
  
  load_and_authorize_resource :only=>[:show, :new, :edit, :destroy, :index]

  def index
    get_license_list
  end

  def show
  end

  def new
    if params[:query_string] && !(params[:query_string].blank?)
	  @licenses = License.search("%#{params[:query_string]}%", params[:school_id]).un_archived.by_newest.page params[:page]
	  @search_flag = true
	else
	  get_license_list
	  @search_flag = false
	end
    @license = License.new
    @school_id = params[:school_id]
	  #get_school(params[:school_id])
    set_bread_crumb(@school_id)
  end

  def edit
     @license = License.find(params[:id])
     @school_id = @license.school_id
     #get_school(params[:school_id])
     get_license_list
  end

  # def get_school
  #   @school = School.find(@school_id)
  # end
    
  def get_license_list
    @licenses = License.where("school_id = #{params[:school_id]}").un_archived.by_newest.page params[:page]
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
		      if @license.valid?
                @license.save 
                refresh_licenses_list
		      end
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
	              if @license.update_attributes(license_params).eql?(true)
	                @license.update_attributes(license_params)
					users = @license.users
					users.each do |user|
					  user.update_attributes(:license_expiry_date=>@license.expiry_date)
					end
				    refresh_licenses_list
				  else
				    @license.valid?
				  end
				}                         
    end
  end
  
 def destroy
   @user_licenses = User.where("license_id = '#{params[:id]}'") 
   unless @user_licenses.blank?
     @user_licenses.each do |user|
       user.update_attributes(:license_id=>"", :license_expiry_date=>"")
     end
   end
   @license.update_attributes(:delete_flag=>true)
   @licenses = License.where("school_id = '#{@license.school_id}'").un_archived.by_newest.page params[:page]
   
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
      @licenses = License.where("school_id = #{@school_id}").un_archived.by_newest.page params[:page]
    end  
end
