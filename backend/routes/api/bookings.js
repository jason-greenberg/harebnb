const router = require('express').Router();
const { requireAuth, restoreUser } = require('../../utils/auth');
const { Booking, Spot, User } = require('../../db/models');
const sequelize = require('sequelize');

// Get all bookings for a spot based on the spot's id
router.get(
  '/:spotId/bookings',
  requireAuth,
  async (req, res, next) => {
    const { user } = req;
    const spotId = parseInt(req.params.spotId);
    const spot = await Spot.findByPk(spotId);
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
        console.log(user);
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

// Get all of the current user's bookings
router.get(
  '/current',
  requireAuth,
  async (req, res, next) => {
    const { user } = req;
    const userId = user.id;
    const bookings = await Booking.findAll({ attributes: ['id', 'userId', 'spotId', 'startDate', 'endDate', 'createdAt', 'updatedAt'], where: { userId } });
    const bookingsJSON =  JSON.parse(JSON.stringify(bookings));
    
    for (const booking of bookingsJSON) {
      const spot = await Spot.scope('bookingView').findOne({ where: { id: booking.spotId } });
      const previewImage = await spot.getSpotImages();
      const spotJSON = spot.toJSON();
      spotJSON.previewImage = previewImage[0].url;
      booking.Spot = spotJSON;
      booking.startDate = new Date(booking.startDate).toISOString().slice(0, 10); // format date output
      booking.endDate = new Date(booking.endDate).toISOString().slice(0, 10);
    }

    const response = bookingsJSON.map(booking => ({
      id: booking.id,
      spotId: booking.spotId,
      Spot: booking.Spot,
      userId: booking.userId,
      startDate: booking.startDate,
      endDate: booking.endDate,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    }))

    res.json({ Bookings: response });
  }
);



module.exports = router;
