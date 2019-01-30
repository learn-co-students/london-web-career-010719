class DogsController < ApplicationController

  # index - see all the dogs
  get "/dogs" do 
    @dogs = Dog.all
    erb :"dogs/index"
  end

  # new - show the form for creating a new dog
  get "/dogs/new" do
    @people = Person.all
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
    @toys = Toy.all
    @people = Person.all
    erb :"dogs/edit"
  end

  # update - perform the database update operation
  patch "/dogs/:id" do
    # binding.pry
    dog = Dog.find(params[:id])

    if !params[:dog][:person_ids]
      params[:dog][:person_ids] = []
    end

    if !params[:dog][:toy_ids]
      params[:dog][:toy_ids] = []
    end

    dog.update(params[:dog])
    redirect "/dogs/#{dog.id}"
  end

  # destroy - perform the database delet operation
  delete "/dogs/:id" do 
    Dog.find(params[:id]).destroy
    redirect "/dogs"
  end
end
