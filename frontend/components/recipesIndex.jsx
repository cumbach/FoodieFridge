var React = require('react');
var RecipeActions = require('../actions/recipeActions');
var ApiUtil = require('../util/apiUtil');
var RecipeStore = require('../stores/recipeStore');
var RecipesIndexItem = require('./recipesIndexItem');

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

  componentWillUnmount: function(){
    this.recipeListener.remove();
  },
  recipeMap: function(){
    var map = [];
    if (typeof this.state.recipeItems !== 'undefined') {
      map = this.state.recipeItems.map(function(recipeItem){
        return <RecipesIndexItem
                key={recipeItem['id']}
                recipeitem={recipeItem}/>;
      });
    }
    return map;
  },

  render: function() {
    // console.log(this.state.recipeItems);
    return(
      <ul>
        <div>{this.recipeMap()}</div>
      </ul>
    );
  }
});

module.exports = RecipesIndex;
