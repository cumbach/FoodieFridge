var IngredientActions = require('../actions/ingredientActions');

module.exports = {
  fetchAllIngredients: function () {
    $.ajax({
      url: "api/ingredients",
      success: function (ingredients) {
        IngredientActions.receiveAllIngredients(ingredients);
      }
    });
  }
};
