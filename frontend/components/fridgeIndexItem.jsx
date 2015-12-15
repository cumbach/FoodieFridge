var React = require('react');

var FridgeIndexItem = React.createClass({
  render: function() {
    return (
      <div id="fridge-index-item">

        {this.props.fridgeitem.user_id + " " + this.props.fridgeitem.ingredient_id}

      </div>
    );
  }
});

module.exports = FridgeIndexItem;
