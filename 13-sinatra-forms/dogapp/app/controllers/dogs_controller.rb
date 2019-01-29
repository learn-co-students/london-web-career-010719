class DogsController < ApplicationController

  # index - see all the dogs
  get "/dogs" do 
    @dogs = Dog.all
    erb :"dogs/index"
  end

  # new - show the form for creating a new dog
  get "/dogs/new" do
    erb :"dogs/new"
  end

  # show - see one particular dog
  get "/dogs/:id" do
    @dog = Dog.find(params[:id])
    erb :"dogs/show"
  end

  # create - perfrom the database insert operation
  post "/dogs" do
    dog = Dog.create(params[:dog])
    redirect "/dogs/#{dog.id}"
  end

  # edit - show the form to edit a *particular* dog
  get "/dogs/:id/edit" do
    @dog = Dog.find(params[:id])
    erb :"dogs/edit"
  end

  # update - perform the database update operation
  patch "/dogs/:id" do
    dog = Dog.find(params[:id])
    dog.update(params[:dog])
    redirect "/dogs/#{dog.id}"
  end

  # destroy - perform the database delet operation
  delete "/dogs/:id" do 
    Dog.find(params[:id]).destroy
    redirect "/dogs"
  end
end
