class Owner < ApplicationRecord
    has_many :cars
    has_many :brands, through: :cars
end
