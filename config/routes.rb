BooksThatGrow::Application.routes.draw do
  resources :books do
    collection do
      post 'delete_book'
    end
  end

  resources :classrooms do
    collection do
      post 'delete_classroom'
	    get 'quick_edit_classroom'
      get 'download_classroom_list'
      get 'import_list'
      post 'import'
      post 'save_classroom_list'
      get 'get_class_info'
      get 'un_archive_class_list'
      get 'un_archive_class'
      get 'show_class_data'
    end
  end

  namespace :api do
    resources :books do 
      collection do
        get 'read'
        get 'table_of_content'
        get 'book_api_script'
      end
    end
    resources :resetpasswords do 
      collection do
        match 'get_student_email', via: [:get, :post]
        match 'send_reset_password_email', via: [:get, :post]
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
	    get 'quick_edit_user'
	    get 'remove_bulk_licenses'
      get 'get_all_school_licenses'
      post 'add_update_bulk_licenses' 
	    get 'get_classroom_details'
	    get 'user_search'
	    get 'undo_user'
      get 'get_user_info'
      get 'un_archive_users_list'
      get 'un_archive_user'
      get 'show_user_data'
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
	    get 'quick_edit_school'
	    get 'undo_school'
      get 'subregion_options'
      get 'un_archive_school_list'
      get 'un_archive_school'
    end
  end
  
  resources :sessions, only: [:new, :create, :destroy]
  match '/signin',  to: 'sessions#new',         via: 'get'
  match '/signout', to: 'sessions#destroy',     via: 'delete'
  match '/forgot_password', to: 'users#forgot_password',     via: 'get'
  match '/reset_password', to: 'users#reset_password',     via: 'get'
  match '/reset', to: 'users#reset',     via: 'get'
  
  
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'schools#index'
  get '*unmatched_route', :to => 'application#raise_not_found!'
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
