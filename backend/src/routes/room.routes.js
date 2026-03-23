const express = require('express');
const {createRoom,
    getRooms,
    getAvailableRooms,
    assignTenant,
    removeTenant,
    deleteRoom} = require('../controllers/room.controller');
const isAdmin = require('../middlewares/role.middleware');
const protect = require('../middlewares/auth.middleware');
const router = express.Router();

router.post("/", protect, isAdmin, createRoom);
router.get("/", protect, isAdmin, getRooms);
router.get("/available", protect, isAdmin, getAvailableRooms);
router.post("/assign", protect, isAdmin, assignTenant);
router.post("/remove", protect, isAdmin, removeTenant);
router.delete("/:id", protect, isAdmin, deleteRoom);

module.exports = router;
