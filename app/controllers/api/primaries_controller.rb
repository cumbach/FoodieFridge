class Api::PrimariesController < ApplicationController

  def create
    @primary = Primary.new(user_id: current_user.id, ingredient_id: params[:ingredient_id])
    if @primary.save!
      render partial: "api/primaries/primary", locals: {primary: @primary.ingredient}
    else
      flash.now[:errors] = @primary.errors.full_messages
    end
  end

  def destroy
    @primary = Primary.find_by(user_id: current_user.id, ingredient_id: params[:ingredient_id])
    @primary.delete
    render partial: "api/primaries/primary", locals: {ingredient: @primary.ingredient}
  end

  def index
    @primarys = current_user.primaries
  end

end
