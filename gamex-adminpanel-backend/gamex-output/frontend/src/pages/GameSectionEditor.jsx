import { useState, useEffect } from "react";
import { getSection, updateSection, restoreSection } from "../services/adminApi";
import ImageUpload from "../components/ImageUpload";
import SaveBar from "../components/SaveBar";

const DEFAULTS = {
  heading: "",
  description: "",
  tags: [],
  gameImages: [],
};

export default function GameSectionEditor() {
  const [data, setData] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getSection("gamesection");
      setData(response || DEFAULTS);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    setSaving(true);

    try {
      await updateSection("gamesection", data);

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);

      alert("✓ Game Section Updated Successfully");
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
      const restored = await restoreSection("gamesection");

      setData(restored.data);

      alert("✓ Restored Successfully");
    } catch (error) {
      console.error(error);
      alert("Restore Failed");
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

  const addTag = () => {
    if (!newTag.trim()) return;

    setData({
      ...data,
      tags: [...data.tags, newTag.trim()],
    });

    setNewTag("");
  };

  const removeTag = (index) => {
    setData({
      ...data,
      tags: data.tags.filter((_, i) => i !== index),
    });
  };

  const addImage = () => {
    setData({
      ...data,
      gameImages: [...data.gameImages, ""],
    });
  };

  const setImage = (index, url) => {
    const updatedImages = [...data.gameImages];

    updatedImages[index] = url;

    setData({
      ...data,
      gameImages: updatedImages,
    });
  };

  const removeImage = (index) => {
    setData({
      ...data,
      gameImages: data.gameImages.filter((_, i) => i !== index),
    });
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="editor">
      <h2>Game Section</h2>

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
          <h3>Tags</h3>
        </div>

        <div className="tags-row">
          {data.tags?.map((tag, index) => (
            <span className="tag-chip" key={index}>
              {tag}
              <button onClick={() => removeTag(index)}>
                ✕
              </button>
            </span>
          ))}
        </div>

        <div className="list-item">
          <input
            placeholder="Enter Tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && addTag()
            }
          />

          <button
            className="add-btn"
            onClick={addTag}
          >
            + Add Tag
          </button>
        </div>
      </div>

      <div className="section-block">
        <div className="block-header">
          <h3>Game Images</h3>

          <button
            className="add-btn"
            onClick={addImage}
          >
            + Add Image
          </button>
        </div>

        <div className="image-grid">
          {data.gameImages?.map((image, index) => (
            <div
              className="image-grid-item"
              key={index}
            >
              <ImageUpload
                label={`Image ${index + 1}`}
                value={image}
                onChange={(url) =>
                  setImage(index, url)
                }
              />

              <button
                className="remove-btn full-w"
                onClick={() =>
                  removeImage(index)
                }
              >
                Remove
              </button>
            </div>
          ))}
        </div>
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