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
  description2: "",
  buttonText: "",
  services: [],
};

export default function ServicesSectionEditor() {
  const [data, setData] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [loading, setLoading] = useState(true);

  const originalData = useRef(null);

  useEffect(() => {
    getSection("services")
      .then((d) => {
        const merged = { ...DEFAULTS, ...d };
        setData(merged);
        originalData.current = merged;
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);

    try {
      await updateSection("services", data);

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);

      alert("✓ Services Section Updated Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const restore = async () => {
    setRestoring(true);

    try {
      const restored = await restoreSection("services");

      setData(restored.data);

      alert("✓ Restored to original defaults successfully!");
    } catch (error) {
      console.error(error);
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

  const addService = () => {
    setData({
      ...data,
      services: [
        ...data.services,
        { title: "", description: "", icon: "" },
      ],
    });
  };

  const updateService = (index, field, value) => {
    const updated = [...data.services];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setData({
      ...data,
      services: updated,
    });
  };

  const removeService = (index) => {
    setData({
      ...data,
      services: data.services.filter((_, i) => i !== index),
    });
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="editor">
      <h2>Services Section</h2>

      {/* LEFT TEXT CONTENT */}
      <div className="field">
        <label>Small Title</label>
        <input
          value={data.smallTitle}
          onChange={setField("smallTitle")}
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
          rows={3}
          value={data.description}
          onChange={setField("description")}
        />
      </div>

      <div className="field">
        <label>Second Description</label>
        <textarea
          rows={3}
          value={data.description2}
          onChange={setField("description2")}
        />
      </div>

      <div className="field">
        <label>Button Text</label>
        <input
          value={data.buttonText}
          onChange={setField("buttonText")}
        />
      </div>

      {/* SERVICES LIST */}
      <div className="section-block">
        <div className="block-header">
          <h3>Services</h3>

          <button
            className="add-btn"
            onClick={addService}
          >
            + Add Service
          </button>
        </div>

        {data.services.map((service, index) => (
          <div className="card-item" key={index}>
            <div className="card-item-header">
              <span>Service {index + 1}</span>

              <button
                className="remove-btn"
                onClick={() => removeService(index)}
              >
                ✕ Remove
              </button>
            </div>

            <div className="field">
              <label>Title</label>
              <input
                value={service.title}
                onChange={(e) =>
                  updateService(
                    index,
                    "title",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="field">
              <label>Description</label>
              <textarea
                rows={2}
                value={service.description}
                onChange={(e) =>
                  updateService(
                    index,
                    "description",
                    e.target.value
                  )
                }
              />
            </div>

            {/* ICON = IMAGE OR URL */}
            <div className="field">
              <label>Icon (Image URL or Emoji)</label>
              <input
                value={service.icon}
                onChange={(e) =>
                  updateService(
                    index,
                    "icon",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="field">
              <label>OR Upload Icon Image</label>
              <ImageUpload
                label="Upload Icon"
                value={service.icon}
                onChange={(url) =>
                  updateService(index, "icon", url)
                }
              />
            </div>
          </div>
        ))}
      </div>

      {/* SAVE BAR */}
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