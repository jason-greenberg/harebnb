const router = require('express').Router();
const { query } = require('express');
const { models } = require('sequelize');
const sequelize = require('sequelize');
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
      const result = await Review.findAll({
        attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'averageStars']],
        where: { spotId },
        group: ['spotId']
      });

      spotJSON.numReviews = await Review.count({ where: { spotId }});
      spotJSON.avgStarRating = result[0].dataValues.averageStars;
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

// Create and return a new image for a spot specified by id
router.post(
  '/:spotId/images',
  restoreUser,
  requireAuth,
  async (req, res, next) => {
    const { url, preview } = req.body;
    const { user } = req;
    const userId = user.id;
    const spotId = parseInt(req.params.spotId);
    const spot = await Spot.findByPk(spotId);

    // Return 404 Error if spot not found
    if (!spot) {
      res.status(404);
      return res.json({
        message: "Spot couldn't be found",
        statusCode: 404
      })
    }
    // Return 403 Not authorized Error if spot does not belong to current user
    if (spot.ownerId !== userId) {
      res.status(401);
      return res.json({
        message: "Forbidden",
        statusCode: 403
      })
    }

    const newSpotImage = await SpotImage.create({
      spotId,
      url,
      preview
    });
    // return the new spot image using default scope (not applied to above instance)
    const responseSpotImage = await SpotImage.findOne({
      where: {
        spotId,
        url,
        preview
      }
    });

    res.json(responseSpotImage);
  }
)

// Create and return a new spot
router.post(
  '/',
  restoreUser,
  requireAuth,
  async (req, res, next) => {
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    } = req.body;
    const { user } = req;
    const ownerId = user.id;

    try {
      const newSpot = await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
      });

      res.status(201)
      res.json(newSpot);
    } catch(e) {
      const errorResponse = {
        message: 'Validation Error',
        statusCode: 400,
        errors: {}
      };

      if (e.name === 'SequelizeValidationError') {
        e.errors.forEach(error => {
          errorResponse.errors[error.path] = error.message;
        });
      } else {
        errorResponse.errors.server = 'Server error';
      }

      res.status(errorResponse.statusCode);
      res.json(errorResponse);
    }
  }
);

// Updates and returns an existing spot
router.put(
  '/:spotId',
  restoreUser,
  requireAuth,
  async (req, res, next) => {
    const { user } = req;
    const userId = user.id;
    const spotId = parseInt(req.params.spotId);
    const spot = await Spot.findByPk(spotId);

    // Return 404 Error if spot not found
    if (!spot) {
      res.status(404);
      return res.json({
        message: "Spot couldn't be found",
        statusCode: 404
      })
    }
    // Return 403 Not authorized Error if spot does not belong to current user
    if (spot.ownerId !== userId) {
      res.status(401);
      return res.json({
        message: "Forbidden",
        statusCode: 403
      })
    }

    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    } = req.body;

    const expectedFields = [
      'address',
      'city',
      'state',
      'country',
      'lat',
      'lng',
      'name',
      'description',
      'price'
    ];
    const missingFields = expectedFields.filter(field => !(field in req.body));

    if (missingFields.length > 0) {
      res.status(400);
      return res.json({
        message: 'Validation Error',
        statusCode: 400,
        errors: {
          missingFields: missingFields.map(field => `${field} is required`)
        }
      });
    }

    try {

      await spot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
      })

      return res.json(spot);
    } catch(e) {
      const errorResponse = {
        message: 'Validation Error',
        statusCode: 400,
        errors: {}
      };

      if (e.name === 'SequelizeValidationError') {
        e.errors.forEach(error => {
          errorResponse.errors[error.path] = error.message;
        });
      } else {
        errorResponse.errors.server = 'Server error';
      }

      res.status(errorResponse.statusCode);
      res.json(errorResponse);
    }
  }
)

module.exports = router;
