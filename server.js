// dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
var PORT = process.env.PORT || 8080;
var logger = require("morgan");
var mongoose = require("mongoose");





// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));

// Static Serve
app.use(express.static("./public"));

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./controller/controller.js")(app);

// DB connection
//mongoose.connect('mongodb://localhost/newsscraper', { useNewUrlParser: true });

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsscraper";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

var connect = mongoose.connection;
connect.on('error', console.error.bind(console, 'connection error:'));
connect.once('open', function () {
    console.log("DB connected!")
});

// Don't run app unless we have db sync
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
    console.log("http://localhost:8080")
});

