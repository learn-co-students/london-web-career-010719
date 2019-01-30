class Dog < ActiveRecord::Base
  has_many :toys
  has_many :walks
  has_many :people, through: :walks
end
