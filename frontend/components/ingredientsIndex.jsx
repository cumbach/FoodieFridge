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
  shuffle: function(o){
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
  },
  render: function() {
    return(
      <ul>
        {this.shuffle(this.state.ingredients).map(function(ingredient){
          return <IngredientIndexItem
                  key={ingredient.id}
                  ingredient={ingredient}/>;
              })}
      </ul>
    );
  }
});
module.exports = IngredientsIndex;
