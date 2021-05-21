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
const modalBox = document.querySelector('.modal-container')
// Recipe Card Selectors
let recipeCardImg = document.getElementById('recipeCardImg')
let recipeCardPrice = document.getElementById('recipeCardPrice')
let recipeCardName = document.getElementById('recipeCardName')
let recipeCard = document.getElementById('recipeCard')
let recipeCards = document.getElementById('recipeCards')
// const topNav = document.getElementById('') // query selector for responsive nav bar

//Event Listeners
window.addEventListener('load', function() {
  renderRecipeCards()
})

recipeCards.addEventListener('click', function(event) {
  eventDelegator(event)
})

// viewRecipe.addEventListener('click', function() {
//   modalBox.classList.add('show')
// })

// closeButton.addEventListener('click', function() {
//   modalBox.classList.remove('show')
// })

//Event Handlers
function eventDelegator(event) {
  renderModalBox(event)
  closeModalBox(event)
}

function renderRecipeCards() {
  const recipeData = recipe.recipeData;
  const recipes = recipeData.map((recipe) => {
    return new Recipe(recipe)
  })
  recipes.forEach((recipe) => {
    recipeCards.innerHTML += `
      <div class="recipe-card" ="recipeCard">
        <img class="recipe-card-img" id="recipeCardImg" src="${recipe.image}">
        <p class="recipe-card-price" id="recipeCardPrice">$${recipe.getIngredCost()}</p>
        <p class="recipe-card-name" id="recipeCardName">${recipe.name}</p>
        <button id="viewRecipe">View Recipe</button>
      </div>
    `
  })
}

function renderModalBox(event) {
  if(event.target.id === "viewRecipe"){
    console.log('click recipe button')
    modalBox.classList.remove('hidden')
  }
}

function closeModalBox(event) {
  if(event.target.id === 'close'){
    console.log('clicked close button modal');
    modalBox.classList.add('hidden')
  }
}
