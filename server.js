// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it

const passport = require("./config/passport");

// require('process');
// const fetch = require("node-fetch");


// var compression = require("compression");
// const convert = require("xml-js");
// const rateLimit = require("express-rate-limit");
// const limiter = rateLimit({
// 	windowMs: 1000, // 1 second
// 	max: 1, // limit each IP to 1 requests per windowMs
// })

// //  apply to all requests
// app.use(limiter)



// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");
require("dotenv").config();

// console.log(process.env);

// Creating express app and configuring middleware needed for authentication

const app = express();
// app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(__dirname + "public"));
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// app.get('/api/ratings', (req, res) => {

//   res.render('travelLog');
// })

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/api-ratings-routes")(app);
// require("./dist/index")(app);


// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
