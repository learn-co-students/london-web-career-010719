class OwnersController < ApplicationController

    def new
        @owner = Owner.new
    end

    def create
        owner = Owner.create(params.require(:owner).permit(:name))
        redirect_to owner_path(owner)
    end

    def show
        @owner = Owner.find(params["id"])
    end

end
