// Sequelize (capital) references the standard library
const Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
const sequelize = require("../config/config");

// const sequelize = require("../models/index").sequelize;

// Creates a "Ratings" model that matches up with DB
module.exports = (sequelize, DataTypes) => {
  const Ratings = sequelize.define("ratings", {
    nameOfPlace: DataTypes.STRING,
    visit: DataTypes.BOOLEAN,
    thumbsUp: DataTypes.BOOLEAN,
    notes: DataTypes.STRING
  });
  return Ratings;
};
// Syncs with DB
// Ratings.sync();

// Makes the Ratings Model available for other files (will also create a table)
// module.exports = Ratings;
