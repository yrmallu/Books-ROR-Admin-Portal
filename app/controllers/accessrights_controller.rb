class AccessrightsController < ApplicationController
  before_action :set_accessright, only: [:show, :edit, :update, :destroy]

  # GET /accessrights
  # GET /accessrights.json
  def index
    @accessrights = Accessright.all
  end

  # GET /accessrights/1
  # GET /accessrights/1.json
  def show
  end

  # GET /accessrights/new
  def new
    @accessright = Accessright.new
  end

  # GET /accessrights/1/edit
  def edit
  end

  # POST /accessrights
  # POST /accessrights.json
  def create
    @accessright = Accessright.new(accessright_params)

    respond_to do |format|
      if @accessright.save
        format.html { redirect_to @accessright, notice: 'Accessright was successfully created.' }
        format.json { render action: 'show', status: :created, location: @accessright }
      else
        format.html { render action: 'new' }
        format.json { render json: @accessright.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /accessrights/1
  # PATCH/PUT /accessrights/1.json
  def update
    respond_to do |format|
      if @accessright.update(accessright_params)
        format.html { redirect_to @accessright, notice: 'Accessright was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @accessright.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /accessrights/1
  # DELETE /accessrights/1.json
  def destroy
    @accessright.destroy
    respond_to do |format|
      format.html { redirect_to accessrights_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_accessright
      @accessright = Accessright.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def accessright_params
      params.require(:accessright).permit(:name, :description)
    end
end
