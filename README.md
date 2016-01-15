# FoodieFridge
[www.FoodieFridge.space][link]
[link]: http://www.foodiefridge.space/


FoodieFridge is a web application built using Ruby on Rails and React.js. It uses
intuitive HTML5 drag-n-drop functionality to allow users to build recipes based
on available ingredients. It also has an option to allow users to filter recipes
so that they include only certain ingredients.

## Features

### Signing up/in
Users can either create an account or sign in with a demo account. FoodieFridge
implements a custom authentication process using BCrypt to store the password as
a secret hash. Ingredients that have been moved to the "All My Ingredients" or
"Required Ingredients" categories are saved so that the next time a user signs in,
they can reuse ingredients that have already been moved.

### Moving Ingredients
Ingredients can be dragged and dropped into either of the two categories. Alternatively,
users can click on an ingredient to have it instantly appear in "All My Ingredients".
When using the search-bar to search for ingredients, users can press Enter to select an
ingredient if there is only a single result.

### All My Ingredients
FoodieFridge will provide up to 10 recipes for each ingredient in this category.
This category represents any and all ingredients that a user has available
to them. If "Required Ingredients" are specified, each additional ingredient added to
this category will return only recipes that contain all "Required Ingredients", as well
as that ingredient.

### Required Ingredients
This category represents which specific ingredients a user currently wishes to use.
All recipes will contain every ingredient in this category. It is possible, however,
to put so many ingredients into this category that the YummlyApi doesn't return any matches.


### Recipes
On the main page, multiple recipes are shown based on the search conducted. These recipes
are shown in the form of a rotating tile, animated using CSS, which demonstrate the photo
and name of the recipe on the front, and on hover, flips over to show all the ingredients
included in that recipe. Clicking on a recipe tile will bring the user to the recipe
show page, where more details about ingredients, quantity, and cooking time are provided,
along with a link to the original recipe with instructions (YummlyApi doesn't provide
instructions).

### Search by Recipe
In addition to dragging and dropping tiles, users can search by typing in specific
recipe names or using certain keywords (such as ingredients or diet types) to return
up to 10 matching recipes. This is a good option if the user already knows what they
want to make.

## Design Choices
In building this app, I was focused on creating a tool that people could actually use
to make their life easier. Many of the choices that I made were based on my own experiences
with trying to cook with limited ingredients, as well as conversations with others
in my position. There are many people (especially current college students and recent
grads) that 1) don't have the fridge space for many items 2) are cooking for one and
don't want to buy lots of ingredients that will spoil and 3) don't know what they should buy
to cook simple meals. I wanted to make an app that I could use myself, and that would
help with these problems.

Some design choices were inspired by Dindin.io (i.e. the use of draggable tiles).

### Technologies Used
I chose to use React.js as a front-end framework due to its speed in rendering to the DOM.
For users that sign in, I decided that saving their moved ingredients to the database
would be useful if they wished to keep their "virtual fridge" current and up to date,
and only change the ingredients that they would like to use for a specific meal. The Ruby
on Rails back-end (hosted on Heroku) interfaces with the React front-end via a JSON API.

Recipe results are gathered using [Yummly's] (http://www.yummly.com/) Web API, which
takes in certain ingredient parameters to return matching results from a database
of over a million recipes.
