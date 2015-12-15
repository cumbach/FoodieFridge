class CreateFridgeItems < ActiveRecord::Migration
  def change
    create_table :fridge_items do |t|
      t.references :user, index: true
      t.references :ingredient, index: true
      
      t.timestamps null: false
    end
  end
end
