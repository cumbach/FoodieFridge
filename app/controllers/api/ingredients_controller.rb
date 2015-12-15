class Api::IngredientsController < ApplicationController

  def index
    if params[:query] == "fridge"
      @ingredients = current_user.fridge_ingredients
    else
      @ingredients = Ingredient.all - current_user.fridge_ingredients
    end
  end

end
