class Api::FridgeItemsController < ApplicationController

  def create
    @fridge_item = FridgeItem.new(fridge_item_params)
  end

  def index
    @fridge_items = current_user.fridge_items
  end

  private
  def fridge_item_params
    params.require(:fridge_item).permit(:user_id, :ingredient_id)
  end


end
