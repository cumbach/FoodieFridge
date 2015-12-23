var React = require('react');
var ApiUtil = require('../util/apiUtil');
var IngredientActions = require('../actions/ingredientActions');
var RecipeStore = require('../stores/recipeStore');
var PrimaryStore = require('../stores/primaryStore');

var IngredientIndexItem = React.createClass({
  getInitialState: function() {
    return {dragging: false};
  },
  classname: function(){
    return "ingredients-index-item btn " + this.props.ingredient.category;
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
  // onDrop={this.drop}
  // onDragDver={this.dragOver}
  moveToFridge: function(e) {
    this.props.toggleRecipesIndex();
    ApiUtil.createFridgeItem(this.props.ingredient.id);
    ApiUtil.createRecipeItem(PrimaryStore.all(), this.props.ingredient.name, function(){
      this.props.toggleRecipesIndex();
    }.bind(this));
    IngredientActions.ingredientRemoved(this.props.ingredient);
  },
  dragStart: function(e) {
    e.dataTransfer.effectAllowed = 'move';
    this.setState({dragging: true});
    this.dragged = e.currentTarget;
    this.originX = e.pageX;
    this.originY = e.pageY;
    // debugger;
    // this.dragged.classList.toggle("dragging");
    // debugger;
    e.dataTransfer.setData("Text", e.target.id);
  },
  drag: function(e) {
    this.deltaX = e.pageX - this.originX;
    this.deltaY = e.pageY - this.originY;

    this.dragged.style.display = "none";
    this.dragged.style.cursor = "-webkit-grabbing";
    console.log(this.dragged.style.cursor);
  },
  dragEnd: function(e) {
    this.setState({dragging: false});
    this.deltaX = undefined;
    this.deltaY = undefined;
    console.log("drag end");

    this.dragged.style.display = "inline-block";
  },
  render: function() {
    var category = this.props.ingredient.category;
    var styles;
    if (this.state.dragging) {
      styles = {
        position: 'absolute',
        color: 'green',
        cursor: '-webkit-grabbing'

      };
    }
    return (
      <button className={this.classname()}
           onClick={this.moveToFridge}
           draggable="true"
           onDragStart={this.dragStart}
           onDragEnd={this.dragEnd}
           onDrag={this.drag}
           id={JSON.stringify(this.props.ingredient)}>

        <ul className="ingredient-name">{this.props.ingredient.name}</ul>
        <ul className="ingredient-category">{this.props.ingredient.category}</ul>
      </button>
    );
  }
});

module.exports = IngredientIndexItem;
