var React = require('react');
var IngredientsIndex = require('./ingredientsIndex');
var FridgeIndex = require('./fridgeIndex');
var RecipesIndex = require('./recipesIndex');

var App = React.createClass({
  render: function() {
    return (
      <div className="foodiefridge-app">
        <div className="fridge_items-index-pane">
          Your Fridge:
          <FridgeIndex/>
        </div>
        <div className="ingredients-index-pane">
          Ingredients:
          <IngredientsIndex/>
        </div>
        <div className="recipes_items-index-pane">
          Recipes:
          <RecipesIndex/>
        </div>
      </div>
    );
  }
});

module.exports = App;
