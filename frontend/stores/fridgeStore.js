var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher.js');
var FridgeConstants = require('../constants/fridgeConstants.js');
var FridgeStore = new Store(Dispatcher);

var _fridgeItems = {};

var resetFridgeItems = function (fridgeItems) {
  _fridgeItems = {};
  fridgeItems.forEach(function (fridgeItem) {
    _fridgeItems[fridgeItem.id] = fridgeItem;
  });
};

// var resetPokemon = function (pokemon) {
//   _pokemons[pokemon.id] = pokemon;
// };

FridgeStore.all = function () {
  var fridgeItems = [];
  for (var id in _fridgeItems) {
    fridgeItems.push(_fridgeItems[id]);
  }
  return fridgeItems;
};

// PokemonStore.find = function (id) {
//   return _pokemons[id];
// }

FridgeStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case FridgeConstants.FRIDGE_ITEMS_RECEIVED:
      resetFridgeItems(payload.fridgeItems);
      break;
    // case PokemonConstants.POKEMON_RECEIVED:
    //   resetPokemon(payload.pokemon);
    //   break;
  }

  FridgeStore.__emitChange();
};

module.exports = FridgeStore;
