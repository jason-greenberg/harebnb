'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'image-url-1',
        preview: true
      },
      {
        spotId: 1,
        url: 'image-url-2',
        preview: false
      },
      {
        spotId: 2,
        url: 'image-url-3',
        preview: true
      },
      {
        spotId: 2,
        url: 'image-url-4',
        preview: false
      },
      {
        spotId: 3,
        url: 'image-url-5',
        preview: true
      },
      {
        spotId: 3,
        url: 'image-url-6',
        preview: false
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
