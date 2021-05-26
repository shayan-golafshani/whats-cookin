# What's Cookin'? Pair Project 

The details of this project are outlined in the <a href="https://frontend.turing.io/projects/whats-cookin.html" target="\__blank">project spec</a>.


## About this project

This project is a web app that allows you and your inner chef to come to life. It is a culmination of the understanding of programming concepts that Turing Front-End students have
developed through the repetitive and daily practice of HTML, CSS, JS, DOM Interaction, TDD (Test Driven Development), as well as proficieny in the use of tools like Terminal & Github. The primary objective in creating this project, was to build a functional web site from scratch that consumes api data and utilizes object and array prototype methods to perform data manipulation! This website was the beginning of our budding relationship with APIs, application programming interfaces. It demonstrates that we know how to successfully integrate network requests in a robust & effective manner. Moreover, it's just a nice site & sight to behold when you're hungry or want to plan out some meal-prep for the week. 


## Set Up 

1. *Fork* this repository - on the top right corner of the page, click the fork button. 
2. Then clone down the forked repository ( also add any collaborators).
3. Once you have cloned the repo, change into the directory and install the project dependencies. Run `npm install` or `npm i` to install project dependencies.
4. Also make sure to fork the <a href="https://github.com/turingschool/What-s-cookin--starter-kit-API" target="\__blank">api to serve the data to our what's cooking site and follow the istructions for that repo.</a> 
5. Run `npm start` and visit `localhost:8080` in your browser.
6. Browse as you please.


## Testing 

After you ran npm install, the tooling you need to start testing is already installed (mocha and chai). You can then run `npm test` to see all the implemented tests.


## Data Model from Endpoints

This is some documentation of the endpoints and the types of data that our api serves us.

### Users
```js
{
 "name": [string],
  "id": [number],
  "pantry": [array of objects with amount and ingredient properties]
},
```

### Recipes
```js
{
  "id": [number],
  "image": [string],
  "ingredients" [array of objects with ingredients ids(connection to ingredients), ingredient names, and quantity data],
  "instructions": [array of objects with instructions properties and numbered steps],
  "name": [string],
  "tags": [array of strings representing info about the recipes]
}
```

### Ingredients
```js
{
  "estimatedCostInCents": [number],
  "id": [number -- connection to users and recipes],
  "name": [string]
}
```

### Technologies used & Skills used
- HTML
- CSS
- JavaScript
- Mocha Testing framework
- Chai assertion library
- Test driven development


## How it works

Here is a video demonstrating the use of our what's cooking web app.

[A nice demo video](https://www.youtube.com/embed/A0JdrLtT5to)

<iframe width="400" height="400" src="https://www.youtube.com/embed/A0JdrLtT5to" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


#### Roadmap for the future

In future iterations, additions to the game include:
- Add a hero image
- Tightening up styling
- Add responsive design 
- Add login functionality and local and server-side storage
- Add a pantry class to keep track of user ingredients
- Cleaner logic
- More considerations for accessibility


## Contributors
<img src="https://avatars.githubusercontent.com/u/27789047?v=4" alt="Code Wrangler"
 width="150" height="auto" style="float: left" />\
**Steven Berg**

[GitHub Profile](https://github.com/brabbuss)

FrontEnd Engineering Mod 2 programming gang$ster at Turing School who has found no end to the joy that is beating up on the language of JavaScript.

<img src="https://avatars.githubusercontent.com/u/70605985?v=4" alt="Coding Monkey"
 width="150" height="auto" style="float: left" />\
**Demaceo Vincent Howard**

[GitHub Profile](https://github.com/demaceo)

FrontEnd Engineering Mod 2 yakuza leader at Turing School, `+=` *^what steve said*.