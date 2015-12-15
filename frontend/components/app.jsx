var React = require('react');
var IngredientsIndex = require('./ingredientsIndex');

var App = React.createClass({
  render: function() {
    return (
      <div id="foodiefridge">
        <div className="ingredients-index-pane">
          Ingredients:
          <IngredientsIndex/>
        </div>
      </div>
    );
  }
});

module.exports = App;
