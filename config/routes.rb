Rails.application.routes.draw do
  root 'pages#index'

  namespace :api, defaults: { format: 'json'} do
    resources :questions,  only: [:new, :index, :create]
    resources :users,      only: [:new, :index, :create]
    get '/logged_in',      to: 'sessions#is_logged_in?'
    post   '/login',       to: 'sessions#create'
    delete '/logout',      to: 'sessions#destroy'
  end

  match "*path", to: "pages#index", via: :all
end
