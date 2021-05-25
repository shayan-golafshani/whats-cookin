import './styles.css';
import getAllData from "../src/apiCalls";
import Recipe from "../src/classes/Recipe"
import RecipeRepository from './classes/RecipeRepository';
// import getAllData from apiCalls
// import loader from 'sass-loader';
// const recipe = require (`../src/data/recipes`);

// Query Selectors
const closeButton = document.getElementById('close')
let recipeCards = document.getElementById('recipeCards')
let checkedValue = document.querySelectorAll('.checkbox-values')
let tagBox = document.getElementById('filterButton')
const modalBox = document.getElementById('modalBox')
// const recipeCardContainer = document.getElementById('recipeCards')
//Global Variable
let allData = []

//Event Listeners
window.addEventListener('load', function() {
  getAllData()
    .then(response => allData = response)
    .then( () => {
      console.log('allData: ', allData)
      renderRecipeCards(allData[2].recipeData)
    })
    .catch( err => console.log(err))
})

recipeCards.addEventListener('click', function(event) {
  eventDelegator(event)
})

tagBox.addEventListener('click', function(event) {
  console.log('TAGBOX CLICKED');
  evaluateCheckBoxes(event)
})

// viewRecipe.addEventListener('click', function() {
//   modalBox.classList.add('show')
// })

closeButton.addEventListener('click', function() {
  modalBox.classList.remove('show')
})

//Event Handlers
function eventDelegator(event) {
  renderModalBox(event)
  closeModalBox(event)
}

function renderRecipeCards(grub) {
  recipeCards.innerHTML = ""
  const recipes = grub.map((recipe) => {
    return new Recipe(recipe)
  })
  recipes.forEach((recipe) => {
    recipeCards.innerHTML += `
      <div class="recipe-card" id="recipeCard">
        <img class="recipe-card-img" id="recipeCardImg" src="${recipe.image}">
        <p class="recipe-card-price" id="recipeCardPrice">$${recipe.getIngredCost(allData[1].ingredientsData)}</p>
        <p class="recipe-card-name" id="recipeCardName">${recipe.name}</p>
        <button id="viewRecipe">View Recipe</button>
      </div>
    `
  })
}

function renderModalBox(event) {
  if(event.target.id === "viewRecipe"){
    modalBox.classList.remove('hidden')
    console.log("clicked box");
  }
}

function closeModalBox(event) {
  if(event.target.id === 'close'){
    modalBox.classList.add('hidden')
  }
}

function evaluateCheckBoxes(event) {
  event.preventDefault()
  let tags = [];
  let cookbook = new RecipeRepository(allData[2].recipeData)
  checkedValue.forEach(box => {
    if(box.checked){
      tags.push(box.value)
    }
  })
  const filteredRecipes = cookbook.filterByTags(tags[0])
  renderRecipeCards(filteredRecipes)
}