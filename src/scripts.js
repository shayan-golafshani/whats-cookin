import './styles.css';
import getAllData from "../src/apiCalls";
import Recipe from "../src/classes/Recipe"
// import getAllData from apiCalls
// import loader from 'sass-loader';
// const recipe = require (`../src/data/recipes`);

// Query Selectors
const closeButton = document.getElementById('close')
// let recipeCardImg = document.getElementById('recipeCardImg')
// let recipeCardPrice = document.getElementById('recipeCardPrice')
// let recipeCardName = document.getElementById('recipeCardName')
// let recipeCard = document.getElementById('recipeCard')
let recipeCards = document.getElementById('recipeCards')
let checkedValue = document.querySelectorAll('.checkbox-values')
let tagBox = document.getElementById('filterButton')

//Global Variable
let allData = []

//Event Listeners
window.addEventListener('load', function() {
  getAllData()
    .then(response => allData = response)
    .then( () => {
      console.log(allData)
      renderRecipeCards()
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

viewRecipe.addEventListener('click', function() {
  modalBox.classList.add('show')
})

closeButton.addEventListener('click', function() {
  modalBox.classList.remove('show')
})

//Event Handlers
function eventDelegator(event) {
  renderModalBox(event)
  closeModalBox(event)
}

function renderRecipeCards() {
  console.log('>>>>>: ', allData[2])
  const recipes = allData[2].recipeData.map((recipe) => {
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

function evaluateCheckBoxes(event) {
  let cookbook = getAllData()
  console.log(cookbook)
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