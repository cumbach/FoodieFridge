class Api::IngredientsController < ApplicationController

  def index
    if params[:query] == "fridge"
      @ingredients = current_user.fridge_ingredients
    elsif params[:query] == "primary"
      @ingredients = current_user.primary_ingredients
    else
      @ingredients = Ingredient.all - current_user.fridge_ingredients - current_user.primary_ingredients
    end
  end

end
