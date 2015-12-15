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
      url: "api/fridge_items",
      success: function (fridgeItems) {
        FridgeActions.receiveAllFridgeItems(fridgeItems);
      }
    });
  }
};
