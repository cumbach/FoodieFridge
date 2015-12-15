var IngredientActions = require('../actions/ingredientActions');
var FridgeActions = require('../actions/fridgeActions');

module.exports = {
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
      }
    });
  },
  createFridgeItem: function(ingredient_id) {
    debugger;
    $.ajax({
      url: "api/fridge_items",
      data: {params: ingredient_id},
      method: "POST",
      success: function (fridgeItem) {
        FridgeActions.addedFridgeItem(fridgeItem);
      }
    });
  }
};
