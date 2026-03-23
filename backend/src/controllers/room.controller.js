const User = require("../models/User");
const Room = require("../models/Room");

const createRoom = async (req, res) => {
  try {
    const { roomNumber, floor, capacity, rentAmount } = req.body;

    if (!roomNumber || !floor || !capacity || !rentAmount) {
      return res.status(400).json({
        message: "Room number, floor, capacity, and rent amount are required"
      });
    }

    const existingRoom = await Room.findOne({
      roomNumber,
      stayId: req.user.stayId
    });

    if (existingRoom) {
      return res.status(409).json({ message: "Room already exists" });
    }

    const room = await Room.create({
      roomNumber,
      floor,
      capacity,
      rentAmount,
      tenants: [],
      occupiedCount: 0,
      isAvailable: true,
      stayId: req.user.stayId
    });

    res.status(201).json({
      message: "Room created successfully",
      room
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({
      stayId: req.user.stayId
    }).populate("tenants", "username email");

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAvailableRooms = async (req, res) => {
  try {
    const rooms = await Room.find({
      stayId: req.user.stayId,
      isAvailable: true
    }).populate("tenants", "username email");

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const assignTenant = async (req, res) => {
  try {
    const { roomId, tenantId } = req.body;

    const room = await Room.findOne({
      _id: roomId,
      stayId: req.user.stayId
    });

    const tenant = await User.findOne({
      _id: tenantId,
      stayId: req.user.stayId
    });

    if (!room || !tenant) {
      return res.status(404).json({ message: "Room or tenant not found" });
    }

    if (room.occupiedCount >= room.capacity) {
      return res.status(400).json({ message: "Room is already full" });
    }

    if (tenant.roomId) {
      return res.status(400).json({ message: "Tenant already has a room" });
    }

    room.tenants.push(tenant._id);
    room.occupiedCount += 1;
    room.isAvailable = room.occupiedCount < room.capacity;

    tenant.roomId = room._id;

    await room.save();
    await tenant.save();

    res.json({ message: "Tenant assigned successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const removeTenant = async (req, res) => {
  try {
    const { tenantId } = req.body;

    const tenant = await User.findOne({
      _id: tenantId,
      stayId: req.user.stayId
    });

    if (!tenant || !tenant.roomId) {
      return res.status(404).json({
        message: "Tenant or assigned room not found"
      });
    }

    const room = await Room.findOne({
      _id: tenant.roomId,
      stayId: req.user.stayId
    });

    room.tenants = room.tenants.filter(
      tid => tid.toString() !== tenantId
    );

    room.occupiedCount -= 1;
    room.isAvailable = true;

    tenant.roomId = null;

    await room.save();
    await tenant.save();

    res.json({ message: "Tenant removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await Room.findOne({
      _id: id,
      stayId: req.user.stayId
    });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (room.occupiedCount > 0) {
      return res.status(400).json({ 
        message: "Cannot delete room with assigned tenants. Please remove tenants first." 
      });
    }

    await Room.findByIdAndDelete(id);

    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createRoom,
  getRooms,
  getAvailableRooms,
  assignTenant,
  removeTenant,
  deleteRoom
};
