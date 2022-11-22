import * as MODEL from "./model.js";

var ingredCount = 3;
var stepCount = 3;
var currentRecipe = "";

function route() {
  let hashtagLink = window.location.hash; //get page from hashtag in url
  let pageID = hashtagLink.replace("#", ""); //set page id without hashtag

  //route pages
  if (pageID == "" || pageID == "home") {
    MODEL.currentPage("home");
  } else if (pageID == "login") {
    console.log("got to login");
    MODEL.currentPage("login", initLoginListeners);
  } else if (pageID == "create-recipe") {
    MODEL.currentPage("create-recipe", addRecipe);
  } else if (pageID == "your-recipes") {
    MODEL.currentPage("your-recipes", displayUserRecipes);
  } else if (pageID == "edit-recipe") {
    MODEL.currentPage("edit-recipe", editRecipe);
  } else {
    MODEL.currentPage(pageID);
  }
}

function initLoginListeners() {
  $("#signup-submit").on("click", () => {
    signUpUser();
  });
  $("#login-submit").on("click", logInUser);

  $("#logout-submit").on("click", logOutUser);
}

function addRecipe(userName) {
  $("#name-greeting").html(`Hey ${userName}, create your recipe!`);

  $(".addIngredButton").on("click", (e) => {
    console.log("click");

    $(".ingredients-section").append(
      `<input type="text" id="ingred${ingredCount}" placeholder="Ingredient ${
        ingredCount + 1
      }" />`
    );

    ingredCount++;
  });

  $(".addStepButton").on("click", (e) => {
    console.log("click");

    $(".instructions-section").append(
      `<input type="text" id="step${stepCount}" placeholder="Step ${
        stepCount + 1
      }" />`
    );

    stepCount++;
  });
  let recipeObj = {
    image: "",
    name: "",
    desc: "",
    time: "",
    servings: "",
    steps: [],
    ingredients: [],
  };
  $("#submitBtn").on("click", (e) => {
    e.preventDefault();
    console.log("submit");

    recipeObj.image = $("#recipe-image")[0].value;
    recipeObj.name = $("#recipe-name")[0].value;
    recipeObj.desc = $("#recipe-desc")[0].value;
    recipeObj.time = $("#recipe-time")[0].value;
    recipeObj.servings = $("#recipe-servings")[0].value;

    //console.log($("#recipe-name")[0]);

    $(".instructions-section input").each((idx, step) => {
      recipeObj.steps.push(step.value);
    });

    $(".ingredients-section input").each((idx, ingredient) => {
      recipeObj.ingredients.push(ingredient.value);
    });
    MODEL.addRecipe(recipeObj);
  });
}

//whenever the larger "recipes page" gets made, each recipe needs to have the "edit" button pass over the recipeid
function editRecipe(userName) {
  $("#name-greeting").html(`Hey ${userName}, edit your recipe!`);

  $(".addIngredButton").on("click", (e) => {
    console.log("click");

    $(".ingredients-section").append(
      `<input type="text" id="ingred${ingredCount}" placeholder="Ingredient ${
        ingredCount + 1
      }" />`
    );

    ingredCount++;
  });

  $(".addStepButton").on("click", (e) => {
    console.log("click");

    $(".instructions-section").append(
      `<input type="text" id="step${stepCount}" placeholder="Step ${
        stepCount + 1
      }" />`
    );

    stepCount++;
  });

  let recipeObj = {
    image: "",
    name: "",
    desc: "",
    time: "",
    servings: "",
    steps: [],
    ingredients: [],
  };

  $("#submitBtn").on("click", (e) => {
    e.preventDefault();
    console.log("submit");

    recipeObj.image = $("#recipe-image")[0].value;
    recipeObj.name = $("#recipe-name")[0].value;
    recipeObj.desc = $("#recipe-desc")[0].value;
    recipeObj.time = $("#recipe-time")[0].value;
    recipeObj.servings = $("#recipe-servings")[0].value;

    //console.log($("#recipe-name")[0]);

    $(".instructions-section input").each((idx, step) => {
      recipeObj.steps.push(step.value);
    });

    $(".ingredients-section input").each((idx, ingredient) => {
      recipeObj.ingredients.push(ingredient.value);
    });
    MODEL.addRecipe(recipeObj);
  });
}

//whenever the larger "recipes page" gets made, each recipe needs to have the "view" button pass over the recipeid
function individualRecipe(recipeid) {
  let recipe = model.viewSingleRecipe(recipeid);
  $(".recipe-header").html(`
  <h2 id="sw-recipe-name">${recipe.name}</h2>
    <img src="${recipe.image}" alt="" />
    <div class="description">
      <h2>Description:</h2>
      <p>${recipe.description}</p>
      <h3>Total Time:</h3>
      <p>${recipe.time}</p>
      <h3>Servings:</h3>
      <p>${recipe.servings}</p>
    </div>
  `);
  $(recipe.ingredients).each((idx, ingredient) => {
    $(".ingredients").append(`
    <div>${ingredient}</div>
    `);
  });
  $(recipe.instructions).each((idx, instruction) => {
    $(".instructions").append(`
    <div>${instruction}</div>
    `);
  });
}

function initListeners() {
  console.log("ready");
  $(window).on("hashchange", route);
  route();
}

function signUpUser() {
  let first = $("#fname").val();
  let last = $("#lname").val();
  let email = $("#signup-email").val();
  let password = $("#signup-password").val();

  MODEL.signup(first, last, email, password, routeToHome);

  $("#fname").val("");
  $("#lname").val("");
  $("#signup-email").val("");
  $("#signup-password").val("");

  $(".nav-links").html(`
  <a href="#home" id="home">Home</a>
        <a href="#browse" id="browse">Browse</a>
        <a href="#create-recipe" id="create-recipe">Create Recipe</a>
        <a href="#your-recipes" id="your-recipes">Your Recipes</a>
        <a class="site-btn" id="nav-login" href="#login"><span>Logout</span></a>
  `);
}

function logInUser() {
  let email = $("#login-email").val();
  let password = $("#login-password").val();

  MODEL.login(email, password, routeToHome);

  $("#login-email").val("");
  $("#login-password").val("");

  $(".nav-links").html(`
  <a href="#home" id="home">Home</a>
        <a href="#browse" id="browse">Browse</a>
        <a href="#create-recipe" id="create-recipe">Create Recipe</a>
        <a href="#your-recipes" id="your-recipes">Your Recipes</a>
        <a class="site-btn" id="nav-login" href="#login"><span>Logout</span></a>
  `);
}

function logOutUser() {
  MODEL.logout(routeToHome);
  $(".nav-links").html(`
  <a href="#home" id="home">Home</a>
        <a href="#browse" id="browse">Browse</a>
        <a href="#create-recipe" id="create-recipe">Create Recipe</a>
        
        <a class="site-btn" id="nav-login" href="#login"><span>Login</span></a>
  `);
}

function routeToHome() {
  window.location.hash = "#home";
}

function displayAllRecipes() {
  //you can use this allrecipes variable to display the whole list of recipes
  //allRecipes will come back as an array of objects
  let allRecipes = model.viewAllRecipes();
  $.each(allRecipes, (idx, recipe) => {
    //append to the page here
  });
}

function displayUserRecipes(userName) {
  let recipes = MODEL.viewUserRecipes();
  $("#name-greeting").html(`Hey ${userName}, here are your recipes!`);
  console.log(recipes);
  $.each(recipes, (idx, recipe) => {
    $(".recipes-container").append(`<div class="recipe-image-section">
    <img src="${recipe.image}" alt="">
    <button class="site-btn" id="view-recipe-btn">View</button>
    </div>
    <div class="recipe-description">
    <h3>${recipe.name}</h3>
    <p>${recipe.desc}</p>
    <p>${recipe.time}</p>
    <p>${recipe.servings}</p>
    </div>
    <div class="edit-delete-btns">
    <button class="site-btn" id="editRecipeBtn">Edit Recipe</button>
      <button class="site-btn" id="deleteRecipeBtn">Delete</button>
    </div>`);
  });
}

$(document).ready(function () {
  initListeners();
});
