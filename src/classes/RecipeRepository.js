class RecipeRepository {
  constructor(data) {
    this.recipes = data;

    // One class to get you started!
  }

  filterByTags = (tags) => {
    ['breakfast' , 'waffles']
    //make sure to pass in an array of tags in.
     //let something;
    let isIncluded = false;
     //I'm starting with the recipes passed into the recipe
     //repository as an array of objects. Each object which represents
     //a recipe with an id, an image, and array of ingredients, array
     //of instructions, name (string),  tags(array) that describe the type,
    let filteredRecipes =  this.recipes.filter((recipe) => {
          tags.forEach((tag) => {
            recipe.tags.includes(tag) ? isIncluded = true : console.log('false');
          })
          return isIncluded ? true : false;
          //recipe.tags.includes(tags)
        })

    console.log(filteredRecipes);    
    // This method will return any recipe objects in an array
    //that match one or more of the tags being passed into 
    //the method

     return filteredRecipes;
  };

  filterByNameOrIngs()
}

export default RecipeRepository;
