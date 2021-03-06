// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
// <<<<<<< final
    
    res.render("display", {GAPI_KEY: process.env.api_key} );
// =======
//     res.render("display", {GAPI_KEY: process.env.api_key});
    
// >>>>>>> main
    // res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  // app.get("/recents", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/recents.html"));
  // });

  // app.get("/recommendations", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/recommendations.html"));
  // });

  // app.get("/search", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/search.html"));
  // });

  // app.get("/notes", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/notes.html"));
  // });

  app.get("/ratings", (req, res) => {
    res.render("travelLog");
    // res.sendFile(path.join(__dirname, "../public/ratings.html"));
  });

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  app.get("/cms", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  // blog route loads blog.html
  app.get("/blog", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });
};
