// add to git hub
$(document).ready(function () {

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML with the users movie list
  $.get("/api/watchlists").then(function (data) {
    console.log(data)
    
  });

  
  $(document).on('click', '.addShow', function(event){
    event.preventDefault()
    
    console.log(" ADDING NEW SHOW")
  });
  $(document).on('click', '#1', function(event){
    event.preventDefault()
    
    console.log("ADDING NEW SIM MOVIE-1")
  });
  $(document).on('click', '#2', function(event){
    event.preventDefault()
    
    console.log("ADDING NEW SIM MOVIE-2")
  });
  $(document).on('click', '#3', function(event){
    event.preventDefault()
    
    console.log("ADDING NEW SIM MOVIE-3")
  });
  $(document).on('click', '#4', function(event){
    event.preventDefault()
    
    console.log("ADDING NEW SIM SHOW-1")
  });
  $(document).on('click', '#5', function(event){
    event.preventDefault()
    
    console.log("ADDING NEW SIM SHOW-2")
  });
  $(document).on('click', '#6', function(event){
    event.preventDefault()
    
    console.log("ADDING NEW SIM SHOW-3")
  });


});
