import * as model from "./model.js";

function initListeners() {
  console.log("ready");
}

$(document).ready(function () {
  model.deleteRecipe(2);
  initListeners();
});
