const mongoose = require("mongoose");

const cafeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photos: [{ type: String }],
  description: {
    type: String,
  },
  extraInfo: {
    type: String,
  },
  maxGuests: {
    type: Number,
  },
  price: {
    type: Number,
  },
  category: [{
    type: String,
    enum: ["Aesthetic Café", "Rooftop Café", "Family Café", "Party Café", "Café for Work", "Couple Café", "Celebration Café", "Franchise Café", "Hidden Café", "Unique Café", "Pocket-friendly Café", "Food-focused Café"],
    required: true,
  }],
  requested: {
    type: Boolean,
    default: false,
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

const Cafe = mongoose.model("Cafe", cafeSchema);

module.exports = Cafe;
