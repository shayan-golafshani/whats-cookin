// let userUrl = 'http://localhost:3001/api/v1/users';
// let ingredUrl = 'http://localhost:3001/api/v1/ingredients';
// let recipeUrl = 'http://localhost:3001/api/v1/recipes'

const apiUsers = () => fetch('http://localhost:3001/api/v1/users')
  .then( response => response.json() )
  .then( data => data )
  .catch( err => console.log(err) );

const apiIngreds = () => fetch('http://localhost:3001/api/v1/ingredients')
.then( response => response.json() )
.then( data => data)
.catch( err => console.log(err) );


const apiRecipes = () => fetch('http://localhost:3001/api/v1/recipes')
.then( response => response.json() )
.then( data => data)
.catch( err => console.log(err));


const getAllData = () => Promise.all([apiUsers(), apiIngreds(), apiRecipes()]) 

export default getAllData