import './styles.css';
import getAllData from "../src/apiCalls";
import Recipe from "../src/classes/Recipe"
import RecipeRepository from './classes/RecipeRepository';
import User from './classes/User'
// import getAllData from apiCalls
// import loader from 'sass-loader';
// const recipe = require (`../src/data/recipes`);

// Query Selectors
// const viewRecipe = document.getElementById('viewRecipe')
const closeButton = document.getElementById('close')
const recipeCards = document.getElementById('recipeCards')
const checkedValue = document.querySelectorAll('.checkbox-values')
const tagBox = document.getElementById('filterButton')
const modalBox = document.getElementById('modalBox')
const mainElement = document.getElementById('mainElement')
const nameSearchBox = document.getElementById('nameSearchBar')
const nameSearchButton = document.getElementById('nameSearchBtn')
const ingredSearchBox = document.getElementById('ingredSearchBar')
const ingredSearchButton = document.getElementById('ingredSearchBtn')
const navbar = document.getElementById('navbar')
const favoritePage = document.getElementById('favoritePage')
const mainPage = document.getElementById('recipes')
//Global Variable
let allData = []

//Event Listeners
window.addEventListener('load', function() {
  getAllData()
    .then(response => allData = response)
    .then( () => {
      console.log('allData: ', allData)
      // console.log('userdata: ', allData[0])
      renderRecipeCards(allData[2].recipeData)
    })
    .then(createUser)
    .catch( err => console.log(err))
})

navbar.addEventListener('click', () => navbarDelegator(event))

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
function navbarDelegator(event){
  renderFavoritesPage(event)
  renderRecipePage(event)
}

function eventDelegator(event) {
  renderModalBox(event)
  closeModalBox(event)
  renderInstructions(event)
  favoriteRecipe(event)
  // renderFavoritesPage(event)
  // renderRecipePage(event)
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
        <button id="favoriteButton">Favorite Recipe</button>
      </div>
    `
  })
}

function renderModalBox(event) {
  if (event.target.id === "viewRecipe") {
    // console.log('box: ', event.path[1].id)
    modalBox.classList.toggle('hidden')
    renderInstructions(event)
    renderIngredients(event)
  }
}

function renderInstructions(event) {
  const modalInstructions = document.getElementById('modalInstructions')
  modalInstructions.innerHTML = ""
  allData[2].recipeData.forEach(recipe => {
    if (recipe.id == event.path[1].id) {
      recipe.instructions.forEach(instruction => {
        modalInstructions.innerHTML += `
        <li id="modalInstructions">
        ${instruction.number + " " + instruction.instruction}
        </li>
      `
      })
    }
  })
}

function renderIngredients(event) {
  const modalIngredients = document.getElementById('modalIngredients')
  modalIngredients.innerHTML = "";
  let ingredAmount = '';

  allData[2].recipeData.forEach(recipe => {
    if (recipe.id == event.path[1].id) {
      let recipe1 = new Recipe(recipe);
      let ingredNames = recipe1.determineIngredNames(allData[1].ingredientsData);

      for (let i = 0; i < ingredNames.length; i++ ) {
        ingredAmount = '';
        for (let j = 0; j < recipe1.ingredients.length; j++) {
          let innerForLoopString = '';
          innerForLoopString += ` ${recipe1.ingredients[i].quantity.amount} `
          innerForLoopString += ` ${recipe1.ingredients[i].quantity.unit} `  

          ingredAmount = innerForLoopString;
        }
        ingredAmount += ` ${ingredNames[i]}.`

        modalIngredients.innerHTML += `
        <li id="modalIngredients">
        ${ingredAmount}
        </li>
      `
      }
      modalIngredients.innerHTML += `
        <li id="modalIngredients">
        ${ingredAmount}
        </li>
      `
    }
  })
}

nameSearchButton.addEventListener('click', nameSearch);

function nameSearch() {
  let recipeRepo1 = new RecipeRepository (allData[2].recipeData);
  renderRecipeCards(recipeRepo1.filterByName(nameSearchBox.value));
}

ingredSearchButton.addEventListener('click', ingredSearch);

function ingredSearch() {
  let recipeRepo1 = new RecipeRepository (allData[2].recipeData);
  renderRecipeCards(recipeRepo1.filterRecipeByIngredients(ingredSearchBox.value, allData[1].ingredientsData));
}

function closeModalBox(event) {
  if (event.target.id === 'close') {
    modalBox.classList.add('hidden')
  }
}

function evaluateCheckBoxes(event) {
  event.preventDefault()
  let tags = [];
  let cookbook = new RecipeRepository(allData[2].recipeData)
  checkedValue.forEach(box => {
    if (box.checked) {
      tags.push(box.value)
    }
  })
  const filteredRecipes = cookbook.filterByTags(tags[0]);
  renderRecipeCards(filteredRecipes)
}


//need random user chosen on load. <<<<<<<
// mathrandom to choose from inside the array of users
//do i have to match recipe ID with recipe object? how to target/locate recipe object?<<<<<< 
//find ID of where favorite button was clicked. <<<<<<<< 
//take ID and match it up with allData[2] to extract recipe object
//then pass recipe object into addFromFavorites(recipe) that will add recipe to favorited array

function createUser() {
  const user1 = new User(allData[0].usersData[0], allData[2].recipeData) 
  return user1
}

function favoriteRecipe(event) {
  const user1 = createUser()
  const favoritedArray = []
  if(event.target.id === 'favoriteButton'){
    // console.log(event.path[1].id);
    allData[2].recipeData.forEach(recipe => {
      if(event.path[1].id == recipe.id){
        console.log(recipe.id);
        user1.addFromFavorites(recipe)
        // console.log('line 201: ');
        // console.log(favoritedArray)
      }
    })
    // console.log(user1.favoriteRecipes);
  }

  return user1
}

function renderFavoritesPage(event) {
  if(event.target.id === 'favorites'){
    // console.log(event)
    console.log('favorites button clicked');
    // recipeCards.innerHTML = ""
    recipeCards.classList.add('hidden')
    favoritePage.classList.remove('hidden')
    
  }
}

function renderRecipePage(event) {
  if(event.target.id === 'recipes'){
    console.log('recipe nav button clicked');
    favoritePage.classList.add('hidden')
    recipeCards.classList.remove('hidden')
    renderRecipeCards(allData[2].recipeData)
  }
}

// function toggleHidden(element) {
//   [element].classList.toggle('hidden')
// }