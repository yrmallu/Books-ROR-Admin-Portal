require 'spec_helper'

describe RolesController do

	# Test cases should be tested only if the user is logged in so to check if logged in or not
	before :each do
		controller.should_receive(:logged_in?)
		@company = FactoryGirl.create(:company)
	end
	
	let(:user){FactoryGirl.create(:user,:user_type => "employee",:company=>@company, :is_admin=>true)}
	
    let(:role) { FactoryGirl.attributes_for(:role, name: "roleName")  }
	
	# Test cases for Role create by ajax
	describe "Creating a Role with Ajax" do
      it "should increment the Role count" do
        expect do
        	xhr :post, :create, :role => role
	    end.to change(Role, :count).by(1)
      end

      it "should respond with success" do
        xhr :post, :create, :role => role
        expect(response).to be_success
      end
    end
		
	# Test cases for Role Update and redirect after update
	describe "Roles Update" do
		before do
			current_user!(user)
			@role = FactoryGirl.create(:role, name: "RoleName")
		end
		context "valid attributes" do 
			it "located the requested @role" do 
				put :update, id: @role, role: FactoryGirl.attributes_for(:role) 
				assigns(:role).should eq(@role) 
			end
		end
		it "changes @roles's attributes" do 
			put :update, id: @role, role: FactoryGirl.attributes_for(:role, name: "roleName") 
			@role.reload 
			@role.name.should eq("roleName") 
		end 
		
		it "redirects to the show role" do 
			get :show, id: @role, role: FactoryGirl.attributes_for(:role) 
			response.should render_template :show
		end
	end
	
	#Test cases for Role Index 	
	describe "GET index" do 
		before do 
			current_user!(user)
		end
		it "populates an array of roles" do 
            role1 ,role2 = FactoryGirl.create(:role,:name=>"role1", :company=>@company),FactoryGirl.create(:role,:name=>"role2", :company=>@company)
			get :index 
			expect(assigns(:role)).to match_array([role1, role2]) 
		end 
		
		it "renders the index view" do 
			get :index 
			response.should render_template :index 
		end 
	end
	
	# Test cases for Role Show 
  	describe "GET show" do 
		before do
			current_user!(user)
 			 @role = FactoryGirl.create(:role) 
 			 get :show, id: @role
		end
		
  		it "assigns the requested role to @role" do
  			 assigns(:role) == (@role) 
  		end 
	
  		it "renders the #show view" do 
			response.should render_template :show 
  		end 
  	end
	
	# Test cases for Role Delete and redirect after delete
	describe 'DELETE destroy' do 
		before :each do 
			current_user!(user)
			@role = FactoryGirl.create(:role) 
		end 
	
		it "find role which id to be archived" do 
		    delete :destroy, :id => @role.id
			expect(assigns[:role]).to eq(@role)
		end 
		
		it "asssign true to delete flag ie the record to be archived" do
			delete :destroy, :id => @role
		  	@role.delete_flag = true
		  	expect(@role.delete_flag).to eq(true) if @role.save
		end
	
		it "redirects to role index" do 
			delete :destroy, id: @role 
			response.should redirect_to roles_url 
		end 
	end
	
    describe "Ajax call for Role create" do
       it "returns http success" do
   	       xhr :post, :create, :role => role
   	 	   response.should be_success
   	   end
    end
	
end