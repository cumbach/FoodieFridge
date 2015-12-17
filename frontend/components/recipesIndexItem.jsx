var React = require('react');
var ApiUtil = require('../util/apiUtil');

var RecipesIndexItem = React.createClass({
  ingredientsList: function() {
    var ingredients = [];
    this.props.recipeitem['ingredients'].forEach(function(ingredient){
      ingredients.push(<li>{ingredient}</li>);
    });
    return ingredients;
  },
  render: function() {
    return (
      <div className="recipe-tile">
        <div className='recipe-tile-inner'>

          <div className='front'>
            <div className='caption_title'>{this.props.recipeitem['recipeName']}</div>
            <img className='img-container' src={this.props.recipeitem['smallImageUrls']} width='200' height='150'/>
          </div>

          <div className='front back'>
            <div className='recipe-index-item-ingredients'>
              <h3>Ingredients:</h3>
              <ul>{this.ingredientsList()}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = RecipesIndexItem;
