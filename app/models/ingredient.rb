class Ingredient < ActiveRecord::Base

  has_many :fridge_items
end
