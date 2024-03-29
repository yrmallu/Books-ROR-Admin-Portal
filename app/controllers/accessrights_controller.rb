class AccessrightsController < ApplicationController

  before_action :logged_in?
  before_action :get_role_accessright, :only => [:new, :index]
  before_action :get_accessright, :only=>[:new, :edit, :check_role_accessright]
  before_action :set_role, :only => [:edit, :create, :update, :check_role_accessright]
  before_action :role_accessright, :only=>[:edit, :check_role_accessright]
  
  load_and_authorize_resource :only=>[:show, :new, :edit, :index]
  
  def new
    set_bread_crumb
  end
    
  def index
    set_bread_crumb
  end
    
  def edit
    set_bread_crumb
  end
    
  def create
    update
  end
    
  def update
    existing_rights = @role.accessrights.collect!{|i| i.id.to_s}
    added_rights = params[:checked_list].reject {|x| x.empty?}.join(",").split(",") - existing_rights
    removed_rights = params[:unchecked_list].reject {|x| x.empty?}.join(",").split(",") & existing_rights
    @role.add_accessrights(added_rights)
    @role.remove_accessright(removed_rights)
    redirect_to accessrights_path
  end
    
  def check_role_accessright
    if request.xhr?
      render :partial=>"accessright"
    end
  end
    
  def role_accessright
    @access_rights = @role.accessrights.collect!{|i| i.id.to_s}
  end
    
  def set_role
    @role = Role.includes([:accessrights]).where("id = #{params[:id]}").first
  end
	
  def get_role_accessright
    @roles = Role.includes(:accessrights).where("name ='School Admin' OR name = 'Teacher'")
  end

end
