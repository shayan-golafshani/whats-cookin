import { ingredientsData } from "../data/ingredients";

class RecipeRepository {
  constructor(data) {
    this.recipes = data;
  }

  // filterByTags(...searchTags) {
  //   let mealTags = searchTags.map(tag => tag.toLowerCase())
  //   console.log(mealTags) 
  //   let filteredRecipes = [];
  //   this.recipes.forEach((recipe) => {
  //     recipe.tags.filter((tag) => {
  //       if (mealTags.includes(tag)) {
  //         filteredRecipes.push(recipe);
  //       }
  //     })
  //   });
  //   return filteredRecipes;
  // }

  filterByTags(...searchTags) {
    //may not need to lowercase the taggies
    let mealTags = searchTags.map(tag => tag.toLowerCase());
    return this.recipes.filter(recipe => recipe.tags.some(tag => mealTags.includes(tag)))
  }

  // retrieveRecipesByTag(...tags) {
  //   const lowerCaseTags = tags.map(tag => tag.toLowerCase());
  //   let results =  lowerCaseTags.reduce((matchingRecipes, tag) => {
  //     this.recipesData.forEach(recipe => {
  //       if (recipe.tags.includes(tag)) {
  //         matchingRecipes.push(recipe);
  //       }
  //     })
  //     return matchingRecipes
  //   }, [])
  //   return results
  // }

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