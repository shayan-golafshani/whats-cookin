import { ingredientsData } from "../data/ingredients";

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
    
  determineIngredNames() {
    let ingredientNames = [];
    this.ingredients.map((ingredient) => {
      ingredientsData.forEach((data) => {
        if (ingredient.id === data.id) {
          ingredientNames.push(data.name);
          this.ingredientCost += data.estimatedCostInCents * ingredient.quantity.amount;
        }
      });
    });
    return ingredientNames;
  }

  getIngredCost() {
    this.determineIngredNames();
    return this.ingredientCost;
  }

  displayDirections() {
    return this.instructions;
  }
}
  
export default Recipe;
  