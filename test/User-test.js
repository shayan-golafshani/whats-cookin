import { expect } from 'chai';
import User from '../src/classes/User';
//import RecipeRepository from '../src/classes/RecipeRepository';

//const data = require('../src/data');

// const recipe = require (`../src/data/recipes`);
// const salad = require('../src/data/salads-data');
// const saladData = salad.saladData;
// const recipeData = recipe.recipeData;
// const honey = require('../src/data/honey-data');
// const honeyData = honey.honeyData;
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

  });

  it('Should allow a user to unfavorite recipes (remove them from the user’s favoriteRecipes)', () => {
      
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