export function getUser() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return currentUser;
}

export async function signup(fname, lname, uname, pass, callback) {
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
  callback();
  console.log(currentUser);
}

export async function login(uname, pass, callback) {
  //get user stored in local storage
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    //check if username and password match user inputs
    if (currentUser.username == uname) {
      if (currentUser.password == pass) {
        currentUser.status = true;
        await localStorage.setItem("currentUser", JSON.stringify(currentUser));
        console.log("logged in");
        callback();
      } else {
        //nicer alerts needed
        alert("wrong password");
      }
    } else {
      //nicer alerts needed
      alert("wrong username");
    }
  } else {
    alert("website has no users");
  }
}

export function logout(callback) {
  console.log("making it to the model");
  if (localStorage) {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    user.status = false;
    localStorage.setItem("currentUser", JSON.stringify(user));
    console.log("logged out");
    alert("You've been logged out");
    callback();
  }
}

export function viewSingleRecipe(recipeid) {
  let recipes = JSON.parse(localStorage.getItem("recipes"));
  let user = JSON.parse(localStorage.getItem("currentUser"));
  let recipe = recipes[recipeid];
  console.log(recipe);
  return recipe;
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

  //better alert needed
  alert("You've added " + recipeObj.name + " to your recipes!");

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
  recipes[recipeObj.recipeid] = {
    recipeid: recipeObj.recipeid,
    image: recipeObj.image,
    name: recipeObj.name,
    description: recipeObj.desc,
    time: recipeObj.time,
    servings: recipeObj.servings,
    ingredients: recipeObj.ingredients,
    steps: recipeObj.steps,
  };

  //update value in localstorage to match
  localStorage.setItem("recipes", JSON.stringify(recipes));

  console.log(recipes);
  alert("You've edited " + recipeObj.name + "!");
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
  alert("Your recipe has been deleted");
  console.log(recipes);
}

export async function viewAllRecipes() {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  let allRecipes = [];
  let preLoadRecipes = [];

  await $.getJSON("data/recipes.json", function (json) {
    preLoadRecipes = json.recipes;
    //console.log(preLoadRecipes);
  });
  $.each(preLoadRecipes, (idx, recipe) => {
    allRecipes.push(recipe);
  });
  if (user) {
    if (user.status == true) {
      let userRecipes = JSON.parse(localStorage.getItem("recipes"));
      $.each(userRecipes, (idx, recipe) => {
        allRecipes.push(recipe);
      });
    }
  }
  console.log(allRecipes);
  return allRecipes;
}

export function viewUserRecipes() {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  if (user.status == true) {
    let userRecipes = JSON.parse(localStorage.getItem("recipes"));
    return userRecipes;
  }
}

export function currentPage(pageID, callback) {
  if (pageID == "" || pageID == "home") {
    $.get(`pages/home.html`, function (data) {
      $("#app").html(data);
    });
  } else if (pageID == "login") {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      if (user.status == true) {
        $.get(`pages/logout.html`, function (data) {
          $("#app").html(data);
          callback();
        });
      }
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
  } else if (pageID == "your-recipes") {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    $.get(`pages/${pageID}.html`, function (data) {
      $("#app").html(data);
      callback(user.firstName);
    });
  } else if (pageID.indexOf("/") !== -1) {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    let itemID = pageID.substring(pageID.indexOf("/") + 1);
    let page = pageID.substring(0, pageID.indexOf("/"));
    $.get(`pages/${page}.html`, function (data) {
      $("#app").html(data);
      callback(user.firstName, itemID);
    });
  } else if (pageID.indexOf("_") !== -1) {
    let itemID = pageID.substring(pageID.indexOf("_") + 1);
    let htmlid = pageID.substring(0, pageID.indexOf("_"));
    $.get(`pages/${htmlid}.html`, function (data) {
      $("#app").html(data);
      callback(itemID);
    });
  } else if (pageID.indexOf("?") !== -1) {
    let itemID = pageID.substring(pageID.indexOf("?") + 1);
    let htmlid = pageID.substring(0, pageID.indexOf("?"));
    $.get(`pages/${htmlid}.html`, function (data) {
      $("#app").html(data);
      callback(itemID);
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
