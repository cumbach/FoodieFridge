var React = require('react');
var apiUtil = require('../util/apiUtil');
var IngredientActions = require('../actions/ingredientActions');
var RecipeStore = require('../stores/recipeStore');

var IngredientIndexItem = React.createClass({
  moveToFridge: function() {
    apiUtil.createFridgeItem(this.props.ingredient.id);

    // Adding ingredient to fridge calls yummly with that ingredient
    apiUtil.createRecipeItem(this.props.ingredient.name);

    IngredientActions.ingredientRemoved(this.props.ingredient);
  },
  render: function() {
    return (
      <div className="ingredients-index-item btn" onClick={this.moveToFridge}>
        {this.props.ingredient.name}
      </div>
    );
  }
});

module.exports = IngredientIndexItem;
