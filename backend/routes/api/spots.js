const router = require('express').Router();
const { query } = require('express');
const { models } = require('sequelize');
const { Spot, Review, SpotImage, User, Booking } = require('../../db/models');
const { requireAuth, restoreUser } = require('../../utils/auth');

// Return all the spots owned (created) by the current user.
router.get(
  '/current',
  restoreUser,
  requireAuth,
  async (req, res, next) => {
    const { user } = req;
    if (user) {
      const query = { where: {} }
      query.where = { ownerId: user.id };
      console.log(query);

      const userSpots = await Spot.findAll(query);

      res.json({
        Spots: userSpots
      });
    }
  }
);

// Returns the details of a spot specified by its id
router.get(
  '/:spotId',
  async (req, res, next) => {
    const spotId = parseInt(req.params.spotId);
    const spot = await Spot.findByPk(spotId);

    if (spot) {
      const spotJSON = spot.toJSON();
      spotJSON.numReviews = await Review.count({ where: { spotId }});
      spotJSON.SpotImages = await spot.getSpotImages();
      spotJSON.Owner = await spot.getUser({
        through: {
          attributes: []
        },
        scope: 'spotOwner'
      });

      return res.json(spotJSON);
    } else {
      res.status(404)
      return res.json({
        message: `Spot couldn't be found`,
        statusCode: 404
      });
    }
  }
)

// Return all spots
router.get(
  '/',
  async (req, res, next) => {
    const allSpots = await Spot.findAll();

    res.json({Spots: allSpots});
});

module.exports = router;
