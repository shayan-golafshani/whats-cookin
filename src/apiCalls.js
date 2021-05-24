// Your fetch requests will live here!

let userUrl = 'http://localhost:3001/api/v1/users';
let ingredUrl = 'http://localhost:3001/api/v1/ingredients';
let recipeUrl = 'http://localhost:3001/api/v1/recipes'

//GET ALL USERS
const apiUsers = () => fetch(userUrl)
  .then( response => response.json() )
  .then( data => console.log(data) )
  .catch( err => console.log(err) );

const apiIngreds = () => fetch(ingredUrl)
.then( response => response.json() )
.then( data => console.log(data) )
.catch( err => console.log(err) );


const apiRecipes = () => fetch(recipeUrl)
.then( response => response.json() )
.then( data => console.log(data))
.catch( err => console.log(err));


const getAllData () => { Promise.all([apiUsers(), apiIngreds(), apiRecipes()]) }

export default { apiUsers, apiIngreds, apiRecipes, getAllData}