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
      startDate: new Date(2023, 0, 5, 16).toISOString().slice(0,10),
      endDate: new Date(2023, 0, 7, 11).toISOString().slice(0,10)
    },
    {
      userId: 2,
      spotId: 2,
      startDate: new Date(2023, 0, 6, 16).toISOString().slice(0,10),
      endDate: new Date(2023, 0, 8, 11).toISOString().slice(0,10)
    },
    {
      userId: 3,
      spotId: 2,
      startDate: new Date(2023, 0, 12, 16).toISOString().slice(0,10),
      endDate: new Date(2023, 0, 15, 11).toISOString().slice(0,10)
    },
    {
      userId: 2,
      spotId: 1,
      startDate: new Date(2023, 0, 9, 16).toISOString().slice(0,10),
      endDate: new Date(2023, 0, 11, 11).toISOString().slice(0,10)
    },
    {
      userId: 3,
      spotId: 3,
      startDate: new Date(2023, 0, 7, 16).toISOString().slice(0,10),
      endDate: new Date(2023, 0, 9, 11).toISOString().slice(0,10)
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
