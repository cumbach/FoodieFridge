var React = require('react');
var PrimaryActions = require('../actions/primaryActions');
var RecipeActions = require('../actions/recipeActions');
var ApiUtil = require('../util/apiUtil');
var PrimaryStore = require('../stores/primaryStore');
var Primary = require('./primary');
var FridgeStore = require('../stores/fridgeStore');

var PrimaryIndex = React.createClass({
  getInitialState: function() {
    return {primaries: []};
  },
  _onChange: function() {
    this.setState({primaries: PrimaryStore.all()});

    // FIND RECIPES FOR PRIMARIES SOMEHOW?
    if (this.state.primaries.length !== 0 || FridgeStore.all().length !== 0) {
      var fridgeStoreHolder = FridgeStore.all().length === 0 ? [0] : FridgeStore.all();
      RecipeActions.fetchAllRecipes(fridgeStoreHolder);
    }
  },
  componentDidMount: function() {
    this.primaryListener = PrimaryStore.addListener(this._onChange);
    ApiUtil.fetchAllPrimaries();
  },
  componentWillUnmount: function(){
    this.primaryListener.remove();
  },
  primaryMap: function(){
    var map = [];
    if (typeof this.state.primaries !== 'undefined') {
      map = this.state.primaries.map(function(primary){
        if (typeof primary !== 'undefined') {
          return <Primary
                  key={primary.id}
                  primary={primary}/>;
        }
      }.bind(this));
    }
    return map;
  },
  render: function() {
    return(
      <ul>
        {this.primaryMap()}
      </ul>
    );
  }
});

module.exports = PrimaryIndex;
