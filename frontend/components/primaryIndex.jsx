var React = require('react');
var PrimaryActions = require('../actions/primaryActions');
var ApiUtil = require('../util/apiUtil');
var PrimaryStore = require('../stores/primaryStore');
var Primary = require('./primary');

var PrimaryIndex = React.createClass({
  getInitialState: function() {
    return {primaries: []};
  },
  _onChange: function() {
    this.setState({primaries: PrimaryStore.all()});
  },
  componentDidMount: function() {
    this.primaryListener = PrimaryStore.addListener(this._onChange);
    ApiUtil.fetchAllPrimaries();
  },
  componentWillUnmount: function(){
    this.primaryListener.remove();
  },
  primaryMap: function(){
    var map = [];
    if (typeof this.state.primaries !== 'undefined') {
      map = this.state.primaries.map(function(primary){
        if (typeof primary !== 'undefined') {
          return <Primary
                  key={primary.id}
                  primary={primary}/>;
        }
      });
    }
    return map;
  },
  render: function() {
    return(
      <ul>
        {this.primaryMap()}
      </ul>
    );
  }
});

module.exports = PrimaryIndex;
