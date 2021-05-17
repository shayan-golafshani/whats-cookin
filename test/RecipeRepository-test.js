import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';

const recipe = require (`../src/data/recipes`)

describe('Recipe Repository', () => {
  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('Should hold onto all Recipe objects', () => {
      const recipeRepo = new RecipeRepository(recipeData);
      expect(recipeRepo).to.deep.equal(recipeData);
  });

  it('Should have a parameter to take in recipe data', () => {

  });

  it('Should have a method to filter a list of recipes based on tags', () => {

  });

  it('Should have a method to filter a list of recipes based on it\'s name or ingredients', () => {

  });


});