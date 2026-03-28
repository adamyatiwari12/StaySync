const Payment = require("../models/Payment");
const razorpay = require("../config/razorpay");
const crypto = require("crypto");

const createPayment = async (req, res) => {
  try {
    const { tenantId, roomId, amount, month, year } = req.body;

    const payment = await Payment.create({
      stayId: req.user.stayId,
      tenantId,
      roomId,
      amount,
      month,
      year,
    });

    res.status(201).json(payment);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Payment already exists for this month",
      });
    }
    res.status(500).json({ message: "Failed to create payment" });
  }
};

const getMyPayments = async (req, res) => {
  const payments = await Payment.find({
    stayId: req.user.stayId,
    tenantId: req.user.userId,
  })
    .populate("roomId", "roomNumber")
    .sort({ year: -1, month: -1 });

  res.json(payments);
};

const getAllPayments = async (req, res) => {
  const payments = await Payment.find({
    stayId: req.user.stayId,
  })
    .populate("tenantId", "username email")
    .populate("roomId", "roomNumber")
    .sort({ year: -1, month: -1 });

  res.json(payments);
};

const markPaymentAsPaid = async (req, res) => {
  const payment = await Payment.findOne({
    _id: req.params.id,
    stayId: req.user.stayId,
  });

  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }

  payment.status = "paid";
  payment.paidAt = new Date();
  payment.paymentMethod = "manual";

  await payment.save();
  res.json(payment);
};

const deletePayment = async (req, res) => {
  const payment = await Payment.findOneAndDelete({
    _id: req.params.id,
    stayId: req.user.stayId,
  });

  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }

  res.json({ message: "Payment deleted" });
};

  const createRazorpayOrder = async (req, res) => {
  try {
    const payment = await Payment.findOne({
      _id: req.params.id,
      stayId: req.user.stayId,
      status: "pending",
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const order = await razorpay.orders.create({
      amount: payment.amount * 100,
      currency: "INR",
      receipt: `receipt_${payment._id}`,
    });

    payment.razorpayOrderId = order.id;
    await payment.save();

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};


module.exports = {
  createPayment,
  getMyPayments,
  getAllPayments,
  markPaymentAsPaid,
  deletePayment,
  createRazorpayOrder,
};
