var React = require('react');

var IngredientIndexItem = React.createClass({
  render: function() {
    return (
      <div id="ingredients-index-item">
        {this.props.ingredient.name}
      </div>
    );
  }
});

module.exports = IngredientIndexItem;
