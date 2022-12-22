const { validationResult } = require('express-validator');
const { Booking } = require('../db/models');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};

async function validateStartAndEndDates(startDate, endDate, spotId) {
  // Check if the new booking's start date overlaps with any existing bookings for the same spot
  const existingBookingsStart = await Booking.findAll({
    where: {
      spotId,
      startDate: { [Op.lte]: startDate },
      endDate: { [Op.gte]: startDate }
    }
  });
  if (existingBookingsStart.length > 0) {
    throw new Error('Start date conflicts with an existing booking');
  }

  // Check if the new booking's end date overlaps with any existing bookings for the same spot
  const existingBookingsEnd = await Booking.findAll({
    where: {
      spotId,
      startDate: { [Op.lte]: endDate },
      endDate: { [Op.gte]: endDate }
    }
  });
  if (existingBookingsEnd.length > 0) {
    throw new Error('End date conflicts with an existing booking');
  }
}


module.exports = {
  handleValidationErrors,
  validateStartAndEndDates
};
