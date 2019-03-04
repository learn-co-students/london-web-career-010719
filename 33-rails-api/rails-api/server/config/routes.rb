Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :images, only: [:index, :show]
      resources :comments, only: [:index, :create]
      post '/likes', to: 'images#increase_likes'
    end
  end
end
