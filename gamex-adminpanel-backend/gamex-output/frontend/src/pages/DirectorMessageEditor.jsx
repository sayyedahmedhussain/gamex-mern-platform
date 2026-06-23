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
  directorName: "",
  message: "",
  directorImage: "",
  designation: "",
  signatureName: "",
  quoteIcon: "",
};

export default function DirectorMessageEditor() {
  const [data, setData] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [loading, setLoading] = useState(true);

  const originalData = useRef(null);

  useEffect(() => {
    getSection("director")
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
      await updateSection("director", data);

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2000);

      alert("✓ Director Message Updated Successfully");
    } catch (error) {
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const restore = async () => {
    setRestoring(true);

    try {
      const restored = await restoreSection("director");

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

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="editor">
      <h2>Director Message Section</h2>

      <div className="field">
        <label>Small Title</label>
        <input
          value={data.smallTitle}
          onChange={setField("smallTitle")}
          placeholder="Managing Director Message"
        />
      </div>

      <div className="field">
        <label>Director Name</label>
        <input
          value={data.directorName}
          onChange={setField("directorName")}
        />
      </div>

      <div className="field">
        <label>Signature Name</label>
        <input
          value={data.signatureName}
          onChange={setField("signatureName")}
          placeholder="Name shown below message"
        />
      </div>

      <div className="field">
        <label>Designation</label>
        <input
          value={data.designation}
          onChange={setField("designation")}
          placeholder="Managing Director"
        />
      </div>

      <div className="field">
        <label>Quote Icon</label>
        <input
          value={data.quoteIcon}
          onChange={setField("quoteIcon")}
          placeholder="❝"
        />
      </div>

      <div className="field">
        <label>Message</label>
        <textarea
          rows={8}
          value={data.message}
          onChange={setField("message")}
        />
      </div>

      <ImageUpload
        label="Director Image"
        value={data.directorImage}
        onChange={(url) =>
          setData({
            ...data,
            directorImage: url,
          })
        }
      />

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