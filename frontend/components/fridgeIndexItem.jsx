var React = require('react');
var IngredientStore = require('../stores/ingredientStore');
var ApiUtil = require('../util/apiUtil');
var IngredientsIndex = require('./ingredientsIndex');
var RecipeActions = require('../actions/recipeActions');

var FridgeIndexItem = React.createClass({
  deleteFromFridge: function() {
    ApiUtil.destroyFridgeItem(this.props.fridgeitem.id);
    ApiUtil.fetchAllIngredients();
    RecipeActions.removedRecipeItem(this.props.fridgeitem.name);
  },
  render: function() {
    return (
      <div className='btn' id="fridge-index-item" onClick={this.deleteFromFridge}>
        {this.props.fridgeitem.name}
      </div>
    );
  }
});

module.exports = FridgeIndexItem;
