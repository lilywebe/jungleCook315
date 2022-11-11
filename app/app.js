import * as MODEL from "./model.js";

function route() {
  let hashtagLink = window.location.hash; //get page from hashtag in url
  let pageID = hashtagLink.replace("#", ""); //set page id without hashtag

  //route pages
  if (pageID == "" || pageID == "home") {
    MODEL.currentPage("home");
  } else if (pageID == "login") {
    MODEL.currentPage("login", initLoginListeners);
  } else if (pageID == "create-recipe") {
    MODEL.currentPage("create-recipe", initCreateRecipe);
  } else {
    MODEL.currentPage(pageID);
  }
}

function initLoginListeners() {
  $("#signup-submit").on("click", () => {
    signUpUser();
  });
  $("#login-submit").on("click", logInUser);
}

function initCreateRecipe() {
  $("#submit-recipe").on("click", createRecipe);
}

function createRecipe() {
  let image = $("#recipe-image").val();
  let name = $("#recipe-name").val();
  let desc = $("#recipe-desc").val();
  let time = $("#recipe-time").val();
  let servings = $("#recipe-servings").val();

  //need to loop through ingredient and instruction inputs

  // let ingredients = $("#signup-email").val();
  // let instructions = $("#signup-password").val();

  //MODEL.addRecipe();
}

function initListeners() {
  console.log("ready");
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

$(document).ready(function () {
  initListeners();
});
