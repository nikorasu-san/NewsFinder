// dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
var PORT = process.env.PORT || 8080;
var logger = require("morgan");


// database requires all models in folder
//var db = require("./models");

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
// e.g. require("./routes/html-routes.js")(app);
require("./controller/controller.js")(app);

// Don't run app unless we have db sync
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
    console.log("http://localhost:8080")
});

