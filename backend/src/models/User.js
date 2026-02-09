const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    }, 

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["admin", "tenant", "super_admin"],
      default: "tenant"
    },

    phone: String,

    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
