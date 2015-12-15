var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher.js');
var IngredientConstants = require('../constants/ingredientConstants.js');
var IngredientStore = new Store(Dispatcher);

var _ingredients = {};

var resetIngredients = function (ingredients) {
  _ingredients = {};
  ingredients.forEach(function (ingredient) {
    _ingredients[ingredient.id] = ingredient;
  });
};

// var resetPokemon = function (pokemon) {
//   _pokemons[pokemon.id] = pokemon;
// };

IngredientStore.all = function () {
  var ingredients = [];
  for (var id in _ingredients) {
    ingredients.push(_ingredients[id]);
  }
  return ingredients;
};

// PokemonStore.find = function (id) {
//   return _pokemons[id];
// }

IngredientStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case IngredientConstants.INGREDIENTS_RECEIVED:
      resetIngredients(payload.ingredients);
      break;
    // case PokemonConstants.POKEMON_RECEIVED:
    //   resetPokemon(payload.pokemon);
    //   break;
  }

  IngredientStore.__emitChange();
};

module.exports = IngredientStore;
