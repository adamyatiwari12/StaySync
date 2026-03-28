const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    stayId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stay",
      required: true,
      index: true
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

    amount: {
      type: Number,
      required: true
    },

    month: {
      type: Number, // 1–12
      required: true
    },

    year: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending"
    },

    paidAt: {
      type: Date,
      default: null
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "upi", "bank_transfer", "razorpay", "manual"],
      default: "cash"
    }
  },
  { timestamps: true }
);

paymentSchema.index(
  { stayId: 1, tenantId: 1, month: 1, year: 1 },
  { unique: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
