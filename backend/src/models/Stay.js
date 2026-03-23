const mongoose = require("mongoose");

const staySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    address: String,
    type: {
      type: String,
      enum: ["pg", "hostel", "apartment"],
      default: "pg",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Stay", staySchema);
