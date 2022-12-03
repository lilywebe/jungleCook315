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
  } else if (pageID.indexOf("/") !== -1) {
    MODEL.currentPage(pageID, editRecipe);
  } else if (pageID.indexOf("?") !== -1) {
    MODEL.currentPage(pageID, deleteRecipe);
  } else if (pageID == "your-recipes") {
    MODEL.currentPage("your-recipes", initYourRecipesListeners);
  }
  //if there is no underscore, indexof returns -1
  else if (pageID.indexOf("_") !== -1) {
    MODEL.currentPage(pageID, individualRecipe);
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

function addRecipe(user) {
  console.log(user);
  if (user) {
    $("#name-greeting").html(`Hey ${user.firstName}, create your recipe!`);

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
      routeToHome();
    });
  } else {
    $(".create-recipe-page").html("");
    $(".create-recipe-page").html(
      `<h2 id="name-greeting">Hey, you aren't logged in! Log in to add a recipe!</h2>`
    );
  }
}

//whenever the larger "recipes page" gets made, each recipe needs to have the "edit" button pass over the recipeid
async function editRecipe(userName, recipeid) {
  let recipe = MODEL.viewSingleRecipe(recipeid);
  ingredCount = recipe.ingredients.length;
  stepCount = recipe.steps.length;
  $("#name-greeting").html(`Hey ${userName}, edit your recipe!`);

  await $(".inputs-section")
    .append(`<input type="text" id="recipe-image" value=${recipe.image} />
  <input type="text" id="recipe-name" value=${recipe.name} />
  <input type="text" id="recipe-desc" value=${recipe.desc} />
  <input type="text" id="recipe-time" value=${recipe.time} />
  <input type="text" id="recipe-servings" value=${recipe.servings} />`);

  $.each(recipe.ingredients, (idx, ingredient) => {
    $(".ingredients-section").append(
      `<input type="text" id="ingred${idx}" value=${ingredient} />`
    );
  });
  $(".ingredients-section").append(
    `<div class="addIngredButton"><p>+</p></div>`
  );

  $.each(recipe.steps, (idx, step) => {
    $(".instructions-section").append(
      `<input type="text" id="step${idx}" value=${step} />`
    );
  });
  $(".instructions-section").append(
    `<div class="addStepButton"><p>+</p></div>`
  );

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
    recipeid: recipeid,
    image: "",
    name: "",
    desc: "",
    time: "",
    servings: "",
    steps: [],
    ingredients: [],
  };

  $("#editBtn").on("click", (e) => {
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
    MODEL.editRecipe(recipeObj);
    routeToHome();
  });
}

//whenever the larger "recipes page" gets made, each recipe needs to have the "view" button pass over the recipeid
function individualRecipe(recipeid) {
  let recipe = MODEL.viewSingleRecipe(recipeid);
  $(".recipe-header").html(`
    <div class="recipe-image-section">
      <h2 id="sw-recipe-name">${recipe.name}</h2>
      <img src="${recipe.image}" alt="" />
    </div>
    <div class="description">
      <div class="desc-box">
        <h2>Description:</h2>
        <p>${recipe.description}</p>
      </div>
      <div class="desc-box">
        <h3>Total Time:</h3>
        <p>${recipe.time}</p>
      </div>
      <div class="desc-box">
        <h3>Servings:</h3>
        <p>${recipe.servings}</p>
      </div>
    </div>
  `);
  $(recipe.ingredients).each((idx, ingredient) => {
    $(".ingredients").append(`
    <p>${ingredient}</p>
    `);
  });
  $(recipe.instructions).each((idx, instruction) => {
    $(".instructions").append(`
    <p>${instruction}</p>
    `);
  });
}

function deleteRecipe(recipeid) {
  $("#delete-submit").on("click", () => {
    MODEL.deleteRecipe(recipeid);
    routeToHome();
  });
}

function initListeners() {
  console.log("ready");
  $(window).on("hashchange", route);
  route();
  // MODEL.viewAllRecipes();
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
        <a href="#browse-recipes" id="browse">Browse</a>
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
        <a href="#browse-recipes" id="browse">Browse</a>
        <a href="#create-recipe" id="create-recipe">Create Recipe</a>
        <a href="#your-recipes" id="your-recipes">Your Recipes</a>
        <a class="site-btn" id="nav-login" href="#login"><span>Logout</span></a>
  `);
}

function logOutUser() {
  MODEL.logout(routeToHome);
  $(".nav-links").html(`
  <a href="#home" id="home">Home</a>
        <a href="#browse-recipes" id="browse">Browse</a>
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

//display user recipes on the "your recipes page"
function displayUserRecipes(userName) {
  let recipes = MODEL.viewUserRecipes();
  if (recipes.length == 0) {
    $("#name-greeting").html(
      `Hey ${userName}, you don't have any recipes yet. Add some to see them here!`
    );
  } else {
    $("#name-greeting").html(`Hey ${userName}, here are your recipes!`);
    console.log(recipes);
    $.each(recipes, (idx, recipe) => {
      $(".recipes-container")
        .append(`
          <div class="ind-container">
            <div class="ind-recipe">

              <div class="recipe-image-section">
                <img src="${recipe.image}" alt="">
                <a href="#individual-recipe_${recipe.recipeid}">View</a>
              </div>

              <div class="recipe-description">
                <h3>${recipe.name}</h3>
                <p class="description">${recipe.description}</p>

                <div class="recipe-details">
                  <img src="./images/time.svg" alt="time-svg" />
                  <p class="time">${recipe.time}</p>
                </div>

                <div class="recipe-details">
                  <img src="./images/servings.svg" alt="servings-svg" />
                  <p class="serving">${recipe.servings}</p>
                </div>
              </div>
            </div>

            <div class="edit-delete-btns">
              <a href="#edit-recipe/${recipe.recipeid}">Edit Recipe</a>
              <a href="#delete-recipe?${recipe.recipeid}">Delete</a>
            </div>
          </div>
    `);
    });
  }
}

function checkUserStatus() {
  let user = MODEL.getUser();
  if (user.status) {
    $(".nav-links").html(`
    <a href="#home" id="home">Home</a>
          <a href="#browse-recipes" id="browse">Browse</a>
          <a href="#create-recipe" id="create-recipe">Create Recipe</a>
          <a href="#your-recipes" id="your-recipes">Your Recipes</a>
          <a class="site-btn" id="nav-login" href="#login"><span>Logout</span></a>
    `);
  } else {
    $(".nav-links").html(`
    <a href="#home" id="home">Home</a>
          <a href="#browse-recipes" id="browse">Browse</a>
          <a href="#create-recipe" id="create-recipe">Create Recipe</a>
          
          <a class="site-btn" id="nav-login" href="#login"><span>Login</span></a>
    `);
  }
}

$(document).ready(function () {
  initListeners();
  checkUserStatus();
});
