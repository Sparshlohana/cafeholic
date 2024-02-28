const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/user');

const {
  createBookings,
  getBookings,
  getAllBookings
} = require('../controllers/bookingController');

// Protected routes (user must be logged in)
router.route('/').get(isLoggedIn, getBookings).post(isLoggedIn, createBookings);
router.route('/all').get(isLoggedIn, getAllBookings);

module.exports = router;
