'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 1,
        review: 'Great spot! Loved the basket-weaving classes.',
        stars: 5
      },
      {
        userId: 2,
        spotId: 2,
        review: 'Comfortable and convenient location.',
        stars: 4
      },
      {
        userId: 3,
        spotId: 3,
        review: 'Charming and cozy home. Would stay again.',
        stars: 4
      },
      {
        userId: 2,
        spotId: 1,
        review: 'I had a great time here! The basket-weaving classes were so much fun.',
        stars: 5
      },
      {
        userId: 2,
        spotId: 2,
        review: 'This was a great place to stay. The location was convenient and the home was comfortable.',
        stars: 4
      },
      {
        userId: 2,
        spotId: 3,
        review: 'I loved staying at this cozy home. It was charming and I would definitely stay here again.',
        stars: 4
      },
  ], {});
},

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
