const defaultData = require("../seed/defaultData");

/**
 * Returns an Express route handler that restores `model` to its
 * default data for the given `sectionKey`.
 *
 * @param {import("mongoose").Model} model      - Mongoose model
 * @param {string}                   sectionKey - Key in defaultData (e.g. "hero")
 */
const createRestoreController = (model, sectionKey) => async (req, res) => {
  const defaults = defaultData[sectionKey];

  if (!defaults) {
    return res.status(400).json({
      message: `No default data defined for section: "${sectionKey}". ` +
               `Add it to backend/seed/defaultData.js first.`,
    });
  }

  try {
    // findOneAndUpdate with upsert — creates the doc if somehow missing
    const doc = await model.findOneAndUpdate(
      {},
      defaults,
      { new: true, upsert: true, runValidators: true, overwrite: false }
    );
    res.json({ message: "Restored to default successfully.", data: doc });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = createRestoreController;
