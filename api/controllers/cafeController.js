const Cafe = require('../models/Cafe');
const User = require('../models/User');

// Adds a Cafe in the DB
exports.addCafe = async (req, res) => {
  const userData = req.user;
  try {
    const {
      title,
      address,
      addedPhotos,
      description,
      categories,
      perks,
      extraInfo,
      maxGuests,
      price,
      userRole,
    } = req.body;

    // Determine the value of 'request' based on userRole
    const request = userRole === 'admin' ? false : true;

    console.log(request);

    const cafe = await Cafe.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      category: categories,
      perks,
      extraInfo,
      maxGuests,
      price,
      requested: request,
    });

    res.status(200).json({
      cafe,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      error: err,
    });
  }
};



// Returns user specific Cafes
exports.userCafes = async (req, res) => {
  try {
    const userData = req.user;
    const id = userData.id;
    res.status(200).json(await Cafe.find({ owner: id }));
  } catch (err) {
    res.status(500).json({
      message: 'Internal serever error',
    });
  }
};

// Updates a Cafe
exports.updateCafe = async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData.id;
    const {
      id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      maxGuests,
      price,
    } = req.body;

    const Cafe = await Cafe.findById(id);
    if (userId === Cafe.owner.toString()) {
      Cafe.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        maxGuests,
        price,
      });
      await Cafe.save();
      res.status(200).json({
        message: 'Cafe updated!',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

// Returns all the Cafes in DB
exports.getCafes = async (req, res) => {
  try {
    const approvedCafes = await Cafe.find({ approved: true });
    res.status(200).json({
      Cafes: approvedCafes,
    });
  } catch (err) {
    console.error('Error fetching approved cafes:', err);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};


// Returns single Cafe, based on passed Cafe id
exports.singleCafe = async (req, res) => {
  try {
    const { id } = req.params;
    const cafe = await Cafe.findById(id);

    if (!cafe) {
      return res.status(400).json({
        message: 'Cafe not found',
      });
    }
    res.status(200).json({
      cafe,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal serever error',
    });
  }
};

// Search Cafes in the DB
exports.searchCafes = async (req, res) => {
  try {
    const searchword = req.params.key;

    if (searchword === '') return res.status(200).json(await Cafe.find())

    const searchMatches = await Cafe.find({ address: { $regex: searchword, $options: "i" } })

    res.status(200).json(searchMatches);
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Internal serever error 1',
    });
  }
}

exports.requestedCafes = async (req, res) => {
  try {
    const requestedCafes = await Cafe.find({ requested: true });

    res.status(200).json({
      cafes: requestedCafes,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.approveRejectCafe = async (req, res) => {
  try {
    const { cafeId, approve } = req.body;

    if (approve === undefined || typeof approve !== 'boolean') {
      return res.status(400).json({ message: 'Invalid approve value' });
    }

    const updatedCafe = await Cafe.findByIdAndUpdate(
      cafeId,
      { approved: approve, requested: false },
      { new: true }
    );

    if (!updatedCafe) {
      return res.status(404).json({ message: 'Cafe not found' });
    }

    // Fetch the user associated with the cafe (assuming the owner of the cafe)
    const cafeOwner = await User.findOne({ _id: updatedCafe.owner });

    if (approve && cafeOwner && cafeOwner.role === 'common') {
      // If approved, user found, and user role is 'common', update the user's role to 'vendor'
      await User.findByIdAndUpdate(cafeOwner._id, { role: 'vendor' });
    }

    res.status(200).json({ cafe: updatedCafe });
  } catch (error) {
    console.error('Error updating approval status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


