import './styles.css';
import getAllData from "../src/apiCalls";
import Recipe from "../src/classes/Recipe"
import RecipeRepository from './classes/RecipeRepository';
// import getAllData from apiCalls
// import loader from 'sass-loader';
// const recipe = require (`../src/data/recipes`);

// Query Selectors
// const viewRecipe = document.getElementById('viewRecipe')
const closeButton = document.getElementById('close')
let recipeCards = document.getElementById('recipeCards')
let checkedValue = document.querySelectorAll('.checkbox-values')
let tagBox = document.getElementById('filterButton')
const modalBox = document.getElementById('modalBox')
const mainElement = document.getElementById('mainElement')
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

mainElement.addEventListener('click', function(event) {
  eventDelegator(event)
})

// viewRecipe.addEventListener('click', function() {	
//   modalBox.classList.add('show')	
// })

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
  renderInstructions(event)
}



function renderRecipeCards(grub) {
  recipeCards.innerHTML = ""
  const recipes = grub.map((recipe) => {
    return new Recipe(recipe)
  })
  recipes.forEach((recipe) => {
    recipeCards.innerHTML += `
      <div class="recipe-card" id="${recipe.id}">
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
    // console.log('box: ', event.path[1].id)
    modalBox.classList.toggle('hidden')
    renderInstructions(event)
  }
}
/*
find id of recipe card where the button lives.
once ID is ofund. match ID to recipe data allData.recipeData[2].forEach(recipe => )
within recipe data extract instructions from nested data
then print Insctuctoins to <li> inside modal
*/
function renderInstructions(event) {
  // console.log("event: ", event);
  const modalInstructions = document.getElementById('modalInstructions')
  allData[2].recipeData.forEach(recipe => {
    // console.log('recipe.id: ', recipe.id);
    // console.log('event.path[0].id: ', event.path[1].id);
    if(recipe.id == event.path[1].id){
      console.log('if statment worked');
      recipe.instructions.forEach(instruction => {
        // console.log('instructions: ', instruction);
        // console.log('jsonparse: ', JSON.parse(instruction));
      modalInstructions.innerHTML += `
      <li id="modalInstructions">
      ${instruction.instruction}
      
      </li>
    `
      })
    }
  })
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