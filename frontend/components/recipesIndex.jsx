var React = require('react');
var RecipeStore = require('../stores/recipeStore');
var RecipesIndexItem = require('./recipesIndexItem');
var FridgeStore = require('../stores/fridgeStore');

var RecipesIndex = React.createClass({
  getInitialState: function() {
    return {recipeItems: []};
  },

  _onChange: function() {
    this.setState({recipeItems: RecipeStore.all()});
  },

  componentDidMount: function() {
    this.recipeListener = RecipeStore.addListener(this._onChange);
  },

  componentWillUnmount: function() {
    this.recipeListener.remove();
  },
  recipeSort: function() {
    var results = {};
    var fridgeItems = FridgeStore.all();
    fridgeItems = fridgeItems.map(function(item) {
      return item.name;
    });
    this.state.recipeItems.forEach(function(recipe) {
      var count = 0;
      for (var i = 0; i < recipe.ingredients.length; i++) {
        for (var j = 0; j < fridgeItems.length; j++) {
          if (fridgeItems.indexOf(recipe.ingredients[i]) === -1) {
            count += 1;
          }
        }
      }
      if (typeof results[count] === 'undefined') {
        results[count] = [];
      }
      results[count].push(recipe);
    });
    var reversedResults = Object.keys(results);
    var final = [];
    reversedResults.forEach(function(key) {
      final = final.concat(results[key]);
    });
    return final;
  },
  recipeMap: function() {
    var map = [];
    if (typeof this.state.recipeItems !== 'undefined') {
      map = this.recipeSort().map(function(recipeItem) {
        if (recipeItem.imageUrlsBySize) {
          return <RecipesIndexItem
                  key={recipeItem.id}
                  recipeitem={recipeItem}/>;
        }
        return '';
      });
    }
    return map;
  },
  render: function() {
    return (
      <ul>
        <div>{this.recipeMap()}</div>
      </ul>
    );
  }
});

module.exports = RecipesIndex;
