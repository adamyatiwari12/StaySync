const express = require("express");
const router = express.Router();
const bootstrap = require("../controllers/bootstrap.controller");

router.post("/", bootstrap);

module.exports = router;
