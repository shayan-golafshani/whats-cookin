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
const mainPage = document.getElementById('recipes') //<<<<<<<<<< not used yet either
const favoriteArticle = document.getElementById('favoriteArticle')
// const recipesToCookPage = document.getElementById('recipesToCookPage')
// const recipesToCook = document.getElementById('recipesToCook')
const recipesToCookArticle = document.getElementById('recipesToCookArticle')
//Global Variable
let allData = []
let user1;
//Event Listeners
window.addEventListener('load', function() {
  getAllData()
    .then(response => allData = response)
    .then( () => {
      console.log('allData: ', allData)
      user1 = new User(allData[0].usersData[0], allData[2].recipeData)
      // console.log('userdata: ', allData[0])
      renderRecipeCards(allData[2].recipeData, recipeCards)
    })
    // .then(createUser)
    .catch( err => console.log(err))
})

navbar.addEventListener('click', () => navbarDelegator(event))

mainElement.addEventListener('click', function(event) {
  eventDelegator(event)
})

tagBox.addEventListener('click', function(event) {
  console.log('TAGBOX CLICKED');
  evaluateCheckBoxes(event)
})

closeButton.addEventListener('click', function() {
  modalBox.classList.remove('show')
})

//Event Handlers
function navbarDelegator(event){
  renderFavoritesPage(event)
  renderRecipePage(event)
  renderRecipesToCookPage(event)
}

function eventDelegator(event) {
  renderModalBox(event)
  closeModalBox(event)
  renderInstructions(event)
  favoriteRecipe(event)
  unfavoriteButton(event)
  addToCookbook(event)
}

function renderRecipeCards(grub, htmlElement) {
  htmlElement.innerHTML = ""
  const recipes = grub.map((recipe) => {
    return new Recipe(recipe)
  })
  recipes.forEach((recipe) => {
    htmlElement.innerHTML += `
      <div class="recipe-card" id="${recipe.id}">
        <img class="recipe-card-img" id="recipeCardImg" src="${recipe.image}">
        <p class="recipe-card-price" id="recipeCardPrice">$${recipe.getIngredCost(allData[1].ingredientsData)}</p>
        <p class="recipe-card-name" id="recipeCardName">${recipe.name}</p>
        <button id="viewRecipe">View Recipe</button>
        <button id="favoriteButton">Favorite Recipe</button>
        <button id="unfavoriteButton">Unfavorite Recipe</button>
        <button id="recipesToCook">Add to Cookbook</button>
      </div>
    `
  })
}

function renderModalBox(event) {
  if (event.target.id === "viewRecipe") {
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
  renderRecipeCards(recipeRepo1.filterByName(nameSearchBox.value), recipeCards);
}

ingredSearchButton.addEventListener('click', ingredSearch);

function ingredSearch() {
  let recipeRepo1 = new RecipeRepository (allData[2].recipeData);
  renderRecipeCards(recipeRepo1.filterRecipeByIngredients(ingredSearchBox.value, allData[1].ingredientsData), recipeCards);
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
  renderRecipeCards(filteredRecipes, recipeCards)
}

function favoriteRecipe(event) {
  const favoritedArray = [] //<<<<NOT USED?
  if(event.target.id === 'favoriteButton'){  
    allData[2].recipeData.forEach(recipe => {
      if(event.path[1].id == recipe.id){      
        user1.addFromFavorites(recipe)
      }
    })
  }
  return user1
}

function unfavoriteButton(event) {
  if(event.target.id === 'unfavoriteButton'){  
    allData[2].recipeData.forEach(recipe => {
      if(event.path[1].id == recipe.id){      
        user1.removeFromFavorites(recipe)
      }
    })
  }
  renderRecipeCards(user1.favoriteRecipes , favoriteArticle)
  // console.log(user1)
}

function addToCookbook(event) {
  if(event.target.id === 'recipesToCook'){  
    allData[2].recipeData.forEach(recipe => {
      if(event.path[1].id == recipe.id){      
        user1.addToRecipesToCook(recipe)
      }
    })
  }
  // return user1
}

function renderRecipesToCookPage(event) {
  if(event.target.id === 'recipesToCook'){
    recipeCards.classList.add('hidden')
    favoritePage.classList.add('hidden')
    recipesToCookArticle.classList.remove('hidden')
    // user1 = user1.addToCookbook(event)
    renderRecipeCards(user1.recipesToCook , recipesToCookArticle)
    
  }
}

function renderFavoritesPage(event) {
  if(event.target.id === 'favorites'){
    recipeCards.classList.add('hidden')
    recipesToCookArticle.classList.add('hidden')
    favoritePage.classList.remove('hidden')
    user1 = favoriteRecipe(event)
    renderRecipeCards(user1.favoriteRecipes , favoriteArticle)
  }
}

function renderRecipePage(event) {
  if(event.target.id === 'recipes'){
    favoritePage.classList.add('hidden')
    recipesToCookArticle.classList.add('hidden')
    recipeCards.classList.remove('hidden')
    renderRecipeCards(allData[2].recipeData, recipeCards)
  }
}