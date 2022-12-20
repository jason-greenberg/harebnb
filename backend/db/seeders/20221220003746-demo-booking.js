'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings'
    return queryInterface.bulkInsert(options, [
    {
      userId: 1,
      spotId: 1,
      startDate: '2022-12-20',
      endDate: '2022-12-22'
    },
    {
      userId: 2,
      spotId: 2,
      startDate: '2022-12-23',
      endDate: '2022-12-25'
    },
    {
      userId: 3,
      spotId: 3,
      startDate: '2022-12-26',
      endDate: '2022-12-28'
    },
  ], {});
  },
  
  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
