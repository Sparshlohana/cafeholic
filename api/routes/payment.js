const router = require('express').Router();
const { isLoggedIn } = require('../middlewares/user');

const {
    createOrder,
    verifyPayment,
} = require('../controllers/paymentController');

// Protected routes (user must be logged in)
router.route('/order').post(isLoggedIn, createOrder);
router.route('/verify').post(isLoggedIn, verifyPayment);

module.exports = router;