class Mechanic < ApplicationRecord
    has_many :cars
    has_many :owners, through: :cars
    has_many :brands, through: :cars

    def speciality
        # names.inject(Hash.new(0)) { |total, e| total[e] += 1 ;total}
        counts = self.brands.inject(Hash.new(0)){ |total, brand| total[brand.name] += 1 ; total}
        self.brands.max_by {|brand| counts[brand.name] }
    end
end
