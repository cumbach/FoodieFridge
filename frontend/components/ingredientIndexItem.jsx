var React = require('react');
var ApiUtil = require('../util/apiUtil');
var IngredientActions = require('../actions/ingredientActions');
var RecipeStore = require('../stores/recipeStore');

var IngredientIndexItem = React.createClass({
  moveToFridge: function() {
    ApiUtil.createFridgeItem(this.props.ingredient.id);
    ApiUtil.createRecipeItem(this.props.ingredient.name);
    IngredientActions.ingredientRemoved(this.props.ingredient);
  },
  render: function() {
    var category = this.props.ingredient.category;
    return (
      <div className="ingredients-index-item btn" id={category} onClick={this.moveToFridge}>
        <ul className="ingredient-name">{this.props.ingredient.name}</ul>
        <ul className="ingredient-category">{this.props.ingredient.category}</ul>

      </div>
    );
  }
});

module.exports = IngredientIndexItem;
