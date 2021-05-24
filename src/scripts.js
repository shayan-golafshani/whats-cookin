import RecipeRepository from '../src/classes/RecipeRepository';
// import { ingredientsData } from "../data/ingredients";
import Recipe from '../src/classes/Recipe';
import './styles.css';
// import apiCalls from './apiCalls';
// import loader from 'sass-loader';
const recipe = require (`../src/data/recipes`);

// Query Selectors
// const viewRecipe = document.getElementById('viewRecipe')
const closeButton = document.getElementById('close')

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


// recipeCards.addEventListener('click', renderModalBox)


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
      <div class="recipe-card" id="recipeCard">
        <img class="recipe-card-img" id="recipeCardImg" src="${recipe.image}">
        <p class="recipe-card-price" id="recipeCardPrice">$${recipe.getIngredCost()}</p>
        <p class="recipe-card-name" id="recipeCardName">${recipe.name}</p>
        <button id="viewRecipe">View Recipe</button>
      </div>
    `
  })
}

//  = docu/ment.querySelector('.modal-container')
//  const modalBox = document.getElementById("modalBox").hidden = true;
// document.getElementById("awesome").hidden = false;
function renderModalBox(event) {
  if(event.target.id === "viewRecipe"){
    modalBox.classList.remove('hidden')
    console.log(modalBox);
    console.log('click recipe button')
  }
}

function closeModalBox(event) {
  if(event.target.id === 'close'){
    console.log('clicked close button modal');
    modalBox.classList.add('hidden')
  }
}
/* 
takes input values and put in bracket notation to be searched through filter by tage method?
*/

// var checkedValue = document.querySelector('.checkbox-values:checked').value;
let checkedValue = document.querySelectorAll('.checkbox-values')
// checkedValue.addEventListener('click'
let tagBox = document.getElementById('filterButton')

tagBox.addEventListener('click', function(event) {
  console.log('TAGBOX CLICKED');
  evaluateCheckBoxes(event)
})

function evaluateCheckBoxes(event) {
  let cookBook = new RecipeRepository()
  event.preventDefault()
  console.log(checkedValue) //<< ONLY LOG THAT LOGGED
  let tags = [];
  checkedValue.forEach(box => {
    console.log('box: ', box)
    console.log(box.checked)
    console.log('<<<test');
    if(box.checked){
      tags.push(box.value)
      console.log(tags)
    }
  })
  recipefilterByName(tags)
}