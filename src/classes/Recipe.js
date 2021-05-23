class Recipe {
  constructor(recipeDetails) {
    this.id = recipeDetails.id;
    this.image = recipeDetails.image;
    this.ingredients = recipeDetails.ingredients;
    this.instructions =  recipeDetails.instructions;
    this.name = recipeDetails.name;
    this.tags = recipeDetails.tags;
    this.ingredientCost = 0;
  }
    
  determineIngredNames(ingredientsData) {
    let ingredientNames = [];
    this.ingredients.map((ingredient) => {
      ingredientsData.forEach((data) => {
        if (ingredient.id === data.id) {
          ingredientNames.push(data.name);
          this.ingredientCost += 
          data.estimatedCostInCents * ingredient.quantity.amount;
        }
      });
    });
    return ingredientNames;
  }

  getIngredCost(ingredientsData) {
    this.determineIngredNames(ingredientsData);
    return parseFloat((this.ingredientCost / 100).toFixed(2))
  }

  displayDirections() {
    return this.instructions;
  }
}
  
export default Recipe;
  