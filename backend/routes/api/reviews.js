const router = require('express').Router();
const { requireAuth } = require('../../utils/auth');
const { Booking, Spot, User, Review, ReviewImage } = require('../../db/models');
const sequelize = require('sequelize');

// Return all reviews written by the current user
router.get(
  '/current',
  requireAuth,
  async (req, res, next) => {
    const user = req.user;
    const userId = user.id;

    const reviews = await Review.findAll({
      attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt'],
      where: {
        userId
      }
    });
    const reviewsJSON = JSON.parse(JSON.stringify(reviews));

    for (const review of reviewsJSON) {
      const spot = await Spot.scope('bookingView').findOne({ where: { id: review.spotId } });
      const previewImage = await spot.getSpotImages();
      const spotJSON = spot.toJSON();
      spotJSON.previewImage = previewImage[0].url;
      review.Spot = spotJSON;
      review.User = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName
      }
      review.ReviewImages = await ReviewImage.scope('getReviewsView').findAll({
        where: { reviewId: review.id }
      });
    }

    res.json({ Reviews: reviewsJSON });
  }
);

module.exports = router;
