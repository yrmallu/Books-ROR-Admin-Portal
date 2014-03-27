require 'spec_helper'

describe AccessrightsController do
  before do
    controller.should_receive(:logged_in?)
  end
  describe "GET #new" do
    it "loads all the roles in to @roles" do
      role1, role2 = FactoryGirl.create(:role,:name=>"SE"), FactoryGirl.create(:role,:name=>"PM")
      get :new
      expect(assigns[:roles]).to match_array([role1,role2])
    end
    it "loads all access rights into @accessrights" do
      role1 = FactoryGirl.create(:accessright,:name=>"SE")
      get :new
      expect(assigns[:accessrights]).to match_array([role1])
    end
  end
  describe "GET #index" do
    before{get :index}
    it "loads all the roles related to a company in to @roles" do
      role1,role2 = FactoryGirl.create(:role,:name=>"Admin"), FactoryGirl.create(:role,:name=>"PM")
      expect(assigns[:roles]).to match_array([role2])
    end
    it "renders the index template" do
      expect(response).to render_template("index")
    end
    it "has a status code of 200" do
      expect(response.code).to eq("200")
    end
  end
  describe "POST #create" do
    let(:role){FactoryGirl.create(:role)}
    let(:accessright){FactoryGirl.create(:accessright)}
    before{post :create, :id=>role.id, :checked_list=>[accessright.id], :unchecked_list=>[accessright.id]}
    it "loads requested role into @role" do
      expect(assigns[:role]).to eq(role)
    end
    it "creates a new access right of a role" do
      role.accessrights << accessright
      role.accessrights.count.should > 0
    end
    it "redirects to the index page" do
      expect(response).to redirect_to accessrights_path
    end
  end
  describe "PUT #update" do
    let(:role){FactoryGirl.create(:role)}
    let(:accessright){FactoryGirl.create(:accessright)}
    before{put :update, :id=>role.id, :checked_list=>[accessright.id], :unchecked_list=>[accessright.id]}
    it "loads requested role into @role" do
      expect(assigns[:role]).to eq(role)
    end
    it "creates a new access right of a role" do
      role.accessrights << accessright
      role.accessrights.count.should > 0
    end
  end
end
