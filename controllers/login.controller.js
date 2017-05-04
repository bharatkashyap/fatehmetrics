require("rootpath")();
var express = require("express");
var router = express.Router();
var request = require("request");
var config = require("config.json");

router.get("/", function (req, res) {
     //Log user out
    delete req.session.token;

    //Move success message into local variable so it only appears once (single read)
    var viewData =  { success: req.session.success };
    delete req.session.success;

    res.render("login");
});

//POST request to authenticate users
router.post("/", function (req, res) {

    // Authenticate using api to maintain clean separation between layers
    request.post({
        url: config.apiUrl + "/users/authenticate",
        form: req.body,
        json: true
    }, function (error, response, body) {
        if (error) {
            return res.render("login", {error: body.message});
        }

        if(!body.success)
        {
          return res.render("login", {error: body.message, username: req.body.username});
        }
        else
        {
          if (!body.token) {
              return res.render("login", {username: req.body.username });
          }

        // save JWT token in the session to make it available to the angular app
        req.session.token = body.token;

        // redirect to returnUrl
        if(req.query.returnUrl)
          var returnUrl = req.query.returnUrl;
        else
          var returnUrl = "/app";
        res.redirect(returnUrl);
        }

    });
});

module.exports = router;
