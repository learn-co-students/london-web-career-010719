class Walk < ActiveRecord::Base
  belongs_to :person
  belongs_to :dog
end
