var ReactDOM = require('react-dom');
var React = require('react');

var App = require('./components/app');

document.addEventListener("DOMContentLoaded", function(){
  var root = document.querySelector('#root');
  ReactDOM.render(<App/>, root);
});
