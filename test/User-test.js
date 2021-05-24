import { expect } from 'chai';
import User from '../src/classes/User';
import honeyData from '../src/data/honey-data';
import usersDataSmall from '../src/data/dummyData/dummyUsers'
import saladPlusDip from '../src/data/salad-plus-dip-data';
import honeyDataIngreds from '../src/data/honey-data-ingreds';


const recipe = require (`../src/data/recipes`);
const salad = require('../src/data/salads-data');
const saladData = salad.saladData;
const recipeData = recipe.recipeData;


describe('User', () => {
  let user1, user2;

  beforeEach('Setup', () => {
    user1 = new User (usersDataSmall[0], recipeData);
    user2 = new User (usersDataSmall[1], recipeData);
  });

  it('Should be a function', () => {
    expect(User).to.be.a('function');
  });

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

    const someRecipe = honeyData[0];
    user1.removeFromFavorites(someRecipe);
    expect(user1.favoriteRecipes).to.deep.equal([]);

    user2.addFromFavorites(honeyData[1]);
    user2.addFromFavorites(honeyData[2]);
    user2.addFromFavorites(honeyData[3]);

    user2.removeFromFavorites(honeyData[2]);

    expect(user2.favoriteRecipes).to.deep.equal([honeyData[1], honeyData[3]]);
  });

  it('Should add a recipe that week (add to my recipesToCook)', () => {
    user1.addToRecipesToCook(honeyData[0]);
    const favoriteRecipes = [honeyData[0]];
    expect(user1.recipesToCook).to.eql(favoriteRecipes);
  });

  it('Should remove a recipe from my recipesToCook', () => {
    user1.addToRecipesToCook(honeyData[0]);
    user1.removeFromRecipesToCook(honeyData[0]);
    expect(user1.recipesToCook).to.eql([]);
  });

  it('Should have a method to filter my fave recipes based on 1 or more tags', () => {
    recipeData.forEach(recipe => {
      user1.favoriteRecipes.push(recipe);
      user2.favoriteRecipes.push(recipe);
    })
    expect(user1.filterFavoriteRecipesByTags('salad')).to.deep.equal(saladData);
    expect(user2.filterFavoriteRecipesByTags('salad', 'dip')).to.deep.equal(saladPlusDip);
  });

  it('Should have a method to filter fave recipes based on it\'s name', () => {
    recipeData.forEach(recipe => user1.favoriteRecipes.push(recipe));
    expect(user1.filterFavoriteRecipesByName('salad')).to.deep.equal(saladData);
  });

  it('Should have a method to filter the recipes by ingredients', () => {
    recipeData.forEach(recipe => user1.favoriteRecipes.push(recipe));
    expect(user1.filterFavoriteRecipesByIngreds('honey', honeyDataIngreds)).to.deep.equal(honeyData);
  });

});