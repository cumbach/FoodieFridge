var IngredientActions = require('../actions/ingredientActions');
var FridgeActions = require('../actions/fridgeActions');
var RecipeActions;


module.exports = window.APIUIL = {
  fetchAllIngredients: function () {
    $.ajax({
      url: "api/ingredients",
      success: function (ingredients) {
        IngredientActions.receiveAllIngredients(ingredients);
      }
    });
  },
  fetchAllFridgeItems: function () {
    $.ajax({
      url: "api/ingredients",
      data: {query: "fridge"},
      success: function (fridgeItems) {

        FridgeActions.receiveAllFridgeItems(fridgeItems);

        RecipeActions.fetchAllRecipes(fridgeItems);
      }
    });
  },
  createFridgeItem: function(ingredient_id) {
    $.ajax({
      url: "api/fridge_items",
      data: {ingredient_id: ingredient_id},
      method: "POST",
      success: function (fridgeItem) {
        FridgeActions.addedFridgeItem(fridgeItem);
      }
    });
  },
  destroyFridgeItem: function(ingredient_id) {
    $.ajax({
      url: "api/fridge_items/:id",
      data: {ingredient_id: ingredient_id},
      method: "DELETE",
      success: function (fridgeItem) {
        FridgeActions.removedFridgeItem(fridgeItem);
      }
    });
  },
  createRecipeItem: function(ingredient) {
    $.ajax({
      url: 'http://api.yummly.com/v1/api/recipes?_app_id=f4ac9032&_app_key=ec28d82137e2708128a2f7f69400989f&q=' + ingredient,
      success: function(recipeItemArray) {
        RecipeActions.addedRecipeItem(ingredient, recipeItemArray['matches']);
      }
    });
  },
};

RecipeActions = require('../actions/recipeActions');
