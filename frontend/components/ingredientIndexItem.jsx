var React = require('react');
var apiUtil = require('../util/apiUtil');
var IngredientActions = require('../actions/ingredientActions');

var IngredientIndexItem = React.createClass({
  moveToFridge: function() {
    apiUtil.createFridgeItem(this.props.ingredient.id);
    IngredientActions.ingredientRemoved(this.props.ingredient);
  },
  render: function() {
    return (
      <div className="ingredients-index-item" onClick={this.moveToFridge}>
        {this.props.ingredient.name}
      </div>
    );
  }
});

module.exports = IngredientIndexItem;
