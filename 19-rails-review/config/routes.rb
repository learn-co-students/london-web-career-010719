Rails.application.routes.draw do
  resources :cars
  resources :mechanics
  resources :owners
  resources :brands
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
