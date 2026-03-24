const Complaint = require("../models/Complaint");
const User = require("../models/User");

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      code: req.user.code
    })
      .populate("tenantId", "name email")
      .populate("roomId", "roomNumber floor")
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!["open", "in_progress", "resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const complaint = await Complaint.findOne({
      _id: id,
      code: req.user.code
    });

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status;
    complaint.resolvedAt = status === "resolved" ? new Date() : null;

    await complaint.save();

    res.json({ message: "Complaint updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createComplaint = async (req, res) => {
  try {
    const { category, description } = req.body;

    if (!category || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const tenant = await User.findOne({
      _id: req.user.userId,
      code: req.user.code
    });

    if (!tenant || tenant.role !== "tenant") {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!tenant.roomId) {
      return res.status(400).json({
        message: "You are not assigned to any room"
      });
    }

    const complaint = await Complaint.create({
      tenantId: tenant._id,
      roomId: tenant.roomId,
      category,
      description,
      code: req.user.code
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      tenantId: req.user.userId,
      code: req.user.code
    })
      .populate("roomId", "roomNumber floor")
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllComplaints,
  updateComplaintStatus,
  createComplaint,
  getMyComplaints
};
