import { ingredientsData } from "../data/ingredients";

class RecipeRepository {
  constructor(data) {
    this.recipes = data;
  }

  filterByTags(...searchTags) {
    let mealTags = searchTags.map(tag => tag.toLowerCase());
    return this.recipes.filter(
      recipe => recipe.tags.some(tag => mealTags.includes(tag)))
  }

  filterByName(name) {
    return this.recipes.filter(
      recipe => recipe.name.toLowerCase().includes(name.toLowerCase()))
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