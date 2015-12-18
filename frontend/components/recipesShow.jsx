var React = require('react');
var ReactRouter = require('react-router');
var ApiUtil = require('../util/apiUtil');
var IngredientActions = require('../actions/ingredientActions');
var RecipeStore = require('../stores/recipeStore');
var App = require('./app');
var Link = ReactRouter.Link;

var RecipesShow = React.createClass({
  getInitialState: function() {
    return {recipeItem: RecipeStore.singleItem()};
  },
  ingredientMap: function() {
    var map = [];
    if (typeof this.state.recipeItem !== 'undefined') {
      map = this.state.recipeItem.ingredientLines.map(function(ingredient) {
        return <ul key={ingredient}>{ingredient + ' '}</ul>;
      });
    }
    return map;
  },
  _onChange: function() {
    this.setState({recipeItem: RecipeStore.singleItem()});
  },
  componentWillMount: function() {
    this.singleRecipeListener = RecipeStore.addListener(this._onChange);
    ApiUtil.createSingleRecipe(this.props.location.state.recipeitem.id);
  },
  componentWillUnmount: function() {
    this.singleRecipeListener.remove();
  },
  render: function() {
    var recipeItem = {};
    var key = {};
    if (typeof this.state.recipeItem.id === 'undefined') {
      return (<div></div>)
    } else {
      recipeItem = this.state.recipeItem;
      key = Object.keys(this.state.recipeItem.images[0].imageUrlsBySize);
    }
    return (
      <div id="wrapper" className="show-nav">
        <div className="col-md-8 col-md-offset-2 recipe-show-pane">

          <div className="recipe-show recipe-header">
            <h2>{recipeItem.name}</h2>
            <h5>Recipe from: {recipeItem.source.sourceDisplayName}</h5>
            <h4>Total Prep Time: {recipeItem.cookTime}</h4> <br/>
          </div>

          <div className="recipe-show recipe-body">
            <div className="recipe-show ingredient-pane">
              <h3>Ingredients:</h3>
              <h4>{this.ingredientMap()}</h4>
            </div>

            <div className="recipe-show recipe-photo">
              <img src={recipeItem.images[0].imageUrlsBySize[key[key.length - 1]]}/>
            </div>

          </div>

          <h6 className="footer">
            <a href={'http://www.yummly.com/recipe/' + recipeItem.id}>{recipeItem.name} Recipe </a>
            search powered by <a href='http://www.yummly.com/recipes'><img alt='Yummly' src='http://static.yummly.com/api-logo.png'/></a>
          </h6>

          <Link to="/">Back to Recipe Search</Link>

        </div>
      </div>

    );
  }
});





html: "Recipe search powered by <a href='http://www.yummly.com/recipes'><img alt='Yummly' src='http://static.yummly.com/api-logo.png'/></a>"
logo: "http://static.yummly.com/api-logo.png"
text: "Recipe search powered by Yummly"
url: "http://www.yummly.com/recipes/"

module.exports = RecipesShow;