import RecipeRepository from "./RecipeRepository";

class User {
  constructor(userDetails) {
    this.name = userDetails.name;
    this.id = userDetails.id;
    this.pantry = userDetails.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  addFromFavorites(recipe) {
  //is this already in the users favorites  if so, ignore it
  //otherwise push it into the array.
    if (!this.favoriteRecipes.includes(recipe)) {
      this.favoriteRecipes.push(recipe);
    } else {
      console.log('sorry bud, you already favorited that');
    }
  }

  removeFromFavorites(recipe) {
    if (this.favoriteRecipes.includes(recipe)) {
      this.favoriteRecipes.splice(this.favoriteRecipes.indexOf(recipe), 1);
    } else {
      console.log('sorry but that recipe ain\'t here no more');
    }
  }

  addToRecipesToCook(recipe) {
    if (!this.favoriteRecipes.includes(recipe)) {
      this.favoriteRecipes.push(recipe);
    } else {
      console.log('sorry bud, you already favorited that');
    }
  }

  removeFromRecipesToCook(recipe) {
    if (this.favoriteRecipes.includes(recipe)) {
      this.favoriteRecipes.splice(this.favoriteRecipes.indexOf(recipe), 1);
    } else {
      console.log('sorry but that recipe ain\'t here no more');
    }
  }

  filterFavoriteRecipesByTags(mealTags) {
    let filterFavsByTag = new RecipeRepository(this.favoriteRecipes);
    return filterFavsByTag.filterByTags(mealTags);
  }

  filterFavoriteRecipesByName(name) {
    let filterFavsByName = new RecipeRepository(this.favoriteRecipes);
    return filterFavsByName.filterByName(name);    
  }

  filterFavoriteRecipesByIngreds(ingreds) {
    let filterFavsByIngreds = new RecipeRepository(this.favoriteRecipes);
    return filterFavsByIngreds.filterRecipeByIngredients(ingreds);
  }

}

export default User;