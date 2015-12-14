# Phase 2: Flux Architecture and Note CRUD (2 days)

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* IngredientsIndex
* FridgeIndex
  - FridgeIndexItems

### Stores
* Ingredient
* Fridge

### ApiUtil
* ApiUtil.fetchAllIngredients -> triggers IngredientActions

* ApiUtil.fetchAllFridgeItems -> triggers FridgeItemActions
* ApiUtil.createFridgeItem -> triggers FridgeItemActions
* ApiUtil.destroyFridgeItem -> triggers FridgeItemActions

### Actions
* IngredientActions.receiveAllIngredients -> triggered by ApiUtil
* IngredientActions.createIngredient
* IngredientActions.destroyIngredient

* FridgeActions.receiveAllFridgeItems -> triggered by ApiUtil
* FridgeActions.createFridgeItem -> triggered by ApiUtil
* FridgeActions.destroyFridgeItem -> triggered by ApiUtil

## Gems/Libraries
* Flux Dispatcher (npm)
* Twitter Bootstrap
