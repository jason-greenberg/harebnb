'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.hasMany(
        models.ReviewImage,
        { foreignKey: 'reviewId', onDelete: 'cascade', hooks: true }
      )
    }
  }
  Review.init({
    userId: {
      type: DataTypes.INTEGER,
      references: { model: 'Users' },
      onDelete: 'cascade',
      hooks: true
    },
    spotId: {
      type: DataTypes.INTEGER,
      references: { model: 'Spots' },
      onDelete: 'cascade',
      hooks: true
    },
    review: DataTypes.TEXT,
    stars: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
