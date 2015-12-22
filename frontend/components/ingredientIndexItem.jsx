var React = require('react');
var ApiUtil = require('../util/apiUtil');
var IngredientActions = require('../actions/ingredientActions');
var RecipeStore = require('../stores/recipeStore');
var PrimaryStore = require('../stores/primaryStore');

var IngredientIndexItem = React.createClass({
  // dragEnd: function(e) {
  //   console.log("ended")
  //   this.moveToFridge();
  // },
  // dragOver: function(e) {
  //   e.preventDefault();
  //   if(e.target.className == "outer-div") return;
  // },
  // drop: function(e){
  //   var ingredient = e.dataTransfer.getData("Text");
  //   e.target.appendChild(document.getElementById(ingredient));
  //   e.preventDefault();
  // },
  // onDrop={this.drop}
  // onDragDver={this.dragOver}
  moveToFridge: function() {
    this.props.toggleRecipesIndex();
    ApiUtil.createFridgeItem(this.props.ingredient.id);
    ApiUtil.createRecipeItem(PrimaryStore.all(), this.props.ingredient.name, function(){
      this.props.toggleRecipesIndex();
    }.bind(this));
    IngredientActions.ingredientRemoved(this.props.ingredient);
  },
  dragStart: function(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("Text", e.target.id);
  },
  classname: function(){
    return "ingredients-index-item btn " + this.props.ingredient.category;
  },
  render: function() {
    var category = this.props.ingredient.category;
    return (
      <div className={this.classname()}
           onClick={this.moveToFridge}
           draggable="true"
           onDragStart={this.dragStart}
           onDragEnd={this.dragEnd}
           id={JSON.stringify(this.props.ingredient)}>


        <ul className="ingredient-name">{this.props.ingredient.name}</ul>
        <ul className="ingredient-category">{this.props.ingredient.category}</ul>
      </div>
    );
  }
});

module.exports = IngredientIndexItem;
