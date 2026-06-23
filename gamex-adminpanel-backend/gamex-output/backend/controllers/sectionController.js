/**
 * Creates a standard CRUD controller for a single-document section model.
 * (Each section has exactly one document in the collection.)
 */
const createSectionController = (Model) => ({

  // GET /api/sections/<section>  (public) — return the single document
  get: async (req, res) => {
    try {
      const doc = await Model.findOne();
      if (!doc) return res.status(404).json({ message: "Not found" });
      res.json(doc);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // POST /api/<section>  — create if none exists
  create: async (req, res) => {
    try {
      const existing = await Model.findOne();
      if (existing) {
        return res.status(400).json({ message: "Document already exists. Use PUT to update." });
      }
      const doc = new Model(req.body);
      const saved = await doc.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // PUT /api/<section>  — upsert (update existing or create)
  update: async (req, res) => {
    try {
      const doc = await Model.findOneAndUpdate(
        {},
        req.body,
        { new: true, upsert: true, runValidators: true }
      );
      res.json(doc);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // DELETE /api/<section>  — delete the document (reset to default)
  delete: async (req, res) => {
    try {
      await Model.findOneAndDelete({});
      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
});

module.exports = createSectionController;
