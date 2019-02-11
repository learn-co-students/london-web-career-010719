class TrainsController < ApplicationController
  before_action :find_train, only: [:edit, :show, :update, :destroy]
  before_action :find_conductors, only: [:new, :edit]

  def index
    # make sure the array exists
    session[:viewed_trains] ||= []

    trains_seen = session[:viewed_trains]

    if trains_seen.length == 0
      @trains = Train.all 
    else
      @trains = Train.all.select do |train|
        !trains_seen.include? train.id
      end
    end
  end

  def show
    # make sure the array exists
    session[:viewed_trains] ||= []

    # add the id in if it's not present in the
    # viewed_trains array
    if !session[:viewed_trains].include? @train.id
      session[:viewed_trains] << @train.id
    end
  end

  def new
    @train = Train.new
  end

  def create
    train = Train.create(train_params)
    redirect_to train
  end

  def edit
  end

  def update
    @train.update(train_params)
    redirect_to @train
  end

  def destroy
    @train.destroy
    redirect_to trains_path
  end

  private

  def train_params
    params.require(:train).permit(:name, :price, :conductor_id, {passenger_ids: []})
  end

  def find_train
    @train = Train.find(params[:id])
  end

  def find_conductors
    @conductors = Conductor.all
  end
end
