import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';

const recipe = require (`../src/data/recipes`);
const salad = require('../src/data/salads-data');
const saladData = salad.saladData;
const recipeData = recipe.recipeData;
const honey = require('../src/data/honey-data');
const honeyData = honey.honeyData;

describe('Recipe Repository', () => {

  let recipeRepo1, recipeRepo2;

  beforeEach(() => {
    recipeRepo1 = new RecipeRepository (saladData);
    recipeRepo2 = new RecipeRepository (honeyData);
  });


  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('Should hold onto all Recipe objects', () => {
    const recipeRepo = new RecipeRepository(recipeData);
    expect(recipeRepo.recipes).to.deep.equal(recipeData);
  });

  it('Should have a parameter to take in recipe data', () => {
    const recipeRepo = new RecipeRepository('meh');
    expect(recipeRepo.recipes).to.equal('meh');
  });

  it('Should have a method to filter a list of recipes based on tags', () => {
    const recipeRepo = new RecipeRepository(recipeData);
    expect(recipeRepo.filterByTags('salad')).to.deep.equal(recipeRepo1.recipes);
  });

  it('Should have a method to filter a list of recipes based on it\'s name', () => {
    const recipeRepo = new RecipeRepository(recipeData);
    expect(recipeRepo.filterByName('salad')).to.deep.equal(recipeRepo1.recipes);
  });

  it('Should have a method to filter the recipes by ingredients', () => {
    const recipeRepo = new RecipeRepository(recipeData);
    expect(recipeRepo.filterRecipeByIngredients('honey')).to.deep.equal(recipeRepo2.recipes);
  });

});