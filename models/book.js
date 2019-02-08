'use strict';
//show data from library
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {

    title: {
      type: DataTypes.STRING,
      validate: {// validate checks upon submit
        notEmpty: { // that text field better not be blank
          msg: 'Enter Book Title'
        }
      }
    },

    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Enter Author'
        }
      }
    },

    genre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Enter Genre'
        }
      }
    },

    year: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: {
          msg: 'Year must be a number'
        },
        notEmpty: {//must be a number
          msg: "Must Enter Year"
        }
      }
    },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });

  Book.associate = function(models) {
    // associations can be defined here
  };

  return Book;
};
