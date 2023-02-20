# HareBnB Project
## Description
Welcome to HareBnB, a vacation booking service designed specifically for bunnies and rabbits (and their humans)! Our platform allows users to search for and book bunny and rabbit-friendly properties, or list their own property for others to rent. With a user-friendly interface and a wide range of options to choose from, HareBnB makes it easy for bunny and rabbit lovers to find the perfect vacation spot. Whether you're looking to rent out your bunny-approved home or searching for the perfect getaway, HareBnB has you covered.

## Live Site
https://harebnb.onrender.com/

## Backend Repository
https://github.com/jason-greenberg/harebnb/tree/main/backend

## Frontend Repository
https://github.com/jason-greenberg/harebnb/tree/main/frontend

## Technologies Used
Frontend:
- React-Redux

Backend:
- Node.js
- Express.js
- Sequelize
- PostgreSQL

## **Prerequisites**
Before you begin, you will need to implement the following environmental variables using a .env file or Render.com's built-in Environmental Variables tab:
```java
DATABASE_URL
JWT_EXPIRES_IN
JWT_SECRET
NODE_ENV //(eg. production or development)
SCHEMA // (for the database config, eg. 'airbnb_data')
```
## **Build**
To install and build the front and backend, run the following command:
```bash
npm install &&
npm run render-postbuild &&
npm run build &&
npm run sequelize --prefix backend db:migrate &&
npm run sequelize --prefix backend db:seed:all
```
The API comes seeded with 3 demo users, 6 spots, several reviews, images, and bookings for testing purposes. The build command sequence will migrate the all tables and seed them.
## **Start**
To start the application, run the following command:
```bash
npm start
```

## API Documentation
Found here: [API documentation](./backend/API-documentation.md)

## Database Schema Design

![airbnb-dbdiagram]

[airbnb-dbdiagram]: ./backend/assets/harebnb_dbdiagram.png

## Screenshots
### Landing Page
![landing-page]

[landing-page]: ./frontend/public/assets/landing-page.png
The landing page serves as the first point of contact with the HareBnB website. The page includes a list of all spots currently listed on the platform. The page also has a login and sign-up button (in the user dropdown menu) for users to create or access their account. As well as a 'Create a New Spot' link for logged-in users.

### Create Spot Page
![create-spot]

[create-spot]: ./frontend/public/assets/create-spot.png
The "Create a new Spot" page allows users to list their properties for rent. The page features a user-friendly form with fields for property details such as location, description, and photos. Users can also set the pricing of their property.

### Spot Details Page
![spot-details]

[spot-details]: ./frontend/public/assets/spot-details.png
The "Spot Details" page provides users with a detailed view of a property that they are interested in renting. The page includes information about the location and description, as well as photos of the property. Users can also see reviews from previous guests and leave their own reviews of the property.

### Manage Spots Page
![manage-spots]

[manage-spots]: ./frontend/public/assets/manage-spots.png
The "Manage Spots" page allows users to view and edit the properties they have listed for rent. The page features a list of properties, each with their own thumbnail image and basic details. Users can click on each property to edit its details and pricing, or delete the listing altogether.

## To-Dos/Future Features
1. Add the ability for hosts to set different pricing for different seasons or holidays.

2. Implement a review system for guests to leave feedback about their stay and for hosts to respond to reviews.

3. Add a payment gateway to allow users to securely pay for their bookings.

4. Implement a referral program to incentivize users to invite their friends to join the platform.
Add the ability for users to create and save lists of their favorite listings.

5. Implement a system for hosts to set house rules and for guests to confirm that they will abide by those rules before booking.

## Technical Implementation Details
The project is a full-stack web application that allows users to search and book parking spots. The frontend of the app is built using React-Redux, and the backend is built using Node.js and Express.js. The app uses a PostgreSQL database to store information about spots, users, bookings, and reviews.

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
