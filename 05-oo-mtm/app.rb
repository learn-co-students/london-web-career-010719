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

  def lectures
    Lecture.all.select {|lecture| lecture.podium == self}
  end

  # who are the teachers that use it
  def teachers
    lectures.map {|lecture| lecture.teacher }.uniq
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

  attr_accessor :name, :age, :years_of_exp

  def initialize(name, age, years_of_exp)
    @age = age
    @name = name
    @years_of_exp = years_of_exp

    @@all << self
  end

  def lectures
    Lecture.all.select {|lecture| lecture.teacher == self}
  end

  def all_topics
    lectures.map {|lecture| lecture.topic }
  end

  def give_a_lecture(podium, time)
    Lecture.new(podium, self, time)
  end

  def podiums
    lectures.map {|lecture| lecture.podium }.uniq
  end

  def total_lecture_time
    total_time = 0
    lectures.each do |lecture|
      total_time += lecture.time
    end
    total_time
  end

  def describe_my_podium(podium)
    "My podium is made out of #{podium.material}, is #{podium.height_in_meters} high and is made by #{podium.brand}"
  end

  def self.all
    @@all
  end
end

class Lecture

  @@all = []

  attr_reader :topic, :podium, :teacher, :time

  def initialize(podium, teacher, time, topic)
    @podium = podium
    @teacher = teacher
    @time = time
    @topic = topic
    @@all << self
  end

  def self.all_topics
    self.all.map {|lecture| lecture.topic }
  end

  def self.longest_topic
    all_topics.max_by {|topic| topic.length }
  end

  def self.with_the_longest_topic
    Lecture.all.find {|lecture| lecture.topic == self.longest_topic}
  end

  def self.all
    @@all
  end

end

p1 = Podium.new(130, 'wood', 'very good podiums inc.')
p2 = Podium.new(120, 'metal', 'flatiron wework custom®')

dan = Teacher.new('Daniel Kaczmarczyk', 27, 5)
lucy = Teacher.new('Lucy Mitchell', 28, 1)
nico = Teacher.new('Nicolas Marcora', 106, 80)

l1 = Lecture.new(p1, dan, 60, "Advanced React")
l2 = Lecture.new(p2, dan, 55, "Sorting Algorithms")
l3 = Lecture.new(p1, nico, 80, "Drawing Chickens")
l4 = Lecture.new(p1, nico, 130, "Javascript 48h marathon that never really ends and time is relative.")

binding.pry

p 'eof'
