import * as MODEL from "./model.js";

var ingredCount = 3;
var stepCount = 3;

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
function editRecipe(recipeid) {
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

  MODEL.signup(first, last, email, password);

  $("#fname").val("");
  $("#lname").val("");
  $("#signup-email").val("");
  $("#signup-password").val();
}

function logInUser() {
  let email = $("#login-email").val();
  let password = $("#login-password").val();

  MODEL.login(email, password);

  $("#login-email").val("");
  $("#login-password").val();
}

function logOutUser() {
  MODEL.logout();
}

$(document).ready(function () {
  initListeners();
});
