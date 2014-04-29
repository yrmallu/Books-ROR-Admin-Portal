BooksThatGrow::Application.routes.draw do
  resources :books

  resources :classrooms do
    collection do
      post 'delete_classroom'
    end
  end

  namespace :api do
    resources :books do 
      collection do
        get 'read'
        get 'table_of_content'
      end
    end

  end

  resources :licenses

  resources :accessrights do
    collection do
      get 'check_role_accessright'
    end  
  end
  
  resources :roles

  resources :users do 
    collection do
      post 'delete_user'
      get 'change_user_password'
      get 'dashboard'
      get 'forgot_password'
      get 'reset_password'
      post 'set_new_password'
      post 'email_for_password'
      get 'get_user_school_licenses'
      get 'email_validation'
	  get 'username_validation'
      get 'remove_license'
      get 'get_user_accessright'
      post 'update_user_accessright'
      post 'assign_license'
      get 'download_sample_list'
      get 'import_list'
      post 'import'
      post 'save_user_list'
	  get 'delete_parent'
     end
  end

  resources :schools do 
    collection do
      post 'delete_school'
      get 'get_schoolwise_license_list'
      get 'download_school_list'
      post 'import'
      get 'import_list'
      post 'save_school_list'
      get 'get_schoolwise_license_list'
      get 'check_school_name_uniqueness'
      post 'update_license_expiration_date'
    end
  end
  get '/schools/subregion_options' => 'schools#subregion_options'
  
  resources :sessions, only: [:new, :create, :destroy]
  match '/signin',  to: 'sessions#new',         via: 'get'
  match '/signout', to: 'sessions#destroy',     via: 'delete'
  match '/forgot_password', to: 'users#forgot_password',     via: 'get'
  match '/reset_password', to: 'users#reset_password',     via: 'get'
  
  
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'schools#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
