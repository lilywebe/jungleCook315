export async function signup(fname, lname, uname, pass) {
  //create an object from user input

  let user = {
    firstName: fname,
    lastName: lname,
    username: uname,
    password: pass,
    status: true,
  };

  //set user in local storage
  await localStorage.setItem("currentUser", JSON.stringify(user));
  //get user from local storage
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser);
}

export async function login(uname, pass) {
  //get user stored in local storage
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  //check if username and password match user inputs
  if (currentUser.username == uname) {
    if (currentUser.password == pass) {
      currentUser.status = true;
      await localStorage.setItem("currentUser", JSON.stringify(currentUser));
      console.log("logged in");
    } else {
      //nicer alerts needed
      alert("wrong password");
    }
  } else {
    //nicer alerts needed
    alert("wrong username");
  }
}

export function logout() {
  console.log("making it to the model");
  if (localStorage) {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    user.status = false;
    localStorage.setItem("currentUser", JSON.stringify(user));
    console.log("logged out");
    alert("You've been logged out");
    currentPage("home");
  }
}

export function viewSingleRecipe(recipeid) {
  let recipes = JSON.parse(localStorage.getItem("recipes"));
  let user = JSON.parse(localStorage.getItem("user"));
  let recipe = recipes[recipeid];
  return recipe, user.status;
}

export function addRecipe(recipeObj) {
  if (localStorage.getItem("recipes") !== null) {
    //get current recipe array if already exists in local storage
    var recipes = JSON.parse(localStorage.getItem("recipes"));
  } else {
    //if it doesn't already exist, create a blank recipe array
    var recipes = [];
  }

  recipeObj.recipeid = recipes.length;

  //add new recipe to recipe array
  recipes.push(recipeObj);

  //set recipe in local storage
  localStorage.setItem("recipes", JSON.stringify(recipes));

  console.log(recipes);
}

export function editRecipe(recipeObj) {
  if (localStorage.getItem("recipes") !== null) {
    //get current recipe array if already exists in local storage
    var recipes = JSON.parse(localStorage.getItem("recipes"));
  } else {
    //if it doesn't already exist, we can't edit it
    alert("recipe not found");
  }

  //update values at recipe to be newly inputted values
  recipes[recipeid] = {
    recipeid: recipeid,
    image: image,
    name: name,
    description: description,
    time: time,
    servings: servings,
    ingredients: ingredients,
    instructions: instructions,
  };

  //update value in localstorage to match
  localStorage.setItem("recipes", JSON.stringify(recipes));

  console.log(recipes);
}

export function deleteRecipe(recipeid) {
  if (localStorage.getItem("recipes") !== null) {
    //get current recipe array if already exists in local storage
    var recipes = JSON.parse(localStorage.getItem("recipes"));
  } else {
    //if it doesn't already exist, we can't delete it
    alert("recipe not found");
  }

  //remove recipe
  recipes.splice(recipeid, 1);

  //update local storage to not have that recipe
  localStorage.setItem("recipes", JSON.stringify(recipes));

  console.log(recipes);
}

//initpreloadedrecipes DOES NOT work rn
export async function initPreLoadedRecipes() {
  await fetch("../data/recipes.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (localStorage.getItem("recipes") !== null) {
        //get current recipe array if already exists in local storage
        // to be clear it should not exist
        var recipes = JSON.parse(localStorage.getItem("recipes"));
      } else {
        //if it doesn't already exist, create a recipe array from json file
        var recipes = [];
        recipes.push(data.recipes.recipe);
      }
      //set recipe in local storage
      localStorage.setItem("recipes", JSON.stringify(recipes));

      console.log(
        "get preset recipe",
        JSON.parse(localStorage.getItem("recipes"))
      );
    });
}

export function currentPage(pageID, callback) {
  if (pageID == "" || pageID == "home") {
    $.get(`pages/home.html`, function (data) {
      $("#app").html(data);
    });
  } else if (pageID == "login") {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    if (user.status == true) {
      $.get(`pages/logout.html`, function (data) {
        $("#app").html(data);
        callback();
      });
    } else {
      $.get(`pages/login.html`, function (data) {
        $("#app").html(data);
        callback();
      });
    }
  } else if (pageID == "create-recipe") {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    $.get(`pages/${pageID}.html`, function (data) {
      $("#app").html(data);
      callback(user.firstName);
    });
  } else {
    $.get(`pages/${pageID}.html`, function (data) {
      $("#app").html(data);
      callback();
    });
  }

  //if the page in the nav contains the pageID, give it a bottom border
  // $(`#${pageID}`).addClass("current-page")
}
