# FoodieFridge

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

FoodieFridge is a web application inspired by Dindin.io built using Ruby on Rails
and React.js. FoodieFridge allows users to:


<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Search for ingredients
- [ ] Add and remove ingredients from their virtual fridge
- [ ] View recipes that use items contained in their fridge
- [ ] Save favorite recipes

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Ingredients + FridgeItems: Model and JSON API (1.5 days)

In Phase 1, I will begin by implementing user signup and authentication (using
BCrypt). There will be a basic landing page after signup that will contain the
container for the application's root React component. Before building out the
front end, I will begin by setting up a full JSON API for Ingredients and seed
the database with some ingredient data. I will also set up a full JSON API for FridgeItems.

[Details][phase-one]

### Phase 2: Flux Architecture, Ingredients CRUD (1.5 days)

Phase 2 is focused on setting up Flux, the React Router, and the React view
structure for the main application. After the basic Flux architecture has been
set up, an Ingredient store will be implemented and a set of actions to update the store
will be created (only read, no changes to ingredients DB). Once this is done, I will create
`Index` and `IndexItem` React views for the Ingredients.

Lastly, while constructing the views I will start using basic bootstrap for styling.

[Details][phase-two]

### Phase 3:  FridgeItem CRUD(2 days)

Phase 3 adds organization to the Fridge and Ingredients.

Ingredients have many FridgeItems.
FridgeItems belongs to User and Ingredient.

Once I have my Ingredients React components working correctly, I will set up a Fridge store and FridgeItem CRUD functionality. The Fridge will have `Index` and `IndexItem` React views. FridgeItems can be created, read, edited and destroyed in the browser.

When a user clicks on an IngredientIndexItem:
-It saves that Ingredient to the FridgeItems database.
-It removes that Ingredient from the Ingredients store.

When a user clicks on a FridgeIndexItem:
-It deletes that Ingredient from the FridgeItems database.
-It adds that Ingredient back to the Ingredients store.

[Details][phase-three]

### Phase 4: Set up Yummly API (2 days)

Phase 4 sets up functionality with the Yummly API to retrieve recipes.

I will set up a Recipes store with `Index` and `IndexItem` React views.

Each time a user creates a new FridgeItem, a request will be made to the
Yummly API for recipes that contain that ingredient.

Recipe Actions will be created to add, delete, and receive recipes from the
Recipe Store. Recipes will not be stored in the database.

RecipeIndexItems will bring up a show page for the recipe when clicked on.

[Details][phase-four]

### Phase 5: Styling Cleanup and Seeding (2 days)

Bootstrap will have been used to keep things organized up until now, but in
Phase 5 I will add styling flourishes and make modals out of some elements (like
the RecipeIndexItem show page).


### Bonus Features (TBD)
- [ ] Prettify transitions
- [ ] A favorite recipes option/page
- [ ] Out of stock option for managing recipes



[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
