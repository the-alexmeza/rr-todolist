Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'todos/index'
      post 'todos/create'
      delete 'todos/:id', to: 'todos#destroy'
    end
  end

  root "todos#index"
end
