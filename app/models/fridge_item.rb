class FridgeItem < ActiveRecord::Base

  def find_by_user(user_params)
    self.where('user_id = ?', user_params)
  end
  
  belongs_to :user
  belongs_to :ingredient
end
