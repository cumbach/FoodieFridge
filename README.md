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
the database with ingredient data. I will also set up a full JSON API for FridgeItems.

[Details][phase-one]

### Phase 2: Flux Architecture, Ingredients CRUD (2.5 days)

Phase 2 is focused on setting up Flux, the React Router, and the React view
structure for the main application. After the basic Flux architecture has been
set up, an Ingredient store will be implemented and a set of actions to update the store
will be created (only read, no changes to ingredients DB). Once this is done, I will create
`Index` and `IndexItem` React views for the Ingredients.

Lastly, while constructing the views I will start using basic bootstrap for
styling.

[Details][phase-two]

### Phase 3:  FridgeIndexItem CRUD, and Ingredients (2 days)

Phase 3 adds organization to the Fridge and Ingredients.

Once I have my Ingredients React components working correctly, I will set up a Fridge store and FridgeItem CRUD functionality. The Fridge will have `Index` and `IndexItem` React views. FridgeItems can be created, read, edited and destroyed in the browser.

Ingredients have many FridgeItems.
FridgeItems belongs to User and Ingredient.

When a user clicks on an IngredientIndexItem:
-It saves that Ingredient to the FridgeItems database.
-It removes that Ingredient from the Ingredients store.

When a user clicks on a FridgeIndexItem:
-It deletes that Ingredient from the FridgeItems database.
-It adds that Ingredient back to the Ingredients store.

[Details][phase-three]

### Phase 4: Set up Yummly API (1 day)

Phase 4 sets up functionality with the Yummly API to retrieve recipes.

I will set up a Recipes store with `Index` and `IndexItem` React views.

When a user creates a FridgeItem, a new request will be made to the
Yummly API for recipes that contain that ingredient. Those recipes will be
added to the Recipe store.


[Details][phase-four]

### Phase 5: Reminders and Garbage Collection (1 day)

Phase 5 introduces two new features. First, users can set reminders on notes
which will at the time they are set for prompt the user to review and edit the
given note. In addition, I will implement a feature that asks users to review
notes once they reach a certain age and ask whether they should be kept,
archived, or deleted.

[Details][phase-five]

### Phase 6: Styling Cleanup and Seeding (1 day)

Bootstrap will have been used to keep things organized up until now, but in
Phase 6 I will add styling flourishes and make modals out of some elements (like
the NotebookForm).

### Bonus Features (TBD)
- [ ] Prettify transitions
- [ ] Use javascript library for cleaner tag selection
- [ ] Changelogs for Notes
- [ ] Pagination / infinite scroll for Notes Index
- [ ] Multiple sessions

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
