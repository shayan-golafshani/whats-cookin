import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';

describe('Recipe', () => {

  let recipe1, recipePlaceholder;
  beforeEach(() => {
    recipePlaceholder = {
      "id": 595736,
      "image": 'https://some.eggie-url.com/photo1',
      "ingredients": [
        {
          "id": 20081,
          "quantity": {
            "amount": 1,
            "unit": "egg"
          }
        },
        {
          "id": 18372,
          "quantity": {
            "amount": 0.5,
            "unit": "liter"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Bring pot of water to boil",
          "number": 1
        },
        {
          "instruction": "Add egg and wait 5 minutes.",
          "number": 2
        },
        {
          "instruction": "Peel eggshell off after waiting 3 minutes for egg to cool, serve on plate",
          "number": 3
        }
      ],
      "name": 'hard-rock hard-boiled-egg',
      "tags": [
        "side dish",
        "breakfast"
      ]
    }
    recipe1 = new Recipe(recipePlaceholder);
  });

  it('Should be a function', () => { 
    expect(Recipe).to.be.a('function');
  });

  it('Should store the values of the recipe object that\'s passed in', () => {    
    expect(recipe1.id).to.equal(recipePlaceholder.id);
    expect(recipe1.image).to.equal(recipePlaceholder.image);
    expect(recipe1.ingredients).to.deep.equal(recipePlaceholder.ingredients);
    expect(recipe1.instructions).to.deep.equal(recipePlaceholder.instructions);
    expect(recipe1.name).to.equal(recipePlaceholder.name);
    expect(recipe1.tags).to.deep.equal(recipePlaceholder.tags);
  });

  it('Should determine the names of the ingredients needed', () => {
    expect(recipe1.determineIngredNames()).to.deep.equal(["wheat flour", "bicarbonate of soda"]);
  });

  it('Should get the cost of its ingredients', () => {
    expect(recipe1.getIngredCost()).to.equal(433);
  });

  it('Should return its instructions', () => {
    expect(recipe1.displayDirections()).to.deep.equal(recipePlaceholder.instructions);
  });

});