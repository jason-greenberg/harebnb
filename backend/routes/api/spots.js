const router = require('express').Router();
const { query } = require('express');
const { Spot } = require('../../db/models');
const { requireAuth, restoreUser } = require('../../utils/auth');

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
)

// Return all spots
router.get(
  '/',
  async (req, res, next) => {
    const allSpots = await Spot.findAll();

    res.json({Spots: allSpots});
});

module.exports = router;
