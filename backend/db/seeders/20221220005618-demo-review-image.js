'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'review-image-1.jpg'
      },
      {
        reviewId: 1,
        url: 'review-image-2.jpg'
      },
      {
        reviewId: 2,
        url: 'review-image-3.jpg'
      },
      {
        reviewId: 3,
        url: 'review-image-4.jpg'
      },
      {
        reviewId: 3,
        url: 'review-image-5.jpg'
      },
      {
        reviewId: 4,
        url: 'review-image-6.jpg'
      },
      {
        reviewId: 4,
        url: 'review-image-7.jpg'
      },
      {
        reviewId: 4,
        url: 'review-image-8.jpg'
      },
      {
        reviewId: 5,
        url: 'review-image-9.jpg'
      },
      {
        reviewId: 5,
        url: 'review-image-10.jpg'
      },
      {
        reviewId: 6,
        url: 'review-image-11.jpg'
      }
    ], {});
  },
  
  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
