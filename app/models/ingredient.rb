class Ingredient < ActiveRecord::Base

  has_many :fridge_items
  has_many :primaries
end
