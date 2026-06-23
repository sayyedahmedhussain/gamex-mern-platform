import { useState, useEffect, useRef } from "react";
import { getSection, updateSection, restoreSection, uploadImage } from "../services/adminApi";
import SaveBar from "../components/SaveBar";

const DEFAULTS = {
  headline: "Driving Innovation in\nMENA's Gaming Scene",
  backgroundImage: "",
  centerImage: "https://gamexglobal.pk/assets/img/logo/gamex--logo%201.png",
  centerLabel: "Gamex Global",
  innerIcons: [
    "https://gamexglobal.pk/assets/img/icon/icon7.webp",
    "https://gamexglobal.pk/assets/img/icon/icon8.webp",
    "https://gamexglobal.pk/assets/img/icon/icon5.webp",
    "https://gamexglobal.pk/assets/img/icon/icon6.webp",
  ],
  outerIcons: [
    "https://gamexglobal.pk/assets/img/icon/icon2.webp",
    "https://gamexglobal.pk/assets/img/icon/icon1.webp",
    "https://gamexglobal.pk/assets/img/icon/icon4.webp",
    "https://gamexglobal.pk/assets/img/icon/icon3.webp",
  ],
};

function IconSlot({ label, value, onChange }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div style={styles.iconSlot}>
      <div style={styles.iconPreviewBox}>
        {value
          ? <img src={value} alt={label} style={styles.iconPreviewImg} />
          : <span style={styles.iconPreviewEmpty}>🖼</span>
        }
      </div>
      <span style={styles.iconSlotLabel}>{label}</span>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
      <button
        className="upload-btn"
        style={{ fontSize: 11, padding: "5px 10px", width: "100%" }}
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
      >
        {uploading ? "…" : "Upload"}
      </button>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="or paste URL"
        style={styles.iconUrlInput}
      />
    </div>
  );
}

function ImageField({ label, value, onChange, hint }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="field">
      <label>{label}</label>
      {hint && <span style={{ fontSize: 12, color: "#475569", display: "block", marginBottom: 6 }}>{hint}</span>}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {value && (
          <img src={value} alt={label} style={{ height: 40, maxWidth: 80, objectFit: "contain", background: "#0f1117", border: "1px solid #2d3f55", borderRadius: 6, padding: 4 }} />
        )}
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="Paste image URL" style={{ flex: 1 }} />
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
        <button className="upload-btn" onClick={() => fileRef.current?.click()} disabled={uploading} style={{ whiteSpace: "nowrap" }}>
          {uploading ? "Uploading…" : "Upload"}
        </button>
      </div>
    </div>
  );
}

export default function HeroEditor() {
  const [data, setData] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSection("hero")
      .then((d) => {
        setData({
          headline: d?.headline ?? DEFAULTS.headline,
          backgroundImage: d?.backgroundImage ?? DEFAULTS.backgroundImage,
          centerImage: d?.centerImage ?? DEFAULTS.centerImage,
          centerLabel: d?.centerLabel ?? DEFAULTS.centerLabel,
          innerIcons:
            d?.innerIcons?.length === 4
              ? d.innerIcons
              : [...DEFAULTS.innerIcons],
          outerIcons:
            d?.outerIcons?.length === 4
              ? d.outerIcons
              : [...DEFAULTS.outerIcons],
        });
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const set = (field) => (e) => setData((d) => ({ ...d, [field]: e.target.value }));

  const setIcon = (track, i) => (url) => {
    const key = track === "inner" ? "innerIcons" : "outerIcons";
    const icons = [...data[key]];
    icons[i] = url;
    setData((d) => ({ ...d, [key]: icons }));
  };

  const save = async () => {
    setSaving(true);
    try {
      await updateSection("hero", data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      alert("Save failed: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  const restore = async () => {
    setRestoring(true);
    try {
      const res = await restoreSection("hero");
      setData(res.data);
      alert("✓ Restored to original defaults successfully!");
    } catch (e) {
      alert("Restore failed: " + e.message);
    } finally {
      setRestoring(false);
    }
  };

  if (loading) return <div className="loading">Loading…</div>;

  return (
    <div className="editor">
      <h2>Hero Section</h2>

      <div className="section-block">
        <h3>Text Content</h3>

        <div className="field">
          <label>Headline</label>
          <textarea
            rows={3}
            value={data.headline}
            onChange={set("headline")}
            placeholder={"Driving Innovation in\nMENA's Gaming Scene"}
          />
          <span style={{ fontSize: 12, color: "#475569", display: "block", marginTop: 5 }}>
            Use a new line to insert a &lt;br /&gt; on the live site.
          </span>
        </div>


        

        
      </div>

      <div className="section-block">
        <h3>Background Image <span style={{ fontSize: 11, fontWeight: 400, color: "#475569" }}>(optional)</span></h3>
        <ImageField
          label=""
          value={data.backgroundImage}
          onChange={(v) => setData((d) => ({ ...d, backgroundImage: v }))}
          hint="Shown behind the entire hero section. Leave blank for the default dark background."
        />
      </div>

      <div className="section-block">
        <h3>Center Logo &amp; Label</h3>
        <ImageField
          label="Center Logo Image"
          value={data.centerImage}
          onChange={(v) => setData((d) => ({ ...d, centerImage: v }))}
          hint="The logo shown in the middle of the spinning rings."
        />
        <div className="field">
          <label>Center Label Text</label>
          <input value={data.centerLabel} onChange={set("centerLabel")} placeholder="e.g. Gamex Global" />
        </div>
      </div>

      <div className="section-block">
        <h3>Inner Orbit Icons <span style={{ fontSize: 11, fontWeight: 400, color: "#475569" }}>(4 icons)</span></h3>
        <p style={{ fontSize: 13, color: "#64748b", marginBottom: 14, marginTop: -8 }}>
          Positions 1 → 2 → 3 → 4 clockwise on the inner ring.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {data.innerIcons.map((url, i) => (
            <IconSlot key={i} label={`Inner ${i + 1}`} value={url} onChange={setIcon("inner", i)} />
          ))}
        </div>
      </div>

      <div className="section-block">
        <h3>Outer Orbit Icons <span style={{ fontSize: 11, fontWeight: 400, color: "#475569" }}>(4 icons)</span></h3>
        <p style={{ fontSize: 13, color: "#64748b", marginBottom: 14, marginTop: -8 }}>
          Positions 1 → 2 → 3 → 4 clockwise on the outer ring.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {data.outerIcons.map((url, i) => (
            <IconSlot key={i} label={`Outer ${i + 1}`} value={url} onChange={setIcon("outer", i)} />
          ))}
        </div>
      </div>

      <SaveBar saving={saving} saved={saved} onSave={save} onReset={restore} restoring={restoring} />
    </div>
  );
}

const styles = {
  iconSlot: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
    background: "#0f1117", border: "1px solid #1e293b",
    borderRadius: 10, padding: 12,
  },
  iconPreviewBox: {
    width: 64, height: 64, background: "#1e293b", borderRadius: 8,
    display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
  },
  iconPreviewImg: { width: "100%", height: "100%", objectFit: "contain" },
  iconPreviewEmpty: { fontSize: 24 },
  iconSlotLabel: { fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.04em" },
  iconUrlInput: {
    width: "100%", background: "#1e293b", border: "1px solid #2d3f55",
    borderRadius: 6, padding: "5px 8px", color: "#e2e8f0", fontSize: 11,
    fontFamily: "inherit",
  },
};
