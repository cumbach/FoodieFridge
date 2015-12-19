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
    if (typeof this.result === 'undefined' || this.result.length === 0) {
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      this.result = o;
      for (var i = 0; i < this.result.length; i++) {
        if (this.state.ingredients.indexOf(this.result[i]) === -1) {
          this.result.splice(i, 1);
        }
      }
    }

    return this.result;
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
