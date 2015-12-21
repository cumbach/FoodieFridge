var React = require('react');
var IngredientsIndex = require('./ingredientsIndex');
var FridgeIndex = require('./fridgeIndex');
var RecipesIndex = require('./recipesIndex');
var PrimaryIndex = require('./primaryIndex');

var ApiUtil = require('../util/apiUtil');
var IngredientActions = require('../actions/ingredientActions');


var App = React.createClass({
  dragOverPrimary: function(e) {
    e.preventDefault();
    if(e.target.className == "primary-index-pane") return;
  },
  dropPrimary: function(e){
    var ingredient = JSON.parse(e.dataTransfer.getData("Text"));
    console.log('create primary')
    ApiUtil.createPrimary(ingredient.id);
    // ApiUtil.createRecipeItem(ingredient.name);
    IngredientActions.ingredientRemoved(ingredient);
    e.preventDefault();
  },
  dragOverFridge: function(e) {
    e.preventDefault();
    if(e.target.className == "fridge_items-index-pane") return;
  },
  dropFridge: function(e){
    var ingredient = JSON.parse(e.dataTransfer.getData("Text"));
    ApiUtil.createFridgeItem(ingredient.id);
    ApiUtil.createRecipeItem(ingredient.name);
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
        <div onDrop={this.dropFridge} onDragOver={this.dragOverFridge} className="fridge_items-index-pane">
          <div className="inner-fridge-pane">
            <h2>Your Fridge:</h2>
            <ul>(click to remove)</ul>
            <FridgeIndex/>
          </div>
        </div>
        <div className="primary-index-pane" onDrop={this.dropPrimary} onDragOver={this.dragOverPrimary}>
          <h2>Primaries</h2>
          <PrimaryIndex/>
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
