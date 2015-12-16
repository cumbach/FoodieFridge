var React = require('react');
var IngredientStore = require('../stores/ingredientStore');

var FridgeIndexItem = React.createClass({
  removeFromFridge: function() {
    console.log('he');
  },
  render: function() {
    return (
      <div id="fridge-index-item" onClick={this.removeFromFridge}>
        {this.props.fridgeitem.name}
      </div>
    );
  }
});

module.exports = FridgeIndexItem;
