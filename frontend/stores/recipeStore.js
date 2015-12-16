var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher.js');
var RecipeConstants = require('../constants/recipeConstants.js');
var RecipeStore = new Store(Dispatcher);

var _recipeItems = {};

// var resetRecipeItems = function (recipeItems) {
//   _recipeItems = {};
//   recipeItems.forEach(function (recipeItem) {
//     _recipeItems[recipeItem.id] = recipeItem;
//   });
// };
var addRecipeItem = function (ingredient, recipeItemArray) {
  _recipeItems[ingredient] = recipeItemArray;
};
var removeRecipeItem = function(ingredient){
  delete _recipeItems[ingredient];
};
// var removeRecipeItem = function(recipeItem) {
//   delete _recipeItems[recipeItem.id];
// };
RecipeStore.all = function () {
  var recipeItems = [];
  for (var ingredient in _recipeItems) {
    for (var i = 0; i < _recipeItems[ingredient].length; i++) {
      if (recipeItems.indexOf(_recipeItems[ingredient][i] === -1)) {
        recipeItems.push(_recipeItems[ingredient][i]);
      }
    }
  }
  return recipeItems;
};
// recipeItems.push(_recipeItems[id]);
RecipeStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    // case RecipeConstants.RECIPE_ITEMS_RECEIVED:
    //   resetRecipeItems(payload.recipeItems);
    //   RecipeStore.__emitChange();
    //   break;
    case RecipeConstants.RECIPE_ITEM_CREATED:
      addRecipeItem(payload.ingredient, payload.recipeItemArray);
      RecipeStore.__emitChange();
      break;
    case RecipeConstants.RECIPE_ITEM_REMOVED:
      removeRecipeItem(payload.ingredient);
      RecipeStore.__emitChange();
      break;
  }
};

module.exports = RecipeStore;
