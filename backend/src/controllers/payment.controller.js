const Payment = require("../models/Payment");

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
    tenantId: req.user.userId,
  });

  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }

  if (payment.status === "paid") {
    return res.json({ message: "Already paid" });
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

module.exports = {
  createPayment,
  getMyPayments,
  getAllPayments,
  markPaymentAsPaid,
  deletePayment,
};