import { useState, useEffect, useRef } from "react";
import {
  getSection,
  updateSection,
  restoreSection,
} from "../services/adminApi";

import ImageUpload from "../components/ImageUpload";
import SaveBar from "../components/SaveBar";

const DEFAULTS = {
  smallTitle: "",
  heading: "",
  description: "",
  partners: [],
};

export default function PartnersSectionEditor() {
  const [data, setData] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [loading, setLoading] = useState(true);

  const originalData = useRef(null);

  useEffect(() => {
    getSection("partners")
      .then((d) => {
        const merged = { ...DEFAULTS, ...d };
        setData(merged);
        originalData.current = merged;
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await updateSection("partners", data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      alert("✓ Partners Section Updated Successfully");
    } catch (err) {
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const restore = async () => {
    setRestoring(true);
    try {
      const restored = await restoreSection("partners");
      setData(restored.data);
      alert("✓ Restored to original defaults successfully!");
    } catch (e) {
      alert("Restore failed: " + e.message);
    } finally {
      setRestoring(false);
    }
  };

  const set = (field) => (e) =>
    setData({ ...data, [field]: e.target.value });

  const addLogo = () =>
    setData({
      ...data,
      partners: [...data.partners, ""],
    });

  const setLogo = (i, url) => {
    const updated = [...data.partners];
    updated[i] = url;
    setData({ ...data, partners: updated });
  };

  const removeLogo = (i) =>
    setData({
      ...data,
      partners: data.partners.filter((_, idx) => idx !== i),
    });

  if (loading) return <div className="loading">Loading…</div>;

  return (
    <div className="editor">
      <h2>Partners Section</h2>

      {/* TEXT FIELDS */}
      <div className="field">
        <label>Small Title</label>
        <input
          value={data.smallTitle}
          onChange={set("smallTitle")}
          placeholder="e.g. Our Partner"
        />
      </div>

      <div className="field">
        <label>Heading</label>
        <input value={data.heading} onChange={set("heading")} />
      </div>

      <div className="field">
        <label>Description</label>
        <textarea
          rows={3}
          value={data.description}
          onChange={set("description")}
        />
      </div>

      {/* LOGOS */}
      <div className="section-block">
        <div className="block-header">
          <h3>Partner Logos</h3>

          <button className="add-btn" onClick={addLogo}>
            + Add Logo
          </button>
        </div>

        <div className="image-grid">
          {data.partners.map((logo, i) => (
            <div className="image-grid-item" key={i}>
              <ImageUpload
                label={`Partner ${i + 1}`}
                value={logo}
                onChange={(url) => setLogo(i, url)}
              />

              <button
                className="remove-btn full-w"
                onClick={() => removeLogo(i)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SAVE BAR */}
      <SaveBar
        saving={saving}
        saved={saved}
        onSave={save}
        onReset={restore}
        restoring={restoring}
      />
    </div>
  );
}