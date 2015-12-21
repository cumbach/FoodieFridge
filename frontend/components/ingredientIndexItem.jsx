var React = require('react');
var ApiUtil = require('../util/apiUtil');
var IngredientActions = require('../actions/ingredientActions');
var RecipeStore = require('../stores/recipeStore');

var IngredientIndexItem = React.createClass({
  moveToFridge: function() {
    ApiUtil.createFridgeItem(this.props.ingredient.id);
    ApiUtil.createRecipeItem(this.props.ingredient.name);
    IngredientActions.ingredientRemoved(this.props.ingredient);
  },


  // dragEnd: function(e) {
  //   console.log("ended")
  //   this.moveToFridge();
  // },
  dragStart: function(e) {
    // debugger;
    e.dataTransfer.effectAllowed = 'move';
    // debugger;
    e.dataTransfer.setData("object", this.props.ingredient.name);
  },
  // dragOver: function(e) {
  //   e.preventDefault();
  //   if(e.target.className == "outer-div") return;
  // },
  // drop: function(e){
  //   var ingredient = e.dataTransfer.getData("Text");
  //   e.target.appendChild(document.getElementById(ingredient));
  //   e.preventDefault();
  // },

  render: function() {
    var category = this.props.ingredient.category;
    return (
      <div className="outer-div">
        <div id="box_1" onDrop={this.drop} onDragDver={this.dragOver}>
          <div className="ingredients-index-item btn"
               draggable="true"
               onDragStart={this.dragStart}
               onDragEnd={this.dragEnd}
               id={this.props.ingredient.name}
               onClick={this.moveToFridge}>
            <ul className="ingredient-name">{this.props.ingredient.name}</ul>
            <ul className="ingredient-category">{this.props.ingredient.category}</ul>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = IngredientIndexItem;
