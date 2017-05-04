require("rootpath")();
var mongoose = require("mongoose");
var express = require("express");
var config = require("config.json");
var jwt = require("jsonwebtoken");
var router = express.Router();
var User = require("models/user");

mongoose.connect(config.database);

// routes
router.post("/authenticate", authenticateUser);

module.exports = router;

function authenticateUser(req, res)
  {
    User.findOne({
      username: req.body.username
      }, function(err, user) {

      if (err) throw err;

      if (!user)
      {
        res.json({ success: false, message: "Authentication failed. User not found."});
      }

      else if (user)
      {
        if (user.password != req.body.password)
        {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        }
        else
        {
          var token = jwt.sign(user, config.secret,
            {
            expiresIn: 1440 // expires in 24 hours
            });

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Successfully logged in!',
            token: token
            });
        }
      }
    });
  }
