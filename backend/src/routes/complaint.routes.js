const express = require("express");
const router = express.Router();
const { getAllComplaints, updateComplaintStatus, createComplaint, getMyComplaints } = require("../controllers/complaint.controller");
const protect = require("../middlewares/auth.middleware") 
const isAdmin = require("../middlewares/role.middleware")   

router.get("/", protect, isAdmin, getAllComplaints);
router.put("/:id/status", protect, isAdmin, updateComplaintStatus);
router.post("/", protect, createComplaint); 
router.get("/my", protect, getMyComplaints);    

module.exports = router;