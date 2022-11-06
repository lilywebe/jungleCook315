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
