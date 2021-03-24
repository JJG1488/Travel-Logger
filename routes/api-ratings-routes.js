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
