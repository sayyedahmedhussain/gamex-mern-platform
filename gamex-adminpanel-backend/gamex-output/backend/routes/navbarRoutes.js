const express = require("express");
const router = express.Router();
const createSectionController = require("../controllers/sectionController");
const Navbar = require("../models/Navbar");

// Legacy public endpoint kept for backward compatibility — GET /api/navbar
const ctrl = createSectionController(Navbar);

router.get("/", ctrl.get);

module.exports = router;
