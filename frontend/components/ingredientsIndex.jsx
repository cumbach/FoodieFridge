var React = require('react');
var IngredientActions = require('../actions/ingredientActions');
var ApiUtil = require('../util/apiUtil');
var IngredientStore = require('../stores/ingredientStore');
var IngredientIndexItem = require('./ingredientIndexItem');
var FridgeStore = require('../stores/fridgeStore');

var IngredientsIndex = React.createClass({
  getInitialState: function() {
    return {ingredients: []};
  },
  _onChange: function() {
    this.setState({ingredients: IngredientStore.all()});
  },
  componentDidMount: function() {
    this.ingredientListener = IngredientStore.addListener(this._onChange);
    ApiUtil.fetchAllIngredients();
  },
  componentWillUnmount: function(){
    this.ingredientListener.remove();
  },
  render: function() {
    return(
      <ul>
        {this.state.ingredients.map(function(ingredient){
          return <IngredientIndexItem
                  key={ingredient.id}
                  ingredient={ingredient}/>;
              })}
      </ul>
    );
  }
});

module.exports = IngredientsIndex;
