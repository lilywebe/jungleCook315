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
  if (localStorage) {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    user.status = false;
    localStorage.setItem("currentUser", JSON.stringify(user));
    console.log("logged out");
  }
}

export function addRecipe(
  image,
  name,
  description,
  time,
  servings,
  ingredients,
  instructions
) {
  if (localStorage.getItem("recipes") !== null) {
    //get current recipe array if already exists in local storage
    var recipes = JSON.parse(localStorage.getItem("recipes"));
  } else {
    //if it doesn't already exist, create a blank recipe array
    var recipes = [];
  }

  let recipe = {
    recipeid: recipes.length,
    image: image,
    name: name,
    description: description,
    time: time,
    servings: servings,
    ingredients: ingredients,
    instructions: instructions,
  };

  //add new recipe to recipe array
  recipes.push(recipe);

  //set recipe in local storage
  localStorage.setItem("recipes", JSON.stringify(recipes));

  console.log(recipes);
}

export function editRecipe(
  recipeid,
  image,
  name,
  description,
  time,
  servings,
  ingredients,
  instructions
) {
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
