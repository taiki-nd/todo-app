Rails.application.routes.draw do

  root to: redirect('/todoes')

  get 'todoes', to: 'top#index'
  get 'todoes/new', to: 'top#index'
  get 'todoes/:id/edit', to: 'top#index'
  #全て'top#index'にルーティングしていく。

  namespace :api do
    namespace :v1 do
      delete '/todoes/destroy_all', to: 'todoes#destroy_all'
      #resources :todoesでは賄えないアクションなので別途記述する。
      resources :todoes, only: %i[index show create update destroy]
    end
  end

end