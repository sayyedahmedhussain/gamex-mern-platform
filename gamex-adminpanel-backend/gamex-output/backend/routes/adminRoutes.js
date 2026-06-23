const express = require("express");
const router = express.Router();
const createSectionController = require("../controllers/sectionController");
const createRestoreController  = require("../controllers/restoreController");
const { protect } = require("../middleware/authMiddleware");

const Navbar             = require("../models/Navbar");
const Hero               = require("../models/Hero");
const GameSection        = require("../models/GameSection");
const ServicesSection    = require("../models/ServicesSection");
const GrowthSection      = require("../models/GrowthSection");
const AchievementSection = require("../models/AchievementSection");
const DirectorMessage    = require("../models/DirectorMessage");
const PartnersSection    = require("../models/PartnersSection");
const Footer             = require("../models/Footer");
const MovingGamesSection = require("../models/MovingGamesSection");
const MemorySection      = require("../models/MemorySection");

// Map section name → { model, controller }
const sections = {
  navbar:      { model: Navbar,             ctrl: createSectionController(Navbar)             },
  hero:        { model: Hero,               ctrl: createSectionController(Hero)               },
  gamesection: { model: GameSection,        ctrl: createSectionController(GameSection)        },
  services:    { model: ServicesSection,    ctrl: createSectionController(ServicesSection)    },
  growth:      { model: GrowthSection,      ctrl: createSectionController(GrowthSection)      },
  achievement: { model: AchievementSection, ctrl: createSectionController(AchievementSection) },
  director:    { model: DirectorMessage,    ctrl: createSectionController(DirectorMessage)    },
  partners:    { model: PartnersSection,    ctrl: createSectionController(PartnersSection)    },
  footer:      { model: Footer,             ctrl: createSectionController(Footer)             },
  movinggames: { model: MovingGamesSection, ctrl: createSectionController(MovingGamesSection) },
  memory:      { model: MemorySection,      ctrl: createSectionController(MemorySection)      },
};

// All admin routes require a valid JWT
router.use(protect);

// Register CRUD + restore routes for each section
Object.entries(sections).forEach(([name, { model, ctrl }]) => {
  router.get   (`/${name}`,                  ctrl.get);
  router.post  (`/${name}`,                  ctrl.create);
  router.put   (`/${name}`,                  ctrl.update);
  router.delete(`/${name}`,                  ctrl.delete);

  // POST /api/admin/:section/restore-default
  // Overwrites DB with the original hardcoded HTML defaults
  router.post(`/${name}/restore-default`, createRestoreController(model, name));
});

module.exports = router;
