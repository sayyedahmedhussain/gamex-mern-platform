import { useState, useEffect, useRef } from "react";
import { getSection, updateSection, restoreSection } from "../services/adminApi";
import ImageUpload from "../components/ImageUpload";
import SaveBar from "../components/SaveBar";

const DEFAULTS = { heading: "", row1Images: [], row2Images: [] };

export default function MovingGamesEditor() {
  const [data, setData] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [loading, setLoading] = useState(true);
  const originalData = useRef(null);

  useEffect(() => {
    getSection("movinggames")
      .then((d) => { const merged = { ...DEFAULTS, ...d }; setData(merged); originalData.current = merged; })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const set = (field) => (e) => setData({ ...data, [field]: e.target.value });
  const addImage = (field) => () => setData({ ...data, [field]: [...data[field], ""] });
  const setImage = (field, i, url) => {
    const imgs = [...data[field]]; imgs[i] = url;
    setData({ ...data, [field]: imgs });
  };
  const removeImage = (field, i) =>
    setData({ ...data, [field]: data[field].filter((_, idx) => idx !== i) });

  const restore = async () => {
    setRestoring(true);
    try {
      const restored = await restoreSection("movinggames");
      setData(restored.data);
      alert("✓ Restored to original defaults successfully!");
    } catch (e) {
      alert("Restore failed: " + e.message);
    } finally {
      setRestoring(false);
    }
  };

  if (loading) return <div className="loading">Loading…</div>;

  const renderImageBlock = (field, title) => (
    <div className="section-block">
      <div className="block-header">
        <h3>{title}</h3>
        <button className="add-btn" onClick={addImage(field)}>+ Add Image</button>
      </div>
      <div className="image-grid">
        {data[field].map((img, i) => (
          <div className="image-grid-item" key={i}>
            <ImageUpload label={`Image ${i + 1}`} value={img} onChange={(url) => setImage(field, i, url)} />
            <button className="remove-btn full-w" onClick={() => removeImage(field, i)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );


  const save = async () => {
  setSaving(true);

  try {
    await updateSection("movinggames", data);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);

    alert("✓ Moving Games Section Updated Successfully");
  } catch (error) {
    console.error(error);
    alert("Failed to save changes");
  } finally {
    setSaving(false);
  }
};
  return (
    <div className="editor">
      <h2>Moving Games</h2>
      <div className="field"><label>Heading</label>
        <input value={data.heading} onChange={set("heading")} />
      </div>
      {renderImageBlock("row1Images", "Row 1 Images")}
      {renderImageBlock("row2Images", "Row 2 Images")}
      <SaveBar saving={saving} saved={saved} onSave={save} onReset={restore} restoring={restoring} />
    </div>
  );
}
