import { ingredientsData } from "../data/ingredients";

class RecipeRepository {
  constructor(data) {
    this.recipes = data;
  }

  filterByTags(mealTags) {
    //['breakfast' , 'waffles']
    //make sure to pass in an array of tags in.
    //let something;
    //let isIncluded = false;
    //I'm starting with the recipes passed into the recipe
    //repository as an array of objects. Each object which represents
    //a recipe with an id, an image, and array of ingredients, array
    //of instructions, name (string),  tags(array of strings) that describe the type,
   
    let filteredRecipes = [];
    
    this.recipes.forEach((recipe) => {
      recipe.tags.filter((tag) => {
        if (mealTags.includes(tag)) {
          filteredRecipes.push(recipe);
        }
        //recipe.tags.includes(tag) ? isIncluded = true : console.log('false');
      })
      //return isIncluded ? true : false;
      //recipe.tags.includes(tags)
    });

    //console.log(filteredRecipes);    
    // This method will return any recipe objects in an array
    //that match one or more of the tags being passed into 
    //the method

    return filteredRecipes;
  }

  filterByName(name) {
    //Make sure to refactor these names so that they're easy to understand
    //Make sure to add more tests 
    let lowerCaseRecipeName = name.toLowerCase();
    return this.recipes.filter((recipe) => {
      let lowerCaseName = recipe.name.toLowerCase()
      return lowerCaseName.includes(lowerCaseRecipeName);
    });
  }

  filterRecipeByIngredients(userIngredient) {  
    //ingredients.forEach((ingredien))

    //we needd to return an array of the recipes 
    //that contain the ingredient that the user-inputted
    //to do that we need to filter through all the recipes
    //and return those which contain the ingredient

    //to do that we need to match up the id in the ingredients array
    // then check the ingredient.name to see if it includes() the ingredient we passed in.
    // this.recipes.filter((recipe) => {
    //   recipe.ingredients.forEach((ingredient) => {
    //       if(ingredient.id === ingredientsData.id)
    //   })
    // });

    //test the booleans on line 70

    let recipesWithMatchIngreds = [];
    this.recipes.map((recipe) => {
      ingredientsData.forEach((data) => {
        recipe.ingredients.forEach((ingredient) => {
                //console.log(ingredient);
                //console.log(data);
               if (ingredient.id === data.id && data.name.includes(userIngredient)) {
            recipesWithMatchIngreds.push(recipe);
          }
        });
        
        //ingredientNames.push(data.name);

      });
    });
  }
}


export default RecipeRepository;
