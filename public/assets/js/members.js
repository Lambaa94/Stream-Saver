$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML with the users movie list
  $.get("/api/watchlists/").then(function (data) {
    console.log(data);
  });
  // Put route to add new movie/show to the database
  $.post("api/watchlists/", function (data) {
    console.log(data)
  });
});
