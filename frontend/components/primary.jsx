var React = require('react');
var IngredientStore = require('../stores/ingredientStore');
var ApiUtil = require('../util/apiUtil');
var IngredientsIndex = require('./ingredientsIndex');
var RecipeActions = require('../actions/recipeActions');

var Primary = React.createClass({
  deleteFromPrimary: function() {
    ApiUtil.destroyPrimary(this.props.primary.id);
    ApiUtil.fetchAllIngredients();
    // RecipeActions.removedRecipeItem(this.props.primary.name);
  },
  classname: function () {
    return 'btn primary ' + this.props.primary.category;
  },

  render: function() {
    return (
      <div className={this.classname()} onClick={this.deleteFromPrimary}>
        {this.props.primary.name}
      </div>
    );
  }
});


module.exports = Primary;
