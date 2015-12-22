var React = require('react');
var IngredientActions = require('../actions/fridgeActions');
var ApiUtil = require('../util/apiUtil');
var FridgeStore = require('../stores/fridgeStore');
var FridgeIndexItem = require('./fridgeIndexItem');
var PrimaryStore = require('../stores/primaryStore');
var RecipeActions = require('../actions/recipeActions');

var FridgeIndex = React.createClass({
  getInitialState: function() {
    return {fridgeItems: []};
  },

  _onChange: function() {
    this.setState({fridgeItems: FridgeStore.all()});

    // NO NEW REQUEST MADE WHEN FRIDGEITEMS ALL TAKEN OUT
    if (FridgeStore.all().length === 0) {
      if (PrimaryStore.all().length !== 0) {
        RecipeActions.fetchAllRecipes([0]);
      }
    }
  },

  componentDidMount: function() {
    ApiUtil.fetchAllFridgeItems();
    this.fridgeListener = FridgeStore.addListener(this._onChange);
  },

  componentWillUnmount: function(){
    this.fridgeListener.remove();
  },
  ingredientMap: function(){
    var map = [];
    if (typeof this.state.fridgeItems !== 'undefined') {
      map = this.state.fridgeItems.map(function(fridgeItem){
        if (typeof fridgeItem !== 'undefined') {
          return <FridgeIndexItem
                  key={fridgeItem.id}
                  fridgeitem={fridgeItem}/>;
        }
      });
    }
    return map;
  },
  render: function() {
    return(
      <ul>
        {this.ingredientMap()}
      </ul>
    );
  }
});

module.exports = FridgeIndex;
