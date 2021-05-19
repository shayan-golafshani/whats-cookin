import './styles.css';
import apiCalls from './apiCalls';
// Query Selectors
const viewRecipe = document.getElementById('viewRecipe')
const closeButton = document.getElementById('close')
const modalBox = document.getElementById('modalBox')

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