import { useState, useEffect, useRef } from "react";
import {
  getSection,
  updateSection,
  restoreSection,
} from "../services/adminApi";
import ImageUpload from "../components/ImageUpload";
import SaveBar from "../components/SaveBar";

const DEFAULTS = {
  heading: "",
  description: "",
  mainImage: "",
  cards: [],
};

export default function GrowthSectionEditor() {
  const [data, setData] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [loading, setLoading] = useState(true);

  const originalData = useRef(null);

  useEffect(() => {
    getSection("growth")
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
      await updateSection("growth", data);

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2000);

      alert("✓ Growth Section Updated Successfully");
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
      const restored = await restoreSection("growth");

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

  const addCard = () => {
    setData({
      ...data,
      cards: [
        ...data.cards,
        {
          title: "",
          description: "",
          image: "",
        },
      ],
    });
  };

  const updateCard = (index, field, value) => {
    const updatedCards = [...data.cards];

    updatedCards[index] = {
      ...updatedCards[index],
      [field]: value,
    };

    setData({
      ...data,
      cards: updatedCards,
    });
  };

  const removeCard = (index) => {
    setData({
      ...data,
      cards: data.cards.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="editor">
      <h2>Growth Section</h2>

      {/* MAIN CONTENT */}

      <div className="field">
        <label>Heading</label>
        <input
          value={data.heading}
          onChange={setField("heading")}
          placeholder="Growth Sandbox — Insight-Driven Game Growth"
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
        <h3>Main Image</h3>

        <ImageUpload
          label="Main Image"
          value={data.mainImage}
          onChange={(url) =>
            setData({
              ...data,
              mainImage: url,
            })
          }
        />
      </div>

      {/* CARDS */}

      <div className="section-block">
        <div className="block-header">
          <h3>Growth Cards</h3>

          <button
            className="add-btn"
            onClick={addCard}
          >
            + Add Card
          </button>
        </div>

        {data.cards.map((card, index) => (
          <div
            className="card-item"
            key={index}
          >
            <div className="card-item-header">
              <span>Card {index + 1}</span>

              <button
                className="remove-btn"
                onClick={() => removeCard(index)}
              >
                ✕ Remove
              </button>
            </div>

            <div className="field">
              <label>Card Title</label>
              <input
                value={card.title}
                onChange={(e) =>
                  updateCard(
                    index,
                    "title",
                    e.target.value
                  )
                }
                placeholder="Card Title"
              />
            </div>

            <div className="field">
              <label>Card Description</label>
              <textarea
                rows={3}
                value={card.description}
                onChange={(e) =>
                  updateCard(
                    index,
                    "description",
                    e.target.value
                  )
                }
              />
            </div>

            <ImageUpload
              label="Card Image"
              value={card.image}
              onChange={(url) =>
                updateCard(
                  index,
                  "image",
                  url
                )
              }
            />
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