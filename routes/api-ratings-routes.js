// Requiring our models and passport as we've configured it
const db = require("../models");
// const Ratings = require("../models");
// const passport = require("../config/config");

// Routes
module.exports = app => {
  //GET route for getting all of the ratings entered
  // findAll returns all entries for a table when used with no options
  app.get("/api/ratings", (req, res) => {
    db.Ratings.findAll({}).then(dbRatings => res.json(dbRatings));
  });

  // POST route for saving a new ratings
  app.post("/api/ratings", (req, res) => {
    db.Ratings.create({
      nameOfPlace: req.body.nameOfPlace,
      visit: req.body.visit,
      thumbsUp: req.body.thumbsUp,
      notes: req.body.notes
      // createdAt: req.body.createdAt,
      // updatedAt: req.body.updatedAt
    })
      .then(dbRatings => res.json(dbRatings))
      .catch(err => res.json(err));
  });

  // DELETE route for deleting ratings entry using the id (req.params.id)
  app.delete("/api/ratings/:id", (req, res) => {
    // We just have to specify which ratings we want to destroy with "where"
    db.Ratings.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbRatings => res.json(dbRatings));
  });

  // PUT route for updating a rating entry. We can get the updated ratings data from req.body
  app.put("/api/ratings/:id", (req, res) => {
    db.Ratings.update(
      {
        nameOfPlace: req.params.nameOfPlace,
        visit: req.params.visit,
        thumbsUp: req.params.thumbsUp,
        notes: req.params.notes
        //   createdAt: req.params.createdAt,
        // updatedAt: req.params.updatedAt
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbRatings => res.json(dbRatings))
      .catch(err => res.json(err));
  });

  // GET route for getting all of the posts
  app.get("/api/posts/", (req, res) => {
    db.Post.findAll({}).then(dbPost => res.json(dbPost));
  });

  // Get route for returning posts of a specific category
  app.get("/api/posts/category/:category", (req, res) => {
    db.Post.findAll({
      where: {
        category: req.params.category
      }
    }).then(dbPost => {
      res.json(dbPost);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/posts/:id", (req, res) => {
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(dbPost => res.json(dbPost));
  });

  // POST route for saving a new post
  app.post("/api/posts", (req, res) => {
    console.log(req.body);
    db.Post.create({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category
    }).then(dbPost => res.json(dbPost));
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", (req, res) => {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbPost => res.json(dbPost));
  });

  // PUT route for updating posts
  app.put("/api/posts", (req, res) => {
    db.Post.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(dbPost => res.json(dbPost));
  });

  // ================================================= if the above put route doesn't work use code below
  // PUT route for updating ratings

  // app.put('/api/ratings', (req, res) => {
  //   db.Ratings.update(req.body, {
  //     where: {
  //       id: req.body.id,
  //     },
  //   }).then((dbRatings) => res.json(dbRatings));
  // });
};
