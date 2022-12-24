# HareBnB Project
## Description
Welcome to HareBnB, a vacation booking service designed specifically for bunnies and rabbits (and their humans)! Our platform allows users to search for and book bunny and rabbit-friendly properties, or list their own property for others to rent. With a user-friendly interface and a wide range of options to choose from, HareBnB makes it easy for bunny and rabbit lovers to find the perfect vacation spot. Whether you're looking to rent out your bunny-approved home or searching for the perfect getaway, HareBnB has you covered.

## Live Site
https://airbnb-api-project-0ykp.onrender.com/

## Backend Repository
https://github.com/jason-greenberg/authenticate-me-for-render-deployment

## Database Schema Design

![airbnb-dbdiagram]

[airbnb-dbdiagram]: ./backend/assets/harebnb_dbdiagram.png

## Screenshots
![search-spots]

[search-spots]: ./backend/assets/filter-spots-by-price-and-location.png

![see-your-bookings]

[see-your-bookings]: ./backend/assets/get-all-of-your-bookings.png

![leave-a-review]

[leave-a-review]: ./backend/assets/create-a-review.png

## Installation Instructions
There are no necessary dependencies to install for this project. Simply follow the [API documentation](./backend/API-documentation.md) to use the web-hosted API. No further set up is required.

## Technologies Used
• PostgreSQL

• Sequelize

• JavaScript

• SQL

• Express

## To-Dos/Future Features
1. Add the ability for hosts to set different pricing for different seasons or holidays.

2. Implement a review system for guests to leave feedback about their stay and for hosts to respond to reviews.

3. Add a payment gateway to allow users to securely pay for their bookings.

4. Implement a referral program to incentivize users to invite their friends to join the platform.
Add the ability for users to create and save lists of their favorite listings.

5. Implement a system for hosts to set house rules and for guests to confirm that they will abide by those rules before booking.

## Technical Implementation Details
The project is a full-stack web application that allows users to search and book parking spots. The frontend of the app is built using React, and the backend is built using Node.js and Express.js. The app uses a PostgreSQL database to store information about spots, users, bookings, and reviews.

The app has a secure authentication system that uses JSON Web Tokens (JWTs) to authenticate users. When a user logs in or signs up, the server generates a JWT and sends it back to the client. The client then stores the JWT in a cookie and sends it back to the server with every subsequent request that requires authentication. The server verifies the JWT and allows the request to proceed if it is valid.

One challenge we faced was efficiently querying the database to retrieve spots based on various filters and pagination options. To solve this, we used the findAll method of the Sequelize ORM, along with the where and limit options to filter and paginate the results. We also used the offset option to implement pagination by skipping a certain number of results based on the page number and page size.

Another challenge was implementing a robust booking system that allows users to book spots for specific dates and times. To solve this, we added a Booking model to the database and implemented routes and functions to create and cancel bookings. We also added validations to ensure that users can only book spots that are available for the specified dates and times.

Here is a code snippet showing the implementation of the POST route that allows users to create bookings:

```javascript
// Create and return a new booking from a spot specified by id.
router.post(
  '/:spotId/bookings',
  requireAuth,
  async (req, res, next) => {
    const { user } = req;
    const userId = user.id;
    const { startDate, endDate } = req.body;
    const spotId = parseInt(req.params.spotId);
    const spot = await Spot.findByPk(spotId);

    // Return 404 Error if spot not found
    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: 404
      });
    }

    // Return 403 Not authorized Error if spot is OWNED by current user
    if (spot.ownerId === userId) {
      return res.status(401).json({
        message: "Forbidden",
        statusCode: 403
      });
    }

    try {
      // Validate startDate and endDate
      await validateStartAndEndDates(startDate, endDate, spotId);
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({
          message: "Validation error",
          statusCode: 400,
          errors: error.errors
        });
      } else if (error instanceof BookingError) {
        return res.status(403).json({
          message: "Sorry, this spot is already booked for the specified dates",
          statusCode: 403,
          errors: error.errors
        });
      } else {
        // Return 500 Internal Server Error for unexpected errors
        return res.status(500).json({
          message: "An unexpected error occurred",
          statusCode: 500,
          error
        });
      }
    }

    try {
      // Create booking
      const booking = await Booking.create({
        userId,
        spotId,
        startDate,
        endDate
      });
      
      const mostRecentBooking = await Booking.findOne({
        where: {
          userId: user.id,
          spotId: spot.id
        },
        attributes: ['id', 'userId', 'spotId', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
        order: [
          ['createdAt', 'DESC']
        ],
        limit: 1
      });
      return res.status(201).json(mostRecentBooking);      
    } catch (error) {
      console.error('Error occurred when creating booking:', error);
      return res.status(500).json({
        message: "An unexpected error occurred",
        statusCode: 500,
        error
      });
    }
  }
);
```

## Best Practices
• Input validation: The code includes checks to validate the query parameters passed to the API. This helps prevent errors and ensure that the API is used correctly. It is a good practice to validate all user input to prevent malicious or incorrect data from being passed to the API.

• Query optimization: The code uses the limit and offset options in the findAll method to implement pagination and retrieve a specific number of results per page. This helps improve the performance of the API and reduce the load on the database. It is a good practice to use pagination and other query optimization techniques when working with large datasets.

• Async/await: The code uses the async/await syntax to handle asynchronous operations, such as querying the database. This helps improve the readability and maintainability of the code, as well as avoid callback hell. It is a good practice to use async/await when working with asynchronous code in Node.js.

• Sequelize ORM: The code uses the Sequelize ORM to interact with the database. Sequelize provides a convenient and intuitive way to query the database and map results to models. It is a good practice to use an ORM when working with a database, as it can help reduce the complexity of the code and improve maintainability.

• Model associations: The code uses model associations to define relationships between models in the database. For example, the Spot model has a hasMany association with the SpotImage model, indicating that a spot can have many images. Model associations can be used to simplify queries and improve performance by reducing the number of database calls needed. It is a good practice to use model associations to define relationships between models in the database.

• Error handling: The code includes try-catch blocks to handle errors and prevent the app from crashing. It is a good practice to handle errors properly to prevent unintended consequences and provide a better user experience.
