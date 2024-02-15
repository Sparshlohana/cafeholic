const Cafe = require('../models/Cafe');

// Adds a Cafe in the DB
exports.addCafe = async (req, res) => {
  try {
    const userData = req.user;
    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      maxGuests,
      price,
    } = req.body;
    const Cafe = await Cafe.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      maxGuests,
      price,
    });
    res.status(200).json({
      Cafe,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
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
    const Cafes = await Cafe.find();
    res.status(200).json({
      Cafes,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Returns single Cafe, based on passed Cafe id
exports.singleCafe = async (req, res) => {
  try {
    const { id } = req.params;
    const Cafe = await Cafe.findById(id);
    if (!Cafe) {
      return res.status(400).json({
        message: 'Cafe not found',
      });
    }
    res.status(200).json({
      Cafe,
    });
  } catch (err) {
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