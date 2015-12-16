var React = require('react');
var IngredientStore = require('../stores/ingredientStore');
var ApiUtil = require('../util/apiUtil');
var IngredientsIndex = require('./ingredientsIndex');

var FridgeIndexItem = React.createClass({
  deleteFromFridge: function() {
    ApiUtil.destroyFridgeItem(this.props.fridgeitem.id);
    ApiUtil.fetchAllIngredients();
  },
  render: function() {
    return (
      <div id="fridge-index-item" onClick={this.deleteFromFridge}>
        {this.props.fridgeitem.name}
      </div>
    );
  }
});

module.exports = FridgeIndexItem;
