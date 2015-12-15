var React = require('react');
var apiUtil = require('../util/apiUtil');

var IngredientIndexItem = React.createClass({
  moveToFridge: function() {
    console.log(this.props.ingredient.id);
    apiUtil.createFridgeItem(this.props.ingredient.id);
  },
  render: function() {
    return (
      <div id="ingredients-index-item" onClick={this.moveToFridge}>
        {this.props.ingredient.name}
      </div>
    );
  }
});

module.exports = IngredientIndexItem;
