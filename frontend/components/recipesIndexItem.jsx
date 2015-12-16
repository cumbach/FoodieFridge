var React = require('react');
var ApiUtil = require('../util/apiUtil');

var RecipesIndexItem = React.createClass({
  mapKeyFieldsName: function() {
    var name = this.props.recipeitem['recipeName'];
    return name;
  },
  mapKeyFieldsImg: function() {
    var img = this.props.recipeitem['smallImageUrls'];
    return img;
  },

  render: function() {
    return (
      <div className="recipes-index-item">
        <div className='recipe-index-item-name'>{this.mapKeyFieldsName()}</div>
        <img src={this.mapKeyFieldsImg()}/>
      </div>
    );
  }
});

module.exports = RecipesIndexItem;
