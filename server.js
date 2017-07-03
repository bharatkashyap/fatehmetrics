require("rootpath")();

//Requirements
var path = require("path");
var express = require("express");
var app = express();

var session = require("express-session");
var bodyParser = require("body-parser");
var config = require("config.json");
var morgan = require("morgan");
var jwt = require("express-jwt");
var user = require("models/user.js");

//Express defaults
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//Express access to public files
app.use(express.static(path.join(__dirname + "/public")));

//Use bodyParser so we can use data from the POST request and/or URL params
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Create session using express-session

app.use(session({ secret: config.secret, resave: false, saveUninitialized: false}));

//Log requests to console using morgan
app.use(morgan("dev"));

// Use JWT auth to secure the api
app.use("/api", jwt({ secret: config.secret }).unless({ path: ["/api/users/authenticate", "/api/users/current", "/api/data/get", "/api/data/read"] }));

// Routes
app.use("/login", require("controllers/login.controller"));
app.use("/app", require("controllers/app.controller"));
app.use("/api/users", require("controllers/users.controller"));
app.use("/api/data", require("controllers/data.controller"));




// Make '/app' default route
app.get("/", function (req, res) {
    return res.redirect("/app");
});

var port = process.env.PORT || 8000;

// Start server
var server = app.listen(port, function () {
    console.log("Server listening at http://" + server.address().address + ':' + port);
});
