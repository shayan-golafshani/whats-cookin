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
    // this.favoriteRecipes.this.
    //console.log(super.filterByTags(...mealTags))
    return this.favoriteRecipes.super.filterByTags(...mealTags);
  }

  filterFavoriteRecipesByName(name) {
    return this.favoriteRecipes.this.super.filterByName(name);
  }

  filterFavoriteRecipesByIngreds(ingreds, data) {
    return this.favoriteRecipes.this.super.filterRecipeByIngredients(ingreds, data)
  }
}

export default User;