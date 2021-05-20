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

  it('Should be a ')

  

});