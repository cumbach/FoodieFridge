class Api::FridgeItemsController < ApplicationController

  def create
    @fridge_item = FridgeItem.new(user_id: current_user.id, ingredient_id: params[:ingredient_id])
    if @fridge_item.save!
      render partial: "api/ingredients/ingredient", locals: {ingredient: @fridge_item.ingredient}
    else
      flash.now[:errors] = @fridge_item.errors.full_messages
    end
  end

  def destroy
    @fridge_item = FridgeItem.find_by(user_id: current_user.id, ingredient_id: params[:ingredient_id])
    @fridge_item.delete
    render partial: "api/ingredients/ingredient", locals: {ingredient: @fridge_item.ingredient}
  end

  def index
    @fridge_items = current_user.fridge_items
  end

end
