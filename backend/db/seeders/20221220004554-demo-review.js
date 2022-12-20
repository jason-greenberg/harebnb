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
