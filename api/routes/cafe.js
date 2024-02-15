const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/user');

const {
  addCafe,
  getCafes,
  updateCafe,
  singleCafe,
  userCafes,
  searchCafes
} = require('../controllers/cafeController');

router.route('/').get(getCafes);

// Protected routes (user must be logged in)
router.route('/add-cafe').post(isLoggedIn, addCafe);
router.route('/user-cafes').get(isLoggedIn, userCafes);
router.route('/update-cafe').put(isLoggedIn, updateCafe);

// Not Protected routed but sequence should not be interfered with above routes
router.route('/:id').get(singleCafe);
router.route('/search/:key').get(searchCafes)


module.exports = router;
