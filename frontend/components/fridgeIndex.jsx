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
  fridgeInfo: function() {
    if (FridgeStore.all().length === 0) {
      return (<div className='info-pane-fridge full'>
                <h3 className='fridge-header'>My Fridge:</h3>
                <h4 className="fridge-info">Multiple recipes are<br/>
                    displayed for each<br/>
                    item in your fridge</h4>
                  <h4 className='sideways-hover-instructions'>
                   &#65514; Drag and Drop Ingredients For Recipes &#65516;
                </h4>
              </div>);
    }
    return "";
  },
  render: function() {
    return(
      <div className='full'>
        <div className='full'>{this.fridgeInfo()}</div>
        <div>{this.ingredientMap()}</div>
      </div>
    );
  }
});

module.exports = FridgeIndex;
