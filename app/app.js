import * as MODEL from "./model.js";

function route() {
  let hashtagLink = window.location.hash //get page from hashtag in url 
  let pageID = hashtagLink.replace("#", "") //set page id without hashtag

  //route pages
  if(pageID == "" || pageID == "home") {
      MODEL.currentPage("home")
  } else {
      MODEL.currentPage(pageID)
  }
}

function initListeners() {
  console.log("ready");
  route()
}

$(document).ready(function () {
  initListeners();
});
