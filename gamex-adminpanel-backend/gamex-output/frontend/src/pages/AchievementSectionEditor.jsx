import { useState, useEffect, useRef } from "react";
import {
  getSection,
  updateSection,
  restoreSection,
} from "../services/adminApi";
import SaveBar from "../components/SaveBar";

const DEFAULTS = {
  smallTitle: "",
  heading: "",
  description: "",
  stats: [],
};

export default function AchievementSectionEditor() {
  const [data, setData] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [loading, setLoading] = useState(true);

  const originalData = useRef(null);

  useEffect(() => {
    getSection("achievement")
      .then((d) => {
        const merged = {
          ...DEFAULTS,
          ...d,
        };

        setData(merged);
        originalData.current = merged;
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);

    try {
      await updateSection("achievement", data);

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2000);

      alert("✓ Achievement Section Updated Successfully");
    } catch (error) {
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const restore = async () => {
    setRestoring(true);

    try {
      const restored = await restoreSection("achievement");

      setData(restored.data);

      alert("✓ Restored to original defaults successfully!");
    } catch (error) {
      alert("Restore failed: " + error.message);
    } finally {
      setRestoring(false);
    }
  };

  const setField = (field) => (e) => {
    setData({
      ...data,
      [field]: e.target.value,
    });
  };

  const addStat = () => {
    setData({
      ...data,
      stats: [
        ...data.stats,
        {
          icon: "",
          value: "",
          label: "",
        },
      ],
    });
  };

  const updateStat = (index, field, value) => {
    const updated = [...data.stats];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setData({
      ...data,
      stats: updated,
    });
  };

  const removeStat = (index) => {
    setData({
      ...data,
      stats: data.stats.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="editor">
      <h2>Achievement Section</h2>

      <div className="field">
        <label>Small Title</label>
        <input
          value={data.smallTitle}
          onChange={setField("smallTitle")}
          placeholder="Our Achievement"
        />
      </div>

      <div className="field">
        <label>Heading</label>
        <input
          value={data.heading}
          onChange={setField("heading")}
        />
      </div>

      <div className="field">
        <label>Description</label>
        <textarea
          rows={4}
          value={data.description}
          onChange={setField("description")}
        />
      </div>

      <div className="section-block">
        <div className="block-header">
          <h3>Achievement Cards</h3>

          <button
            className="add-btn"
            onClick={addStat}
          >
            + Add Card
          </button>
        </div>

        {data.stats?.map((stat, index) => (
          <div
            className="card-item"
            key={index}
          >
            <div className="card-item-header">
              <span>Card {index + 1}</span>

              <button
                className="remove-btn"
                onClick={() =>
                  removeStat(index)
                }
              >
                ✕ Remove
              </button>
            </div>

            <div className="field">
              <label>Icon</label>
              <input
                value={stat.icon}
                placeholder="⬇ / 👥 / 📄 / 👨‍💻"
                onChange={(e) =>
                  updateStat(
                    index,
                    "icon",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="field">
              <label>Value</label>
              <input
                value={stat.value}
                placeholder="100M+"
                onChange={(e) =>
                  updateStat(
                    index,
                    "value",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="field">
              <label>Label</label>
              <input
                value={stat.label}
                placeholder="Downloads"
                onChange={(e) =>
                  updateStat(
                    index,
                    "label",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        ))}
      </div>

      <SaveBar
        saving={saving}
        saved={saved}
        restoring={restoring}
        onSave={save}
        onReset={restore}
      />
    </div>
  );
}