const express = require("express");
const { getTenants, getProfile, updateProfile, changePassword } = require("../controllers/user.controller");
const protect = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/role.middleware");

const router = express.Router();

router.get("/tenants", protect, isAdmin, getTenants);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/password", protect, changePassword);

module.exports = router;
