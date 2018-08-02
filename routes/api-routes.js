// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

var bodyParser = require("body-parser");

// Routes
// =============================================================
module.exports = function (app) {

    // POST route for creating a new table (room/studio)
    app.post("/api/posts", function (req, res) {
        // console.log("req. ","");
        console.log(req.body);

        db.Blob.create({
            name: req.body.name,
            description: req.body.description,
            routeName: req.body.routeName,
            isPublic: req.body.isPublic,
            pssw: req.body.pssw,
        })
            .then(function (dbPost) {
                console.log("logged");
                console.log(dbPost)
                // console.log(dbPost.dataValues.body)
                res.json(dbPost);
            });
    });

    // GET route for getting all of the posts
    app.get("/api", function (req, res) {
        db.Blob.findAll({})
            .then(function (results) {
                // console.log("img", results[1].dataValues.body);
                res.json(results);
            });
    });

    // GET route for getting a single table (room/studio)
    app.get("/api/:route", function (req, res) {
        db.Blob.findOne({
            where: {
                // checks whether the routeName exists
                routeName: req.params.route,
            },
        })
            .then(function (results) {
                // console.log("img", results[1].dataValues.body);
                res.json(results);
            });
    });


    // PUT route for updating posts
    app.put("/api/posts/", function (req, res) {
        db.Blob.update(req.body, {where: { routeName: req.body.routeName}})
            .then(function (dbPost) {
                res.json(dbPost);
                // console.log(dbPost);
            });
      });
};