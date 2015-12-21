var React = require('react');
var IngredientsIndex = require('./ingredientsIndex');
var FridgeIndex = require('./fridgeIndex');
var RecipesIndex = require('./recipesIndex');
var PrimaryIndex = require('./primaryIndex');
var PrimaryStore = require('../stores/primaryStore');


var ApiUtil = require('../util/apiUtil');
var IngredientActions = require('../actions/ingredientActions');


var App = React.createClass({
  dragOverPrimary: function(e) {
    e.preventDefault();
    if(e.target.className == "primary-index-pane") return;
  },
  dropPrimary: function(e){
    var ingredient = JSON.parse(e.dataTransfer.getData("Text"));
    ApiUtil.createPrimary(ingredient.id);
    IngredientActions.ingredientRemoved(ingredient);

    // ApiUtil.createRecipeItem(PrimaryStore.all(), []);

    e.preventDefault();
  },
  dragOverFridge: function(e) {
    e.preventDefault();
    if(e.target.className == "inner-fridge-pane") return;
  },
  dropFridge: function(e){
    var ingredient = JSON.parse(e.dataTransfer.getData("Text"));
    ApiUtil.createFridgeItem(ingredient.id);
    ApiUtil.createRecipeItem(PrimaryStore.all(), ingredient.name);
    IngredientActions.ingredientRemoved(ingredient);
    e.preventDefault();
  },
  render: function() {
    return (
      <div id="wrapper" className="foodiefridge-app">
        <div className="ingredients-index-pane">
          <h2>Ingredients:</h2>
          <ul>(click to add to fridge)</ul>
          <IngredientsIndex/>
        </div>
        <div className="center-index-pane">
          <div className="inner-fridge-pane" onDrop={this.dropFridge} onDragOver={this.dragOverFridge}>
            <h4>Fridge:</h4>
            <FridgeIndex/>
          </div>
          <div className="primary-index-pane" onDrop={this.dropPrimary} onDragOver={this.dragOverPrimary}>
            <h4>Primary Ingredients</h4>
            <PrimaryIndex/>
          </div>
        </div>
        <div className="recipes_items-index-pane">
          <h2>Recipes:</h2>
          <ul>(click for info)</ul>
          <RecipesIndex/>
        </div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
