const mongoose = require("mongoose");

// Each physical room number tracks its own booked dates array.
// Atomic $addToSet on roomNumbers[].bookedDates prevents double booking.
const roomNumberSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  bookedDates: [{ type: Date, index: true }],
});

const roomSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Room title is required"],
      trim: true,
      maxlength: [100, "Title too long"],
    },
    description: {
      type: String,
      maxlength: [1000, "Description too long"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be positive"],
      index: true,
    },
    maxPeople: {
      type: Number,
      required: [true, "Max people is required"],
      min: 1,
      max: 20,
    },
    beds: {
      type: Number,
      default: 1,
      min: 1,
    },
    photos: [{ type: String }],
    amenities: [{ type: String }],
    roomNumbers: [roomNumberSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

roomSchema.index({ hotelId: 1, price: 1 });

module.exports = mongoose.model("Room", roomSchema);
