import RecipeRepository from "./RecipeRepository";

class User extends RecipeRepository {
  constructor(userDetails, data) {
    super(data);
    this.name = userDetails.name;
    this.id = userDetails.id;
    this.pantry = userDetails.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  addFromFavorites(recipe) { 
    (!this.favoriteRecipes.includes(recipe)) ? 
      this.favoriteRecipes.push(recipe) :
      console.log('sorry bud, you already favorited that');
  }

  removeFromFavorites(recipe) {
    this.favoriteRecipes.includes(recipe) ?
      this.favoriteRecipes.splice(this.favoriteRecipes.indexOf(recipe), 1) :
      console.log('sorry but that recipe ain\'t here no more');
  }

  addToRecipesToCook(recipe) {
    (!this.recipesToCook.includes(recipe)) ? this.recipesToCook.push(recipe) :
      console.log('sorry bud, you already favorited that');
  }

  removeFromRecipesToCook(recipe) {
    this.recipesToCook.includes(recipe) ?
      this.recipesToCook.splice(this.recipesToCook.indexOf(recipe), 1) :
      console.log('sorry but that recipe ain\'t here no more');
  }

  filterFavoriteRecipesByTags(...mealTags) {
    let faveByTags = new RecipeRepository (this.favoriteRecipes);
    return faveByTags.filterByTags(...mealTags);
  }

  filterFavoriteRecipesByName(name) {
    let faveByName = new RecipeRepository (this.favoriteRecipes);
    return faveByName.filterByName(name);
  }

  filterFavoriteRecipesByIngreds(ingreds, data) {
    let faveByIngreds = new RecipeRepository (this.favoriteRecipes);
    return faveByIngreds.filterRecipeByIngredients(ingreds, data);
  }
}

export default User;