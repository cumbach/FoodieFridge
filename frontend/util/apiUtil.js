var IngredientActions = require('../actions/ingredientActions');
var FridgeActions = require('../actions/fridgeActions');
var PrimaryActions = require('../actions/primaryActions');
var RecipeActions;


// var APP_ID = 'f4ac9032';
// var APP_KEY = 'ec28d82137e2708128a2f7f69400989f';

module.exports = {
  fetchAllIngredients: function() {
    $.ajax({
      url: "api/ingredients",
      success: function (ingredients) {
        IngredientActions.receiveAllIngredients(ingredients);
      }
    });
  },
  fetchAllFridgeItems: function() {
    $.ajax({
      url: "api/ingredients",
      data: {query: "fridge"},
      success: function (fridgeItems) {

        FridgeActions.receiveAllFridgeItems(fridgeItems);

        RecipeActions.fetchAllRecipes(fridgeItems);
      }
    });
  },
  fetchAllPrimaries: function() {
    $.ajax({
      url: "api/ingredients",
      data: {query: "primary"},
      success: function (primaries) {
        PrimaryActions.receiveAllPrimaries(primaries);

        // RecipeActions.fetchAllRecipes(primaries);
      }
    });
  },
  createPrimary: function(ingredient_id) {
    $.ajax({
      url: "api/primaries",
      data: {ingredient_id: ingredient_id},
      method: "POST",
      success: function (primary) {
        PrimaryActions.addedPrimary(primary);
      }
    });
  },
  destroyPrimary: function(ingredient_id) {
    $.ajax({
      url: "api/primaries/:id",
      data: {ingredient_id: ingredient_id},
      method: "DELETE",
      success: function (primary) {
        PrimaryActions.removedPrimary(primary);
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
  createRecipeItem: function(primaries, ingredient) {
    if (primaries.length !== 0) {
      var result = [];
      primaries.forEach(function(primary){
        result.push(primary.name);
      })
      primaries = result;
    }
    var search = primaries.concat(ingredient);
    var data = {allowedIngredient: search};
    // debugger;
    $.ajax({
      url: 'http://api.yummly.com/v1/api/recipes?_app_id=f4ac9032&_app_key=ec28d82137e2708128a2f7f69400989f&requirePictures=true',
      data: data,
      success: function(recipeItemArray) {
        RecipeActions.addedRecipeItem(ingredient, recipeItemArray['matches']);
      }
    });
  },
  createSingleRecipe: function(recipeId) {
    var data = {_app_id: 'f4ac9032', _app_key: 'ec28d82137e2708128a2f7f69400989f'}
    $.ajax({
      url: 'http://api.yummly.com/v1/api/recipe/' + recipeId,
      data: data,
      success: function(singleRecipeItem) {
        RecipeActions.addedSingleRecipe(singleRecipeItem);
      }
    });
  }
};

RecipeActions = require('../actions/recipeActions');
