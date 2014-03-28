require 'spec_helper'

describe Role do
  before do
     @role = Role.create(name: "RoleName")
   end
   
   # this speciifes which object
   subject { @role }

	# it should respong to role name field
   	it { should respond_to(:name) }
	
	# Role name should not be empty if empty then test fails ie if no validations applied in model
	describe "Fields not nil validations" do
		it "is not valid with an empty role name" do
 	    	@role = FactoryGirl.build(:role, :name=>"")
 	    	expect(@role).not_to be_valid
 	 	end
	end

	# Check for presence of Role name	
   	context "when name is not present" do
        before { @role.name = " " }
        it { should_not be_valid }
   	end

	# Check if same role name is being entered which already exist
	describe "when role name is already taken" do
   		before do
        	role_with_same_name = @role.dup
        	if role_with_same_name.name == @role.name
      		 	it { should_not be_valid }
		else
			it { should be_valid }
      		end
 	   end
   end
	
end
