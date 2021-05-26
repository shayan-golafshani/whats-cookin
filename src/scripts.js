import './styles.css';
import getAllData from "../src/apiCalls";
import Recipe from "../src/classes/Recipe"
import RecipeRepository from './classes/RecipeRepository';
import User from './classes/User'

// Query Selectors
const mainPage = document.getElementById('mainPage')
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
const cookbookPage = document.getElementById('cookbookPage')

//Global Variable
let allData = []
let user1;

//Event Listeners
window.addEventListener('load', function() {
  getAllData()
    .then(response => allData = response)
    .then( () => {
      user1 = new User(allData[0].usersData[0], allData[2].recipeData)
      renderRecipeCards(allData[2].recipeData, mainPage)
    })
    .catch( err => console.log(err))
})

navbar.addEventListener('click', (event) => navbarDelegator(event))

mainElement.addEventListener('click', (event) => eventDelegator(event))

tagBox.addEventListener('click', (event) => evaluateCheckBoxes(event))

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
  console.log(event);
}

function renderRecipeCards(recipeData, htmlElement) {
  htmlElement.innerHTML = ""
  const recipes = recipeData.map((recipe) => {
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
    modalBox.classList.remove('hidden')
    renderInstructions(event)
    renderIngredients(event)
  }
}

function closeModalBox(event) {
  if (event.target.id === 'close') {
    modalBox.classList.add('hidden')
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
    }
  })
}

nameSearchButton.addEventListener('click', () => {
  if(!favoritePage.classList.contains('hidden')){
    renderRecipeCards(user1.filterFavoriteRecipesByName(nameSearchBox.value), favoritePage)
  }
  if(!mainPage.classList.contains('hidden')){
    nameSearch()
  }
});

function nameSearch() {
  let recipeRepo1 = new RecipeRepository (allData[2].recipeData);
  renderRecipeCards(recipeRepo1.filterByName(nameSearchBox.value), mainPage);
}

ingredSearchButton.addEventListener('click', () => {
  if(!favoritePage.classList.contains('hidden')){
    renderRecipeCards(user1.filterFavoriteRecipesByIngreds(ingredSearchBox.value, allData[1].ingredientsData), favoritePage)
  }
  if(!mainPage.classList.contains('hidden')){
    ingredSearch()
  }
});

function ingredSearch() {
  let recipeRepo1 = new RecipeRepository (allData[2].recipeData);
  renderRecipeCards(recipeRepo1.filterRecipeByIngredients(ingredSearchBox.value, allData[1].ingredientsData), mainPage);
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
  renderRecipeCards(filteredRecipes, mainPage)
}

function favoriteRecipe(event) {
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
  renderRecipeCards(user1.favoriteRecipes , favoritePage)
}

function addToCookbook(event) {
  if(event.target.id === 'recipesToCook'){  
    allData[2].recipeData.forEach(recipe => {
      if(event.path[1].id == recipe.id){      
        user1.addToRecipesToCook(recipe)
      }
    })
  }
}

function renderRecipesToCookPage(event) {
  if(event.target.id === 'recipesToCook'){
    navigation(mainPage, favoritePage, cookbookPage)
    renderRecipeCards(user1.recipesToCook , cookbookPage)   
  }
}

function renderFavoritesPage(event) {
  if(event.target.id === 'favorites'){
    navigation(mainPage, cookbookPage, favoritePage)
    user1 = favoriteRecipe(event)
    renderRecipeCards(user1.favoriteRecipes , favoritePage)
  }
}

function renderRecipePage(event) {
  if(event.target.id === 'recipes'){
    navigation(favoritePage, cookbookPage, mainPage)
    renderRecipeCards(allData[2].recipeData, mainPage)
  }
}

function navigation(addHidden1, addHidden2, remHidden) {
  addHidden1.classList.add('hidden');
  addHidden2.classList.add('hidden');
  remHidden.classList.remove('hidden')
}
