require("rootpath")();
var path = require("path");
var express = require("express");
var mongoose = require("mongoose");
var app = express();

var session = require("express-session");
var bodyParser = require("body-parser");
var jwt = require("express-jwt");
var config = require("config.json");

var user = require("models/user.js");

var morgan = require("morgan");
//Express defaults
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

mongoose.connect(config.database); // connect to database
//Express access to public files
app.use(express.static(path.join(__dirname + "/public")));

//Use bodyParser so we can use data from the POST request and/or URL params
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({ secret: config.secret, resave: false, saveUninitialized: false }));

app.use(morgan("dev"));

// Use JWT auth to secure the api
app.use("/api", jwt({ secret: config.secret }).unless({ path: ["/api/users/authenticate", "/api/users/register"] }));

// Routes
app.use("/login", require("./controllers/login.controller"));
/* app.use('/register', require('./controllers/register.controller')); */
 app.use("/app", require("./controllers/app.controller"));
app.use("/api/users", require("./controllers/users.controller"));

// make '/app' default route
app.get("/", function (req, res) {
    return res.redirect("/app");
});


// start server
var server = app.listen(3000, "localhost", function () {
    console.log("Server listening at http://" + server.address().address + ':' + server.address().port);
});
