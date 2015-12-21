var React = require('react');
var IngredientsIndex = require('./ingredientsIndex');
var FridgeIndex = require('./fridgeIndex');
var RecipesIndex = require('./recipesIndex');

var App = React.createClass({

  dragOver: function(e) {
    e.preventDefault();
    if(e.target.className == "fridge_items-index-pane") return;
  },
  drop: function(e){
    var ingredient = e.dataTransfer.getData("object");
    // debugger;
    e.target.appendChild(document.getElementById(ingredient));
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
        <div onDrop={this.drop} onDragOver={this.dragOver} className="fridge_items-index-pane">
          <div className="inner-fridge-pane">
            <h2>Your Fridge:</h2>
            <ul>(click to remove)</ul>
            <FridgeIndex/>
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
