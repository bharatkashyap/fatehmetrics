var express = require("express");
var router = express.Router();

// Create authorisatoin middleware to redirect if token not set
/* router.use("/", function (req, res, next) {
    if (req.path !== "/login" && !req.session.token) {
        return res.redirect("/login?returnUrl=" + encodeURIComponent("/app"));
    }

    next();
});

// Make JWT token available to angular app
router.get("/token", function (req, res) {
    res.send(req.session.token);
}); */

// Serve angular app files from the '/app' route
router.use("/", express.static("app"));

module.exports = router;
