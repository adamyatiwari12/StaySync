const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth.middleware");

const {
  createPayment,
  markPaymentAsPaid,
  getMyPayments,
  getAllPayments,
  deletePayment,
} = require("../controllers/payment.controller");

router.get("/me", protect, getMyPayments);

router.post("/", protect, createPayment);
router.get("/", protect, getAllPayments);
router.delete("/:id", protect, deletePayment);

router.patch("/:id/pay", protect, markPaymentAsPaid);

module.exports = router;