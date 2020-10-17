// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var isAuthenticated = require("../config/middleware/isAuthenticated");
// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

    // GET route for getting all of the posts
    app.get("/api/watchlists", isAuthenticated, function (req, res) {
        if (req.user) {

            db.watchList.findAll({
                where: { UserId: req.user.id }
            }).then(function (data) {
                console.log(data, "LOOK HERE")
                res.json(data)

            });
        }else{res.json({})};
    });


    // POST route for saving a new post
    app.post("/api/watchlists", isAuthenticated, function (req, res) {
        console.log("IS AUTHENTIC")
        const newWatch = {title: req.body.title, rating: req.body.rating, poster: req.body.poster, date: req.body.date, media_type: req.body.media_type, stream_url: req.body.stream_url, UserId: req.user.id}
        db.watchList.create(newWatch).then(function (dbwatchlist) {
            console.log("I AM WORKING")
            
            res.json(dbwatchlist);
        });
    });

    // DELETE route for deleting posts
    app.delete("/api/watchlists/:id", function (req, res) {
        db.watchList.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbwatchlist) {
            res.json(dbwatchlist);
        });
    });

    
};
