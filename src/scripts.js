// import RecipeRepository from '../src/classes/RecipeRepository';
// import { ingredientsData } from "../data/ingredients";
import Recipe from '../src/classes/Recipe';
import './styles.css';
// import apiCalls from './apiCalls';
// import loader from 'sass-loader';
const recipe = require (`../src/data/recipes`);

// Query Selectors
const viewRecipe = document.getElementById('viewRecipe')
const closeButton = document.getElementById('close')
const modalBox = document.getElementById('modalBox')
// Recipe Card Selectors
let recipeCardImg = document.getElementById('recipeCardImg')
let recipeCardPrice = document.getElementById('recipeCardPrice')
let recipeCardName = document.getElementById('recipeCardName')
let recipeCard = document.getElementById('recipeCard')
// const topNav = document.getElementById('') // query selector for responsive nav bar

//Event Listeners
viewRecipe.addEventListener('click', () => {
  // modalBox.classList.add('show')
  renderRecipeCards()
})

closeButton.addEventListener('click', () => {
  modalBox.classList.remove('show')
})

// window.onload = renderRecipeCards()

// window.onload = () => {
//   renderRecipeCards();
// };
// window.onload('load', renderRecipeCards)
//we need to return an array of recipes that contain the ingrediant taht the user inputed
//filter through the recipes and return which contain that ingrediant
//first we gotta match up the IDs of the recipe.ingredient.id === ingredients.id

/*
- a user should be able to view a list of all recipes
- function to publish all recipes to the main page
- needs to iterate through recipe array of objects and add Image, total cost of Ingredients 
and name to recipe card
- 
*/

const renderRecipeCards = () => {
  // const renderCardArray = [];COMPLETE PRICE METHOD AND STORE IN VARIABLE FOR LATER USE
  const recipeData = recipe.recipeData;
  // const = recipeData.forEach
  const recipes = recipeData.map((recipe) => {
    return new Recipe(recipe)
  })
  
  recipes.forEach((recipe) => {
    recipeCard.innerHTML = `
    <div class="recipe-card">
    <img class="recipe-card-img" id="recipeCardImg" src="${recipe.image}">
    <p class="recipe-card-price" id="recipeCardPrice">$${recipe.getIngredCost()}</p>
    <p class="recipe-card-name" id="recipeCardName">${recipe.name}</p>
    <button id="viewRecipe">View Recipe</button>
  </div>
  `
  })
  }
  // const data = ingredientsData
  // const cookBook = new RecipeRepository(recipeData)
  // cookBook.recipes.forEach((recipe) => {
  //   renderCardArray.push(recipe)
  // console.log(renderCardArray)
  // })
// renderRecipeCards()