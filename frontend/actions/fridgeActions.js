var Dispatcher = require('../dispatcher/dispatcher.js');
var FridgeConstants = require('../constants/fridgeConstants.js');

var FridgeActions = {
  receiveAllFridgeItems: function (fridgeItems) {
    Dispatcher.dispatch({
      actionType: FridgeConstants.FRIDGE_ITEMS_RECEIVED,
      fridgeItems: fridgeItems
    });
  }
};

module.exports = FridgeActions;
