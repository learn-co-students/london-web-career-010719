class ToysController < ApplicationController

  # new - show the form for creating a new dog
  get "/toys/new" do
    @dogs = Dog.all
    erb :"toys/new"
  end

  # show - see one particular dog
  get "/toys/:id" do
    @toy = Toy.find(params[:id])
    erb :"toys/show"
  end

  # create - perfrom the database insert operation
  post "/toys" do
    toy = Toy.create(params[:toy])
    redirect "/toys/#{toy.id}"
  end

  # edit - show the form to edit a *particular* toy
  get "/toys/:id/edit" do
    @toy = Toy.find(params[:id])
    @dogs = Dog.all
    erb :"toys/edit"
  end

  # update - perform the database update operation
  patch "/toys/:id" do
    binding.pry
    toy = Toy.find(params[:id])
    toy.update(params[:toy])
    redirect "/toys/#{toy.id}"
  end
end
