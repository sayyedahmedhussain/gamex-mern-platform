const express = require("express");
const router = express.Router();
const createSectionController = require("../controllers/sectionController");

const Navbar             = require("../models/Navbar");
const Hero                = require("../models/Hero");
const GameSection          = require("../models/GameSection");
const ServicesSection      = require("../models/ServicesSection");
const GrowthSection        = require("../models/GrowthSection");
const AchievementSection   = require("../models/AchievementSection");
const DirectorMessage      = require("../models/DirectorMessage");
const PartnersSection      = require("../models/PartnersSection");
const Footer                = require("../models/Footer");
const MovingGamesSection    = require("../models/MovingGamesSection");
const MemorySection          = require("../models/MemorySection");

const sections = {
  navbar:       createSectionController(Navbar),
  hero:         createSectionController(Hero),
  gamesection:  createSectionController(GameSection),
  services:     createSectionController(ServicesSection),
  growth:       createSectionController(GrowthSection),
  achievement:  createSectionController(AchievementSection),
  director:     createSectionController(DirectorMessage),
  partners:     createSectionController(PartnersSection),
  footer:       createSectionController(Footer),
  movinggames:  createSectionController(MovingGamesSection),
  memory:       createSectionController(MemorySection),
};

// Public read-only routes — GET /api/sections/<name>
// Used by the public-facing website to fetch live content.
Object.entries(sections).forEach(([name, ctrl]) => {
  router.get(`/${name}`, ctrl.get);
});

module.exports = router;
