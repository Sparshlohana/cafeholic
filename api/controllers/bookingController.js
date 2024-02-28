const Booking = require('../models/Booking');
const Cafe = require('../models/Cafe');

// Books a place
exports.createBookings = async (req, res) => {
  try {
    const userData = req.user;
    const { place, checkIn, checkOut, numOfGuests, name, phone, price } =
      req.body;

    const booking = await Booking.create({
      user: userData.id,
      place,
      checkIn,
      checkOut,
      numOfGuests,
      name,
      phone,
      price,
    });

    res.status(200).json({
      booking,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

// Returns user specific bookings
exports.getBookings = async (req, res) => {
  try {
    const userData = req.user;
    if (!userData) {
      return res
        .status(401)
        .json({ error: 'You are not authorized to access this page!' });
    }

    const booking = await Booking.find({ user: userData.id }).populate('place')

    res
      .status(200).json({ booking, success: true })


  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const userData = req.user;

    if (!userData) {
      return res.status(401).json({ error: 'You are not authorized to access this page!' });
    }

    let bookings;

    if (userData.role === 'admin') {
      // If user role is admin, fetch all bookings
      bookings = await Booking.find().populate('user').populate('place');
    } else if (userData.role === 'vendor') {
      // If user role is vendor, fetch bookings for the vendor's cafes
      const cafes = await Cafe.find({ owner: userData.id });
      const cafeIds = cafes.map(cafe => cafe._id);
      bookings = await Booking.find({ place: { $in: cafeIds } }).populate('user').populate('place');
    } else {
      // For other user roles, return an empty array (or handle as needed)
      bookings = [];
    }

    res.status(200).json({ bookings, success: true });
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

// create a new api for getting single booking by id

exports.getSingleBooking = async (req, res) => {
  try {
    const userData = req.user;
    const { id } = req.body;
    if (!userData) {
      return res.status(401).json({ error: 'You are not authorized to access this page!' });
    }

    const booking = await Booking.findById(id).populate('place');

    res.status(200).json({ booking, success: true });

  } catch (err) {
    console.error('Error fetching single booking:', err);
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};
