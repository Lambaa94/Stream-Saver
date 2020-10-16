//REPLACED PATH WITH HANDLEBARS
// var path = require("path");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  
  app.get("/signup", function(req,res){
    if (req.user){
      res.redirect("/members")
    }
    res.render("signup")
  })

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("homepage");
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login")
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.render("member")
  });

console.log("im writing this to do another pull and commit.")
  // The Main page of the application
  app.get("/watchlist", isAuthenticated, function(req, res) {
   
    if (req.user) {

      db.watchList.findAll({
          raw: true,
          where: { UserId: req.user.id }
      }).then(function (movieData) {
          console.log(movieData, "LOOK HERE")
          // res.json(data)
          res.render("index", {movies: movieData})

      });
  } else {res.json({})};
    
  });

};
