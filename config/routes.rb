BooksThatShow::Application.routes.draw do
  resources :books

  resources :classrooms do
    collection do
      post :delete_classroom
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
      post :delete_user
	    get :'dashboard'
	    get :'forgot_password'
	    get :'reset_password'
	    post :'set_new_password'
	    post :'email_for_password'
    end
  end

  resources :schools do 
    collection do
      post :delete_school
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
   root 'users#dashboard'

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
