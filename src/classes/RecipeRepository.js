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

  filterRecipeByIngredients(userInput) {  
    let matchingRecipes = [];
    ingredientsData.forEach(data => {
      matchingRecipes = this.recipes.filter(recipe => { 
        recipe.ingredients.find(ingredient => {
          return ingredient.id === data.id && data.name.includes(userInput)
        });
      });
    });
  }
}
    
  

export default RecipeRepository;
