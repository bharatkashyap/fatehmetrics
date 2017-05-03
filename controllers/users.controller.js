require("rootpath")();
var config = require("config.json");
var express = require('express');
var router = express.Router();
var userService = require("services/user.service");

// routes
router.post('/authenticate', authenticateUser);

module.exports = router;

function authenticateUser(req, res) {
    userService.authenticate(req.body.username, req.body.password)
        .then(function (token) {
            if (token) {
                // authentication successful
                res.send({ token: token });
            } else {
                // authentication failed
                res.sendStatus(401);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
