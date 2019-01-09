require 'pry'

class Podium

  # attr_reader :material
  # attr_writer :material

  @@all = []

  attr_accessor :material, :height, :brand, :colour

  def initialize(height, material, brand)
    @height = height
    @material = material
    @brand = brand

    @@all << self
  end

  def self.all
    @@all
  end

  def is_wooden
    @material == 'wood'
  end

  def height_in_meters
    (@height.to_f / 100).to_s + ' m'
  end

end

p1 = Podium.new(130, 'wood', 'nike')
p2 = Podium.new(120, 'metal', 'flatiron wework custom®')
p3 = Podium.new(150, 'gelatine', '💩')

binding.pry

p 'eof'
