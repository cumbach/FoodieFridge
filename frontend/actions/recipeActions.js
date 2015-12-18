var Dispatcher = require('../dispatcher/dispatcher.js');
var RecipeConstants = require('../constants/recipeConstants.js');
var ApiUtil = require('../util/apiUtil');


var RecipeActions = {
  addedSingleRecipe: function(singleRecipeItem) {
    Dispatcher.dispatch({
      actionType: RecipeConstants.SINGLE_RECIPE_ITEM_CREATED,
      singleRecipeItem: singleRecipeItem
    });
  },
  fetchAllRecipes: function (fridgeItems) {
    fridgeItems.forEach(function(fridgeItem){
      ApiUtil.createRecipeItem(fridgeItem['name']);
    });
  },
  addedRecipeItem: function (ingredient, recipeItemArray) {
    Dispatcher.dispatch({
      actionType: RecipeConstants.RECIPE_ITEM_CREATED,
      ingredient: ingredient,
      recipeItemArray: recipeItemArray
    });
  },
  removedRecipeItem: function (ingredient) {
    Dispatcher.dispatch({
      actionType: RecipeConstants.RECIPE_ITEM_REMOVED,
      ingredient: ingredient
    });
  },
};

module.exports = RecipeActions;
