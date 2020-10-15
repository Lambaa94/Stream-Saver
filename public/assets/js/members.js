$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
<<<<<<< HEAD
  // and updates the HTML with the users movie list
  $.get("/watchlists").then(function (data) {
    
    console.log(data);
  });
  // Put route to add new movie/show to the database
  $.post("api/watchlists/", function (data) {
    console.log(data)
  });
=======
  // and updates the HTML on the page
  
  // $.get("/api/watchlist").then(function(data){
  //   console.log(data)
  //   // $(".streams").text(data.title)
  // })
>>>>>>> 027f27624406c521d6b57e7f8dc8ce339aee7254
});
