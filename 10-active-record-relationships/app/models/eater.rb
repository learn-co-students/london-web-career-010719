class Eater < ActiveRecord::Base
  has_many :pizzas

  def all_toppings
    self.pizzas.map {|pizza| pizza.toppings}.flatten.uniq
  end
end
