var React = require('react');
var IngredientStore = require('../stores/ingredientStore');

var FridgeIndexItem = React.createClass({
  render: function() {
    return (
      <div id="fridge-index-item">
        {this.props.fridgeitem.name + " " + this.props.fridgeitem.category}
      </div>
    );
  }
});

module.exports = FridgeIndexItem;
