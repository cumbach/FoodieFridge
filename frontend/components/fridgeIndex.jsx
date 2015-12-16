var React = require('react');
var IngredientActions = require('../actions/fridgeActions');
var ApiUtil = require('../util/apiUtil');
var FridgeStore = require('../stores/fridgeStore');
var FridgeIndexItem = require('./fridgeIndexItem');

var FridgeIndex = React.createClass({
  getInitialState: function() {
    return {fridgeItems: []};
  },

  _onChange: function() {
    this.setState({fridgeItems: FridgeStore.all()});
  },

  componentDidMount: function() {
    this.fridgeListener = FridgeStore.addListener(this._onChange);
    ApiUtil.fetchAllFridgeItems();
  },

  componentWillUnmount: function(){
    this.ingredientListener.remove();
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
