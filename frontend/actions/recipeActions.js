var Dispatcher = require('../dispatcher/dispatcher.js');
var RecipeConstants = require('../constants/recipeConstants.js');

var RecipeActions = {
  // receiveAllRecipeItems: function (recipeItems) {
  //   Dispatcher.dispatch({
  //     actionType: RecipeConstants.RECIPE_ITEMS_RECEIVED,
  //     recipeItems: recipeItems
  //   });
  // },
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
