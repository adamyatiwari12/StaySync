const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    stayId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stay",
      required: true
    },

    roomNumber: {
      type: String,
      required: true
    },

    capacity: {
      type: Number,
      required: true
    },

    floor: Number,

    occupiedCount: {
      type: Number,
      default: 0
    },

    rentAmount: {
      type: Number,
      required: true
    },

    tenants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

roomSchema.index({ stayId: 1, roomNumber: 1 }, { unique: true });

module.exports = mongoose.model("Room", roomSchema);
