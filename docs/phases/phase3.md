# Phase 3: Notebooks and Tags (2 days)

## Rails
### Models

### Controllers
* Api::NotebooksController (create, destroy, index, show, update)

### Views

## Flux
### Views (React Components)
* FridgeIndex
  - FridgeIndexItems

### Stores
* Fridge

### ApiUtil
* ApiUtil.fetchAllFridgeItems -> triggers FridgeItemActions
* ApiUtil.createFridgeItem -> triggers FridgeItemActions
* ApiUtil.destroyFridgeItem -> triggers FridgeItemActions

### Actions
* FridgeActions.receiveAllFridgeItems -> triggered by ApiUtil
* FridgeActions.createFridgeItem -> triggered by ApiUtil
* FridgeActions.destroyFridgeItem -> triggered by ApiUtil


## Gems/Libraries
