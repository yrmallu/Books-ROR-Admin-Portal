require 'test_helper'

class AccessrightsControllerTest < ActionController::TestCase
  setup do
    @accessright = accessrights(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:accessrights)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create accessright" do
    assert_difference('Accessright.count') do
      post :create, accessright: { description: @accessright.description, name: @accessright.name }
    end

    assert_redirected_to accessright_path(assigns(:accessright))
  end

  test "should show accessright" do
    get :show, id: @accessright
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @accessright
    assert_response :success
  end

  test "should update accessright" do
    patch :update, id: @accessright, accessright: { description: @accessright.description, name: @accessright.name }
    assert_redirected_to accessright_path(assigns(:accessright))
  end

  test "should destroy accessright" do
    assert_difference('Accessright.count', -1) do
      delete :destroy, id: @accessright
    end

    assert_redirected_to accessrights_path
  end
end
