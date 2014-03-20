class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  load_and_authorize_resource :only=>[:show, :new, :edit, :destroy]
  
  def index
    #@users = User.all
    @users = User.where("delete_flag is not true")
  end
  
  def show
  end

  def new
    @user = User.new
  end

  def edit
  end

  def user_create
    @user = User.new(user_params)
    
    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render action: 'show', status: :created, location: @user }
      else
        format.html { render action: 'new' }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end
  
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end
  
  def destroy
    @user.update_attributes(:delete_flag=>true)
   # @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url }
      format.json { head :no_content }
    end
  end
  
  def delete_multiple_user
    if params[:checked_user] != nil
      params[:checked_user].each do|i|
        @user = User.find(i.to_i)
        @user.update_attributes(:delete_flag=>true)
        #@user.destroy
      end  
    end
    respond_to do |format|
      format.html { redirect_to users_url }
      format.json { head :no_content }
    end
  end
  
  def checked_user
    @checked_user = []
    @checked_user << params[:user_id].to_i
    respond_to do |format|
      format.html {render text: "OK"}
    end      
  end
  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :username, :email, :password, :password_confirmation)
  end
end