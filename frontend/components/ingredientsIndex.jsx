var React = require('react');
var IngredientActions = require('../actions/ingredientActions');
var ApiUtil = require('../util/apiUtil');
var IngredientStore = require('../stores/ingredientStore');
var IngredientIndexItem = require('./ingredientIndexItem');
var FridgeStore = require('../stores/fridgeStore');
var Fuse = require('fuse.js');

var IngredientsIndex = React.createClass({
  getInitialState: function() {
    return {inputVal: "", ingredients: []};
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
  handleChange: function(e) {
    this.setState({ inputVal: e.target.value });
  },

  matches: function () {
    var ingredients = this.state.ingredients;
    var ingredientsArray = [];
    for (key in ingredients) {
      if (ingredients.hasOwnProperty(key)) {
        ingredientsArray.push(ingredients[key]);
      }
    }

    var options = {
      caseSensitive: false,
      includeScore: false,
      shouldSort: true,
      threshold: 0.1,
      keys: ['name', 'category']
    }

    var fuse = new Fuse(ingredientsArray, options)
    if (fuse.search(this.state.inputVal)[0]) {
      return fuse.search(this.state.inputVal);
    } else {
      return false;
    }
  },
  mapper: function (array) {
    var result = array.map(function(ingredient){
      return <IngredientIndexItem
              key={ingredient.id}
              ingredient={ingredient}/>;
    })
    return result;
  },
  clearSearch: function() {
    this.setState({inputVal: ""});
  },
  addOnEnter: function(e, matchingIngredients) {
    if (e) {
      if (e.key === "Enter" && this.matchingIngredients().length === 1) {
        var ingredient = this.matchingIngredients()[0].props.ingredient;
        ApiUtil.createFridgeItem(ingredient.id);
        ApiUtil.createRecipeItem(ingredient.name);
        IngredientActions.ingredientRemoved(ingredient);
        this.clearSearch();
      }
    }
  },
  matchingIngredients: function() {
    var matchingIngredients = <ul>no matches found</ul>;
    if (!this.matches() && this.state.inputVal.length === 0) {
      matchingIngredients = <ul>{this.mapper(this.shuffle(this.state.ingredients))}</ul>;
    }
    if (this.matches()) {
      matchingIngredients = this.mapper(this.matches());
    }
    return matchingIngredients;
  },
  render: function() {
    return(
      <div>
        <input type="text"
               className="form-control"
               onChange={this.handleChange}
               onKeyPress={this.addOnEnter}
               placeholder="Search Ingredients: Click to add to fridge"

               value={this.state.inputVal}/>
        <ul className="matching-ingredients" onClick={this.clearSearch}>
          {this.matchingIngredients()}
        </ul>
      </div>
    );
  }
});

// {this.matches().map(function(ingredient){
//   return <IngredientIndexItem
//           key={ingredient.id}
//           ingredient={ingredient}/>;
//       })}
module.exports = IngredientsIndex;
