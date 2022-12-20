const router = require('express').Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// ...
const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a first name'),
  check('lastName')
    .exists({ checkFalsy: true})
    .withMessage('Please provide a last name'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    try {
      const user = await User.signup({ firstName, lastName, email, username, password });
      await setTokenCookie(res, user);
      const userJSON = user.toJSON()
      userJSON.token = req.headers['xsrf-token'];
      return res.json({
        user: userJSON
      });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(403)
        if (error.fields.includes('email')) {
          return res.json({
            message: 'User already exists',
            statusCode: 403,
            errors: {
              email: "User with that email already exists"
            }
          });
        }
        if (error.fields.includes('username')) {
          return res.json({
            message: 'User already exists',
            statusCode: 403,
            errors: {
              username: "User with that username already exists"
            }
          });
        }
      }
      res.status(500)
      return res.json({
        message: 'Server error',
      });
    }
  }
);

module.exports = router;

module.exports = router;
