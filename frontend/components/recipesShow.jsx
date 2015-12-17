var React = require('react');
var ApiUtil = require('../util/apiUtil');
var IngredientActions = require('../actions/ingredientActions');
var RecipeStore = require('../stores/recipeStore');

var RecipesShow = React.createClass({
  getInitialState: function() {
    return {recipeItem: this.props.location.state.recipeitem};
  },
  render: function() {
    console.log(this.state.recipeItem);
    return (
      <div id="wrapper" class="show-nav">
        <div className="recipe-show-pane">
          <li>Hello in Show</li>
        </div>
      </div>
    );
  }
});

module.exports = RecipesShow;
