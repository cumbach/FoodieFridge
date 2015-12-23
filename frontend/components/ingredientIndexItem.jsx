var React = require('react');
var ApiUtil = require('../util/apiUtil');
var IngredientActions = require('../actions/ingredientActions');
var RecipeStore = require('../stores/recipeStore');
var PrimaryStore = require('../stores/primaryStore');

var IngredientIndexItem = React.createClass({
  getInitialState: function() {
    return {dragging: false};
  },

  dragEnd: function(e) {
    this.setState({dragging: false});
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

    e.dataTransfer.setData("Text", e.target.id);
  },
  classname: function(){
    return "ingredients-index-item btn " + this.props.ingredient.category;
  },
  drag: function(e) {
    this.deltaX = e.pageX - this.originX;
    this.deltaY = e.pageY - this.originY;
    this.dragged.style.display = "none";
  },
  render: function() {
    var category = this.props.ingredient.category;
    var styles;
    if (this.state.dragging) {
      styles = {
        position: 'absolute',
        color: 'green',
        cursor: '-webkit-grab',
        left: this.deltaX,
        top: this.deltaY
      };
    }
    return (
      <div className={this.classname()}
           onClick={this.moveToFridge}
           draggable="true"
           onDragStart={this.dragStart}
           onDragEnd={this.dragEnd}
           onDrag={this.drag}
           style={styles}
           id={JSON.stringify(this.props.ingredient)}>

        <ul className="ingredient-name">{this.props.ingredient.name}</ul>
        <ul className="ingredient-category">{this.props.ingredient.category}</ul>
      </div>
    );
  }
});

module.exports = IngredientIndexItem;
