import { expect } from 'chai';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';
import honeyData from '../src/data/honey-data';
//import RecipeRepository from '../src/classes/RecipeRepository';

//const data = require('../src/data');

//const recipe = require (`../src/data/recipes`);
// const salad = require('../src/data/salads-data');
// const saladData = salad.saladData;
//const recipeData = recipe.recipeData;
//honeyData
//const honey = require('../src/data/honey-data');
//const honeyData = honey.honeyData;
//const Recipe = Recipe;
const users = require('../src/data/users')
const userData = users.modules.usersData;

describe('User', () => {
  let user1, user2;

  beforeEach('Setup', () => {
    user1 = new User (userData[0]);
    user2 = new User (userData[1]);
  });


  it('Should be a function', () => {
    expect(User).to.be.a('function');
  });

  /*
Allow a user to favorite or unfavorite recipes (add to / remove from the user’s favoriteRecipes)
Decide to cook a recipe that week (add to my recipesToCook)
Filter my favoriteRecipes by one or more tags.
Filter my favoriteRecipes by its name or ingredients.
  
  */
  it('Should allow a user to favorite recipes (add to the user’s favoriteRecipes array)', () => {
    //console.log('this is honey_data', honeyData[0]);
    user1.addFromFavorites(honeyData[0]);
    const favoriteRecipes = [honeyData[0]]
    expect(user1.favoriteRecipes).to.eql(favoriteRecipes);
  });

  it('Should allow a user to unfavorite recipes (remove them from the user’s favoriteRecipes)', () => {
    user1.addFromFavorites(honeyData[0]);
    const favoriteRecipes = [honeyData[0]]
    expect(user1.favoriteRecipes).to.eql(favoriteRecipes);

    const someRecipe = 
    user1.removeFromFavorites(recipe)
  });

  it('Should add a recipe that week (add to my recipesToCook)', () => {
      
  });

  it('Should blah', () => {

  });

  it('Should blah', () => {
    
  });

  it('Should blah', () => {
    
  });

  

});