var React = require('react');
var IngredientsIndex = require('./ingredientsIndex');
var FridgeIndex = require('./fridgeIndex');

var App = React.createClass({
  render: function() {
    return (
      <div id="foodiefridge">
        <div className="fridge_items-index-pane">
          Your Fridge:
          <FridgeIndex/>
        </div>
        <br/>
        <br/>
        <div className="ingredients-index-pane">
          Ingredients:
          <IngredientsIndex/>
        </div>
      </div>
    );
  }
});

module.exports = App;
