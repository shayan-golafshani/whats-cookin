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

  filterRecipeByIngredients(input, data) {  
    let userInput = input.toLowerCase();
    let matchingRecipes = [];
    data.forEach(datum => {
      this.recipes.forEach(recipe => { 
        recipe.ingredients.forEach(ingredient => {
          if (datum.id === ingredient.id  && datum.name.includes(userInput)
          && !matchingRecipes.includes(recipe)) {
              matchingRecipes.push(recipe)
          }
        });
      });
    });
    return matchingRecipes;
  }


}
    
export default RecipeRepository;