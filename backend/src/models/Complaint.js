const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    stayId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stay",
      required: true
    },

    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true
    },

    category: String,

    description: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["open", "in_progress", "resolved"],
      default: "open"
    },

    resolvedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
