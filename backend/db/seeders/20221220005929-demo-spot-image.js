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
        url: 'https://www.flemishgiantrabbit.com/wp-content/uploads/2018/09/outdoor-rabbit-hutch.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://www.ruralking.com/media/catalog/product/7/d/7d005b89b167f190ec83c0b508cd2c5234c37357_62282_n.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://www.ruralking.com/media/catalog/product/8/0/806b90d3867309477f34bffb389ed9dc6d852ac2_62281_2.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://static.wixstatic.com/media/3a13fe_e899c21af5034757b4e338a67b47339d.jpg/v1/fill/w_800,h_536,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/3a13fe_e899c21af5034757b4e338a67b47339d.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://s3-ap-southeast-2.amazonaws.com/container-door-touch/marketing_images/images/40294/large/Pet_Hutch_-_Web1.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://www.coziwow.com/wp-content/uploads/2022/06/CW12F0417-cj1.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://i5.walmartimages.com/asr/eafc6d78-d887-412e-9fda-0e6d9c537114.8c9ea4cfb54584641d0404514f7329e4.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://www.coziwow.com/wp-content/uploads/2022/06/CW12F0417-cj2.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://www.coziwow.com/wp-content/uploads/2022/06/CW12F0417-zt1-1.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://secure.img1-fg.wfcdn.com/im/88796840/resize-h445%5Ecompr-r85/2326/232639748/Ciara-Lee+Rabbit+Hutch+With+4+Wheels.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://cdn.shopify.com/s/files/1/2181/3133/products/Rabbit-Hutch-Wooden-Bunny-Coop-Hen-House-Outdoor-Two-Story-Animal-Pet-cage-Garden-Backyard-with-Run-2-ColorsRedGray-and-White-B0894PGBTZ_2_1024x1024.jpg?v=1598256996',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://secure.img1-fg.wfcdn.com/im/31413429/resize-h445%5Ecompr-r85/1644/164489449/Burliegh+Weather+Resistant+Rabbit+with+Ramp.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://target.scene7.com/is/image/Target/GUEST_b6f176c2-f9b9-4d0a-a8bf-1ee734c07780?wid=725&hei=725&qlt=80&fmt=pjpeg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://m.media-amazon.com/images/S/aplus-media/sc/e58146ab-7935-4dbd-a7f9-c9c424882ab2.__CR0,0,300,300_PT0_SX220_V1___.png',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://m.media-amazon.com/images/S/aplus-media/sc/cc5777cb-be30-4ec6-836b-9186aa1181eb.__CR0,0,300,300_PT0_SX220_V1___.png',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i5.walmartimages.com/asr/199b4a26-86eb-4197-a454-1b013f14c86d.03915e60a67583308ff9f600b1358f5b.jpeg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://m.media-amazon.com/images/I/615LT0sqrML.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://m.media-amazon.com/images/I/81Rsbdf30sL.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://target.scene7.com/is/image/Target/GUEST_0e1eeaf0-0a5f-4d10-a370-b4e85a54302c?wid=825&hei=825&qlt=80&fmt=pjpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://target.scene7.com/is/image/Target/GUEST_e4ea0f17-903f-4f3d-a250-be99703734b7?wid=1000&hei=1000&qlt=80&fmt=webp',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://www.coopsandcages.com.au/wp-content/uploads/2019/09/Holly-Coops-and-Cages-Pet-Product-450x338.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://www.somerzby.com.au/wp-content/uploads/2020/03/Holly-Somerzby-Chicken-Coop.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://www.coopsandcages.com.au/wp-content/uploads/2019/09/Wire-Mesh-for-Security-and-Safety.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://www.coopsandcages.com.au/wp-content/uploads/2019/09/Lodge-Inside-Run-View.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://www.coopsandcages.com.au/wp-content/uploads/2019/09/Lodge-Sliding-Safety-Window.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://cdn.shopify.com/s/files/1/0627/5930/5406/products/8_8e143e11-9637-4054-be7e-5f0a023c47f6.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://m.media-amazon.com/images/I/81XVz+Bx4DL._AC_SX679_.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/aed3cef1-bd9e-4107-870b-c24408a4d7b5.__CR0,0,220,220_PT0_SX220_V1___.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/1d0a05f1-1740-40d9-9aad-ef7a77351218.__CR0,0,220,220_PT0_SX220_V1___.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://m.media-amazon.com/images/I/81GibKOuHUL.jpg',
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
