import './styles.css';
import apiCalls from './apiCalls';
// Query Selectors
const viewRecipe = document.getElementById('viewRecipe')
const closeButton = document.getElementById('close')
const modalBox = document.getElementById('modalBox')
// Recipe Card Selectors
const recipeCardImg = document.getElementById('recipeCardImg')
const recipeCardPrice = document.getElementById('recipeCardPrice')
const recipeCardName = document.getElementById('recipeCardName')
// const topNav = document.getElementById('') // query selector for responsive nav bar

//Event Listeners
viewRecipe.addEventListener('click', () => {
  modalBox.classList.add('show')
})

closeButton.addEventListener('click', () => {
  modalBox.classList.remove('show')
})
//test this commit
//test this commit

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