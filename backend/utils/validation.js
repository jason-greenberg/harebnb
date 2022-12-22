const { validationResult } = require('express-validator');
const { Booking } = require('../db/models');
const { Op } = require('sequelize');

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

// Custom error objects to be recognized in catch block of endpoint
class BookingError extends Error {
  constructor(errors) {
    super();
    this.errors = errors;
    this.name = 'BookingError';
  }
}
class ValidationError extends Error {
  constructor(errors) {
    super();
    this.errors = errors;
    this.name = 'ValidationError';
  }
}

async function validateStartAndEndDates(startDate, endDate, spotId) {
  const errors = {};
  // Check if startDate and endDate are in the future
  if (startDate < new Date()) {
    errors.startDate = 'Start date must be in the future';
  }
  if (endDate < new Date()) {
    errors.endDate = 'End date must be in the future';
  }

  // Check if startDate comes before endDate
  if (startDate >= endDate) {
    errors.endDate = 'endDate cannot come before startDate';
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError(errors);
  }

  // Check if the spot is available for the specified dates
  const existingBookings = await Booking.findAll({
    where: {
      spotId,
      [Op.or]: [
        {
          startDate: {
            [Op.lte]: endDate
          },
          endDate: {
            [Op.gte]: startDate
          }
        },
        {
          startDate: {
            [Op.lte]: startDate
          },
          endDate: {
            [Op.gte]: startDate
          }
        },
        {
          startDate: {
            [Op.lte]: endDate
          },
          endDate: {
            [Op.gte]: endDate
          }
        }
      ]
    }
  });
  if (existingBookings.length > 0) {
    let startDateConflict = false;
    let endDateConflict = false;
    for (const booking of existingBookings) {
      if (booking.startDate <= startDate && booking.endDate >= startDate) {
        startDateConflict = true;
      }
      if (booking.startDate <= endDate && booking.endDate >= endDate) {
        endDateConflict = true;
      }
    }
    if (startDateConflict && endDateConflict) {
      errors.startDate = 'Start date conflicts with an existing booking';
      errors.endDate = 'End date conflicts with an existing booking';
    } else if (startDateConflict) {
      errors.startDate = 'Start date conflicts with an existing booking';
    } else if (endDateConflict) {
      errors.endDate = 'End date conflicts with an existing booking';
    }
    throw new BookingError(errors);
  }
}


module.exports = {
  handleValidationErrors,
  validateStartAndEndDates,
  ValidationError,
  BookingError
};
