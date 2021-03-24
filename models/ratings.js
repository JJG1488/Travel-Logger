// Sequelize (capital) references the standard library
const Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
const sequelize = require("../config/config");

// const sequelize = require("../models/index").sequelize;

// Creates a "Ratings" model that matches up with DB
module.exports = (sequelize, DataTypes) => {
  const Ratings = sequelize.define("Ratings", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: 'Personal',
    },
    nameOfPlace: {
      type: DataTypes.STRING
    },
    visit: {
      type: DataTypes.BOOLEAN
    },
    thumbsUp: {
      type: DataTypes.BOOLEAN
    },

    notes: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("NOW()")
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("NOW()")
    }
  });
  // Ratings.sync();
  return Ratings;
  
};
// Syncs with DB


// Makes the Ratings Model available for other files (will also create a table)
// module.exports = Ratings;
