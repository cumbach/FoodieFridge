class Api::FridgeItemsController < ApplicationController

  def create
    # debugger
    @fridge_item = FridgeItem.new(user_id: current_user.id, ingredient_id: params[:ingredient_id],)
    if @fridge_item.save!
      render partial: "api/ingredients/ingredient", locals: {ingredient: @fridge_item.ingredient}
    else
      flash.now[:errors] = @fridge_item.errors.full_messages
    end
  end

  def index
    @fridge_items = current_user.fridge_items
  end

  # private
  # def fridge_item_params
  #   params.require(:fridge_item).permit(:user_id, :ingredient_id)
  # end


end
