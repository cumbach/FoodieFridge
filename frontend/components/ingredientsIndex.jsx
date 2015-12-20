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
    // shuffles the ingredients and assigns to result
    // if (typeof this.result === 'undefined' || this.result.length === 0) {
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    // }
    //
    //
    // // goes through each ingredient and adds to result if the result array doesnt contain it
    // for (var i = 0; i < this.state.ingredients.length; i++) {
    //   if (this.result.indexOf(this.state.ingredients[i]) === -1) {
    //     this.result.push(this.state.ingredients[i]);
    //   }
    // }
    //
    //
    //
    // // goes through each result and splices if the ingredients array doesnt contain it
    // for (var i = 0; i < this.result.length; i++) {
    //   if(this.state.ingredients.indexOf(this.result[i]) === -1) {
    //     this.result.splice(i, 1);
    //   }
    // }
    // console.log(this.state.ingredients.length);
    // console.log(this.result.length);
    // return this.result;
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
  log: function(e) {
    if (e) {
      if (e.key === "Enter") {
        console.log(e);
      }
    }
  },
  render: function() {
    var matchingIngredients = <ul>no matches found</ul>;
    if (!this.matches() && this.state.inputVal.length === 0) {
      matchingIngredients = <ul>{this.mapper(this.shuffle(this.state.ingredients))}</ul>;
    }
    if (this.matches()) {
      matchingIngredients = this.mapper(this.matches());
    }
    return(
      <div onMouseEnter={this.log()}>
        <input type="text"
               className="form-control"
               onChange={this.handleChange}
               onKeyPress={this.log}
               placeholder="Search Ingredients: Click to add to fridge"

               value={this.state.inputVal}/>
        <ul className="matching-ingredients" onClick={this.clearSearch}>
          {matchingIngredients}
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
