var React = require('react');
var IngredientStore = require('../stores/ingredientStore');
var ApiUtil = require('../util/apiUtil');
var IngredientsIndex = require('./ingredientsIndex');
var RecipeActions = require('../actions/recipeActions');

var RecipeSearch = React.createClass({
  getInitialState: function() {
    return {inputVal: '', recipeSearchList: [], searchRecipesClasses: "search-recipes hidden-group" };
  },
  handleChange: function(e) {
    this.setState({ inputVal: e.target.value });
  },
  clearSearch: function() {
    this.setState({inputVal: ""});
  },
  searchOnEnter: function(e) {
    if (e) {
      if (e.key === "Enter") {
        ApiUtil.createRecipeSearch(this.state.inputVal);
        this.state.recipeSearchList.push(this.state.inputVal);
        this.clearSearch();
      }
    }
  },
  recipesPress: function() {
    this.setState({searchRecipesClasses: "search-recipes"})
    this.ingredients = $('.btn');
    this.ingredients.css("display", "none");
    RecipeActions.resetAllRecipes();


  },
  ingredientsPress: function() {
    ApiUtil.fetchAllFridgeItems();
    this.setState({searchRecipesClasses: "search-recipes hidden-group"})
    this.ingredients.css("display", "inline-block");
  },
  render: function() {
    return (
      <div>
        <div className="search-button-group">
          <button onClick={this.ingredientsPress}>Search by Ingredients</button>
          <button onClick={this.recipesPress}>Search by Recipes</button>
        </div>

        <div className={this.state.searchRecipesClasses}>
          <input type="text"
            className="form-control recipe-search-bar"
            onChange={this.handleChange}
            onKeyPress={this.searchOnEnter}
            placeholder="Search for Specific Recipes"
            value={this.state.inputVal}/>

        </div>
      </div>
    );
  }
});


module.exports = RecipeSearch;
