const router = require('express').Router();
const { query } = require('express');
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const { Spot, Review, SpotImage, User, Booking } = require('../../db/models');
const { requireAuth, restoreUser } = require('../../utils/auth');
const { validateStartAndEndDates, ValidationError, BookingError } = require('../../utils/validation');

// Return all the spots owned (created) by the current user.
router.get(
  '/current',
  requireAuth,
  async (req, res, next) => {
    const { user } = req;
    if (user) {
      const query = { where: {} }
      query.where = { ownerId: user.id };

      const userSpots = await Spot.findAll(query);

      res.json({
        Spots: userSpots
      });
    }
  }
);

// Get all bookings for a spot based on the spot's id
router.get(
  '/:spotId/bookings',
  requireAuth,
  async (req, res, next) => {
    const { user } = req;
    const spotId = parseInt(req.params.spotId);
    const spot = await Spot.findByPk(spotId);
    // Return 404 error if spot does not exist
    if (!spot) {
      res.status(404);
      return res.json({
        message: "Spot couldn't be found",
        statusCode: 404
      })
    }

    const isSpotOwner = spot.ownerId === user.id;

    if (isSpotOwner) {
      const bookings = await spot.getBookings({
        attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt']
      });
      const bookingsJSON = JSON.parse(JSON.stringify(bookings))

      for (const booking of bookingsJSON) {
        const user = await User.findOne({
          attributes: ['id', 'firstName', 'lastName'], 
          where: booking.userId 
        });
        booking.User = user;
        booking.startDate = new Date(booking.startDate).toISOString().slice(0, 10); // format date output
        booking.endDate = new Date(booking.endDate).toISOString().slice(0, 10);
      }

      res.json({ Bookings: bookingsJSON })
    } else {
      const bookings = await spot.getBookings({
        attributes: ['spotId', 'startDate', 'endDate']
      });

      for (const booking of bookings) {
        booking.startDate = new Date(booking.startDate).toISOString().slice(0, 10); // format date output
        booking.endDate = new Date(booking.endDate).toISOString().slice(0, 10);
      }

      res.json({ Bookings: bookings })
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
);

// Create and return a new booking from a spot specified by id.
router.post(
  '/:spotId/bookings',
  requireAuth,
  async (req, res, next) => {
    const { user } = req;
    const userId = user.id;
    const { startDate, endDate } = req.body;
    const spotId = parseInt(req.params.spotId);
    const spot = await Spot.findByPk(spotId);

    // Return 404 Error if spot not found
    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: 404
      });
    }

    // Return 403 Not authorized Error if spot is OWNED by current user
    if (spot.ownerId === userId) {
      return res.status(401).json({
        message: "Forbidden",
        statusCode: 403
      });
    }

    try {
      // Create booking
      console.log('Creating booking with data:', { userId: req.user.id, spotId, startDate, endDate });
      const booking = await Booking.create({
        userId: req.user.id,
        spotId,
        startDate,
        endDate
      });
    } catch (error) {
      console.error('Error occurred when creating booking:', error);
      return res.status(500).json({
        message: "An unexpected error occurred",
        statusCode: 500
      });
    }

    try {
      // Validate startDate and endDate
      const validationErrors = await validateStartAndEndDates(startDate, endDate, spotId);
      if (validationErrors) {
        return res.status(400).json({
          message: "Validation error",
          statusCode: 400,
          errors: validationErrors
        });
      }
      // Create booking
      const booking = await Booking.create({
        userId: req.user.id,
        spotId,
        startDate: new Date(startDate.split('-').join('/')),
        endDate: new Date(endDate.split('-').join('/'))
      });
    
      res.status(200).json(booking);
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({
          message: "Validation error",
          statusCode: 400,
          errors: error.errors
        });
      } else if (error instanceof BookingError) {
        return res.status(400).json({
          message: "Sorry, this spot is already booked for the specified dates",
          statusCode: 403,
          errors: error.errors
        });
      } else {
        // Return 500 Internal Server Error for unexpected errors
        return res.status(500).json({
          message: "An unexpected error occurred",
          statusCode: 500
        });
      }
    }
  }
);





// Create and return a new spot
router.post(
  '/',
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
);

router.delete(
  '/:spotId',
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

    await spot.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: 200
    })
  }
)

module.exports = router;
