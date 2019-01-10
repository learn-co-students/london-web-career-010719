require 'pry'

class Podium

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

  # what are the teachers names
  def teachers_names
    teachers.map {|teacher| teacher.name }
  end

  # who are the teachers that use it
  def teachers
    Teacher.all.select {|teacher| teacher.podium == self }
  end

  def teachers_exp
    teachers.map {|teacher| teacher.years_of_exp }
  end

  # what is the avg. years_of_exp for teachers that use this podium
  def avg_teacher_exp
    # years_sum = teachers_exp.inject(0) {|sum, exp_years| sum + exp_years }
    # years_sum.to_f / teachers_exp.length
    teachers_exp.inject(0) {|sum, exp_years| sum + exp_years }.to_f / teachers_exp.length
  end

  # who is the oldest teacher
  def oldest_teacher
    teachers.max_by {|teacher| teacher.age }
  end

  def youngest_teacher
    teachers.min_by {|teacher| teacher.age }
  end

end

class Teacher
  @@all = []

  attr_accessor :name, :age, :years_of_exp, :podium

  def initialize(name, age, years_of_exp, podium)
    @age = age
    @name = name
    @years_of_exp = years_of_exp
    @podium = podium
    @@all << self
  end

  def describe_my_podium
    "My podium is made out of #{@podium.material}, is #{@podium.height_in_meters} high and is made by #{@podium.brand}"
  end

  def self.all
    @@all
  end
end

p1 = Podium.new(130, 'wood', 'very good podiums inc.')
p2 = Podium.new(120, 'metal', 'flatiron wework custom®')

dan = Teacher.new('Daniel Kaczmarczyk', 27, 5, p1)
lucy = Teacher.new('Lucy Mitchell', 28, 1, p1)
nico = Teacher.new('Nicolas Marcora', 106, 80, p1)

binding.pry

p 'eof'
