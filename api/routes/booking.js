const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/user');

const {
  createBookings,
  getBookings,
  getAllBookings,
  getSingleBooking
} = require('../controllers/bookingController');

// Protected routes (user must be logged in)
router.route('/').get(isLoggedIn, getBookings).post(isLoggedIn, createBookings);
router.route('/all').get(isLoggedIn, getAllBookings);
router.route('/get').post(isLoggedIn, getSingleBooking);

module.exports = router;
