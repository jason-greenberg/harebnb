'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsToMany(
        models.User,
        { through: models.Bookings, foreignKey: 'spotId' }
      ),
      Spot.belongsToMany(
        models.User,
        { through: models.Review, foreignKey: 'spotId' }
      ),
      Spot.hasMany(
        models.SpotImage,
        { foreignKey: 'spotId', onDelete: 'cascade', hooks: true }
      ),
      Spot.belongsTo(
        models.User,
        { foreignKey: 'ownerId' }
      )
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      references: { model: 'Users' }
    },
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    avgRating: DataTypes.DECIMAL,
    previewImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
