import { useState, useEffect, useRef } from "react";
import {
  getSection,
  updateSection,
  restoreSection,
} from "../services/adminApi";

import ImageUpload from "../components/ImageUpload";
import SaveBar from "../components/SaveBar";

const DEFAULTS = {
  footerTop: "",

  about: {
    logo: "",
    text: "",
    socials: [],
  },

  links: {
    title: "",
    items: [],
  },

  services: {
    title: "",
    items: [],
  },

  contact: {
    title: "",
    items: [],
  },

  copyright: "",
};

export default function FooterEditor() {
  const [data, setData] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [loading, setLoading] = useState(true);

  const originalData = useRef(null);

  useEffect(() => {
    getSection("footer")
      .then((d) => {
        const merged = { ...DEFAULTS, ...d };
        setData(merged);
        originalData.current = merged;
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // ✅ SAVE FUNCTION (FIXED)
  const save = async () => {
    setSaving(true);
    try {
      await updateSection("footer", data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      alert("✓ Footer Updated Successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save footer");
    } finally {
      setSaving(false);
    }
  };

  const setField = (field) => (e) =>
    setData({ ...data, [field]: e.target.value });

  // ---------- ABOUT ----------
  const setAbout = (key, value) =>
    setData({
      ...data,
      about: { ...data.about, [key]: value },
    });

  const addSocial = () =>
    setData({
      ...data,
      about: {
        ...data.about,
        socials: [...(data.about.socials || []), ""],
      },
    });

  const updateSocial = (i, value) => {
    const socials = [...(data.about.socials || [])];
    socials[i] = value;
    setAbout("socials", socials);
  };

  const removeSocial = (i) =>
    setData({
      ...data,
      about: {
        ...data.about,
        socials: data.about.socials.filter((_, idx) => idx !== i),
      },
    });

  // ---------- LIST HANDLER (LINKS / SERVICES / CONTACT ITEMS) ----------
  const updateListItem = (section, i, value) => {
    const arr = [...data[section].items];
    arr[i] = value;

    setData({
      ...data,
      [section]: {
        ...data[section],
        items: arr,
      },
    });
  };

  const addListItem = (section) =>
    setData({
      ...data,
      [section]: {
        ...data[section],
        items: [...data[section].items, ""],
      },
    });

  const removeListItem = (section, i) =>
    setData({
      ...data,
      [section]: {
        ...data[section],
        items: data[section].items.filter((_, idx) => idx !== i),
      },
    });

  // ---------- RESTORE ----------
  const restore = async () => {
    setRestoring(true);
    try {
      const restored = await restoreSection("footer");
      setData(restored.data);
      alert("✓ Restored successfully!");
    } catch (e) {
      alert("Restore failed: " + e.message);
    } finally {
      setRestoring(false);
    }
  };

  if (loading) return <div className="loading">Loading…</div>;

  return (
    <div className="editor">
      <h2>Footer Editor (CMS)</h2>

      {/* TOP TEXT */}
      <div className="field">
        <label>Footer Top Text</label>
        <textarea
          rows={3}
          value={data.footerTop}
          onChange={setField("footerTop")}
        />
      </div>

      {/* LOGO */}
      <ImageUpload
        label="Footer Logo"
        value={data.about.logo}
        onChange={(v) => setAbout("logo", v)}
      />

      {/* ABOUT TEXT */}
      <div className="field">
        <label>About Text</label>
        <textarea
          rows={4}
          value={data.about.text}
          onChange={(e) => setAbout("text", e.target.value)}
        />
      </div>

      {/* SOCIALS */}
      <div className="section-block">
        <div className="block-header">
          <h3>Social Icons</h3>
          <button className="add-btn" onClick={addSocial}>
            + Add
          </button>
        </div>

        {data.about.socials?.map((s, i) => (
          <div className="list-item" key={i}>
            <input
              value={s}
              onChange={(e) => updateSocial(i, e.target.value)}
              placeholder="e.g. f / in / x"
            />
            <button
              className="remove-btn"
              onClick={() => removeSocial(i)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* LINKS / SERVICES / CONTACT */}
      {["links", "services", "contact"].map((section) => (
        <div className="section-block" key={section}>
          <h3 style={{ textTransform: "capitalize" }}>{section}</h3>

          <div className="field">
            <input
              value={data[section].title}
              onChange={(e) =>
                setData({
                  ...data,
                  [section]: {
                    ...data[section],
                    title: e.target.value,
                  },
                })
              }
              placeholder="Section title"
            />
          </div>

          <div className="block-header">
            <button
              className="add-btn"
              onClick={() => addListItem(section)}
            >
              + Add Item
            </button>
          </div>

          {data[section].items?.map((item, i) => (
            <div className="list-item" key={i}>
              <input
                value={item}
                onChange={(e) =>
                  updateListItem(section, i, e.target.value)
                }
              />
              <button
                className="remove-btn"
                onClick={() => removeListItem(section, i)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      ))}

      {/* COPYRIGHT */}
      <div className="field">
        <label>Copyright Text</label>
        <input
          value={data.copyright}
          onChange={setField("copyright")}
        />
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