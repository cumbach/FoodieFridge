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
    this.toggleRecipesIndex();
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
    this.toggleRecipesIndex();
    var ingredient = JSON.parse(e.dataTransfer.getData("Text"));
    ApiUtil.createFridgeItem(ingredient.id);
    ApiUtil.createRecipeItem(PrimaryStore.all(), ingredient.name, function(){
      this.toggleRecipesIndex();
    }.bind(this));
    IngredientActions.ingredientRemoved(ingredient);
    e.preventDefault();
  },
  bodychange: function(){
    $('body').addClass("app");
  },

  registerRecipesIndex: function(node){
    this.recipesIndex = node;
  },

  toggleRecipesIndex: function(){
    this.recipesIndex.classList.toggle("loader");
  },

  render: function() {
    this.bodychange();
    return (
      <div id="wrapper" className="foodiefridge-app">
        <div className="ingredients-index-pane">
          <IngredientsIndex toggleRecipesIndex={this.toggleRecipesIndex}/>
        </div>
        <div className="center-index-pane">
          <div className="inner-fridge-pane" onDrop={this.dropFridge} onDragOver={this.dragOverFridge}>
            <FridgeIndex toggleRecipesIndex={this.toggleRecipesIndex}/>
          </div>
          <div className="primary-index-pane" onDrop={this.dropPrimary} onDragOver={this.dragOverPrimary}>
            <PrimaryIndex/>
          </div>
        </div>
        <div className="recipes_items-index-pane">
          <h3 className="matching-recipes-label">Matching Recipes: (click for info)</h3>
          <RecipesIndex registerRecipesIndex={this.registerRecipesIndex}/>
        </div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
