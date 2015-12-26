var React = require('react');
var IngredientsIndex = require('./ingredientsIndex');
var FridgeIndex = require('./fridgeIndex');
var RecipesIndex = require('./recipesIndex');
var PrimaryIndex = require('./primaryIndex');
var PrimaryStore = require('../stores/primaryStore');
var FridgeStore = require('../stores/fridgeStore');
var RecipeSearch = require('./recipeSearch');

var ApiUtil = require('../util/apiUtil');
var IngredientActions = require('../actions/ingredientActions');


var App = React.createClass({
  dragOverIngredients: function(e) {
    e.preventDefault();
    if(e.target.className == "ingredients-index-pane") return;
  },
  dragStart: function(e) {
    // e.dataTransfer.effectAllowed = 'all';
    // e.dataTransfer.dropEffect = 'move';
    this.dragged = e.currentTarget;
    e.dataTransfer.setData("Text", e.target.id);
  },
  drag: function(e) {
    this.dragged.style.display = "none";
  },
  dragEnd: function(e) {
    this.dragged.style.display = "inline-block";
  },
  dropIngredients: function(e){
    var ingredient = JSON.parse(e.dataTransfer.getData("Text"));

    var primary = false;
    for (key in PrimaryStore.all()) {
      if (PrimaryStore.all()[key].id === ingredient.id) {
        primary = true;
      }
    }
    var fridge = false;
    for (key in FridgeStore.all()) {
      if (FridgeStore.all()[key].id === ingredient.id) {
        fridge = true;
      }
    }

    if (primary) {
      ApiUtil.destroyPrimary(ingredient.id);
    } else if (fridge) {
      ApiUtil.destroyFridgeItem(ingredient.id);
    }

    ApiUtil.fetchAllIngredients();
    e.preventDefault();
  },
  dragOverPrimary: function(e) {
    e.preventDefault();
    if(e.target.className == "primary-index-pane") return;
  },
  dropPrimary: function(e){
    this.toggleRecipesIndex();
    var ingredient = JSON.parse(e.dataTransfer.getData("Text"));
    ApiUtil.createPrimary(ingredient.id);

    // should do one or the other based on PrimaryStore.all()
    var fridge = false;
    for (key in FridgeStore.all()) {
      if (FridgeStore.all()[key].id === ingredient.id) {
        fridge = true;
      }
    }
    if (fridge) {
      ApiUtil.destroyFridgeItem(ingredient.id);
    } else {
      IngredientActions.ingredientRemoved(ingredient);
    }

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
      // this.toggleRecipesIndex();
    }.bind(this));

    // should do one or the other based on PrimaryStore.all()
    var primary = false;
    for (key in PrimaryStore.all()) {
      if (PrimaryStore.all()[key].id === ingredient.id) {
        primary = true;
      }
    }
    if (primary) {
      ApiUtil.destroyPrimary(ingredient.id);
    } else {
      IngredientActions.ingredientRemoved(ingredient);
    }

    e.preventDefault();
  },
  registerRecipesIndex: function(node){
    this.recipesIndex = node;
  },
  toggleRecipesIndex: function(){
    this.recipesIndex.classList.toggle("loader");
  },
  toggleDirectionsOn: function(){
    $('.sideways-hover-instructions').css("display", "inline-block");
  },
  toggleDirectionsOff: function(){
    $('.sideways-hover-instructions').css("display", "none");
  },
  render: function() {
    return (
      <div id="wrapper" className="foodiefridge-app">
        <div className="ingredients-index-pane"
             onMouseEnter={this.toggleDirectionsOn}
             onMouseLeave={this.toggleDirectionsOff}
             onDrop={this.dropIngredients}
             onDragOver={this.dragOverIngredients}>
           <IngredientsIndex dragStart={this.dragStart}
                             dragEnd={this.dragEnd}
                             drag={this.drag}
                             toggleRecipesIndex={this.toggleRecipesIndex}/>
        </div>

        <div className="center-index-pane">
          <div className="inner-fridge-pane"
               onDrop={this.dropFridge}
               onDragOver={this.dragOverFridge}>
            <FridgeIndex toggleRecipesIndex={this.toggleRecipesIndex}/>
          </div>
          <div className="primary-index-pane"
               onDrop={this.dropPrimary}
               onDragOver={this.dragOverPrimary}>
            <PrimaryIndex/>
          </div>
        </div>

        <div className="right-side-pane">
          <div className="recipe-search-pane">
            <RecipeSearch/>
          </div>
          <div className="recipes_items-index-pane">
            <RecipesIndex registerRecipesIndex={this.registerRecipesIndex}/>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
});

// {<h3 className="matching-recipes-label">Matching Recipes: (click for info)</h3>}
module.exports = App;
