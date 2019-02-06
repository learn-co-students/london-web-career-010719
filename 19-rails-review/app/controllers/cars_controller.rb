class CarsController < ApplicationController

    before_action :find_car, only: [:show]

    def index
        @cars = Car.all
    end

    def show

    end

    def new
        @car = Car.new
    end

    def create
        car = Car.create(car_params)
        car.brand = Brand.find_or_create_by(name: params["brand_name"])
        car.save
        redirect_to car_path(car)
    end

    private

    def find_car
        @car = Car.find(params["id"])
    end

    def car_params
        params.require(:car).permit(:mechanic_id, :owner_id)
    end

end
