import { ingredientsData } from "../data/ingredients";

class RecipeRepository {
  constructor(data) {
    this.recipes = data;
  }

  filterByTags(mealTags) { 
    let filteredRecipes = [];
    this.recipes.forEach((recipe) => {
      recipe.tags.filter((tag) => {
        if (mealTags.includes(tag)) {
          filteredRecipes.push(recipe);
        }
      })
    });
    return filteredRecipes;
  }

  filterByName(name) {
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