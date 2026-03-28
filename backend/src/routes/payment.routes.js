const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth.middleware");

const {
  createPayment,
  markPaymentAsPaid,
  getMyPayments,
  getAllPayments,
  deletePayment,
  createRazorpayOrder,
  verifyRazorpayPayment,
} = require("../controllers/payment.controller");

router.post("/", protect, createPayment);
router.patch("/:id/pay", protect, markPaymentAsPaid);
router.get("/", protect, getAllPayments);
router.delete("/:id", protect, deletePayment);

router.get("/me", protect, getMyPayments);

router.post("/:id/razorpay/order", protect, createRazorpayOrder);
router.post("/razorpay/verify", protect, verifyRazorpayPayment);

module.exports = router;
