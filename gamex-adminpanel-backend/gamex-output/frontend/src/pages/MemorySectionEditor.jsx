import { useState, useEffect } from "react";
import {
  getSection,
  updateSection,
  restoreSection,
} from "../services/adminApi";
import ImageUpload from "../components/ImageUpload";
import SaveBar from "../components/SaveBar";

const DEFAULTS = {
  subtitle: "",
  heading: "",
  activitiesTabText: "",
  eventsTabText: "",
  activityImages: [],
  eventImages: [],
};

export default function MemorySectionEditor() {
  const [data, setData] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSection("memory")
      .then((d) => {
        setData({
          ...DEFAULTS,
          ...d,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);

    try {
      await updateSection("memory", data);

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2000);

      alert("✓ Memory Section Updated Successfully");
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
      const restored = await restoreSection("memory");

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

  const addImage = (field) => {
    setData({
      ...data,
      [field]: [...data[field], ""],
    });
  };

  const setImage = (field, index, url) => {
    const updatedImages = [...data[field]];
    updatedImages[index] = url;

    setData({
      ...data,
      [field]: updatedImages,
    });
  };

  const removeImage = (field, index) => {
    setData({
      ...data,
      [field]: data[field].filter((_, i) => i !== index),
    });
  };

  const renderImageBlock = (field, title) => (
    <div className="section-block">
      <div className="block-header">
        <h3>{title}</h3>

        <button
          className="add-btn"
          onClick={() => addImage(field)}
        >
          + Add Image
        </button>
      </div>

      <div className="image-grid">
        {data[field]?.map((img, index) => (
          <div
            className="image-grid-item"
            key={index}
          >
            <ImageUpload
              label={`Image ${index + 1}`}
              value={img}
              onChange={(url) =>
                setImage(field, index, url)
              }
            />

            <button
              className="remove-btn full-w"
              onClick={() =>
                removeImage(field, index)
              }
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="editor">
      <h2>Memory Section</h2>

      <div className="field">
        <label>Subtitle</label>
        <input
          value={data.subtitle}
          onChange={setField("subtitle")}
          placeholder="Our Memory"
        />
      </div>

      <div className="field">
        <label>Heading</label>
        <input
          value={data.heading}
          onChange={setField("heading")}
          placeholder="Gamex Global, Capture Memories"
        />
      </div>

      <div className="field">
        <label>Activities Tab Text</label>
        <input
          value={data.activitiesTabText}
          onChange={setField("activitiesTabText")}
          placeholder="Activities"
        />
      </div>

      <div className="field">
        <label>Events Tab Text</label>
        <input
          value={data.eventsTabText}
          onChange={setField("eventsTabText")}
          placeholder="Events"
        />
      </div>

      {renderImageBlock(
        "activityImages",
        "Activities Images"
      )}

      {renderImageBlock(
        "eventImages",
        "Events Images"
      )}

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