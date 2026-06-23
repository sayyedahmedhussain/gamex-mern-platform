import { useState, useEffect, useRef } from "react";
import { getSection, updateSection, restoreSection, uploadImage } from "../services/adminApi";
import SaveBar from "../components/SaveBar";

const EMPTY = {
  logoImage: "",
  logoText: "",
  links: []
};

export default function NavbarEditor() {
  const [data, setData] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const originalData = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    getSection("navbar")
      .then((res) => {
        const d = {
          logoImage: res?.logoImage || "",
          logoText: res?.logoText || "",
          links: res?.links || [],
        };
        setData(d);
        originalData.current = d;
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  /* ── helpers ─────────────────────────────────────────────── */
  const setField = (field) => (e) => setData((d) => ({ ...d, [field]: e.target.value }));

  const handleLink = (i, field, val) => {
    const links = data.links.map((l, idx) =>
      idx !== i ? l : {
        ...l,
        [field]: field === "order" ? Number(val) : val,
      }
    );
    setData((d) => ({ ...d, links }));
  };

  const addLink = () =>
    setData((d) => ({
      ...d,
      links: [
        ...d.links,
        {
          label: "New Link",
          url: "#",
          order: d.links.length + 1,
        },
      ],
    }));

  const removeLink = (i) =>
    setData((d) => ({ ...d, links: d.links.filter((_, idx) => idx !== i) }));

  const moveLink = (i, dir) => {
    const links = [...data.links];
    const target = i + dir;
    if (target < 0 || target >= links.length) return;
    [links[i], links[target]] = [links[target], links[i]];
    setData((d) => ({ ...d, links: links.map((l, idx) => ({ ...l, order: idx + 1 })) }));
  };


  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setData((d) => ({ ...d, logoImage: url }));
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  /* ── save / restore ──────────────────────────────────────── */
  const save = async () => {
    setSaving(true);
    try {
      await updateSection("navbar", data);
      originalData.current = data;
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
      const res = await restoreSection("navbar");
      setData(res.data);
      alert("✓ Restored to original defaults successfully!");
    } catch (e) {
      alert("Restore failed: " + e.message);
    } finally {
      setRestoring(false);
    }
  };

  /* ── derived ─────────────────────────────────────────────── */
  const visibleLinks = [...(data.links || [])]
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .filter((l) => l.isVisible !== false);

  if (loading) return <div className="loading">Loading…</div>;

  return (
    <div className="editor">

      {/* ── HEADER ───────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid #1e293b" }}>
        <h2 style={{ margin: 0 }}>Navbar Editor</h2>
      </div>


      {/* ── LOGO ─────────────────────────────────────────────── */}
      <div className="section-block">
        <h3>Logo</h3>

        <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>

          {/* thumbnail + upload */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 150 }}>
            {data.logoImage
              ? <img src={data.logoImage} alt="logo" style={{ maxWidth: 140, maxHeight: 70, objectFit: "contain", background: "#0f1117", border: "1px solid #2d3f55", borderRadius: 8, padding: 8 }} />
              : <div style={{ width: 140, height: 70, background: "#1e293b", border: "1px dashed #334155", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#475569", fontSize: 13 }}>No image</div>
            }
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleLogoUpload} />
            <button className="upload-btn" style={{ width: "100%" }} onClick={() => fileRef.current?.click()} disabled={uploading}>
              {uploading ? "Uploading…" : "Upload Image"}
            </button>
            {data.logoImage && (
              <button className="remove-btn" style={{ width: "100%" }} onClick={() => setData((d) => ({ ...d, logoImage: "" }))}>
                ✕ Remove
              </button>
            )}
          </div>

          {/* text fields */}
          <div style={{ flex: 1, minWidth: 220 }}>
            <div className="field">
              <label>Logo Text</label>
              <input value={data.logoText} onChange={setField("logoText")} placeholder="e.g. GAMEX GLOBAL" />
            </div>
            <div className="field">
              <label>Logo Image URL <span style={{ fontSize: 11, fontWeight: 400, color: "#475569", textTransform: "none" }}>(or use upload)</span></label>
              <input value={data.logoImage} onChange={setField("logoImage")} placeholder="https://…/logo.png" />
            </div>
          </div>
        </div>
      </div>

      {/* ── NAV LINKS ────────────────────────────────────────── */}
      <div className="section-block">
        <div className="block-header">
          <h3>Navigation Links</h3>
          <button className="add-btn" onClick={addLink}>+ Add Link</button>
        </div>

        {data.links.length === 0 && (
          <div style={{ textAlign: "center", padding: 28, color: "#475569", fontSize: 14, border: "1px dashed #1e293b", borderRadius: 10 }}>
            No links yet — click "+ Add Link" to get started.
          </div>
        )}

        {data.links.map((link, i) => (
          <div
            key={i}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              background: "#0f1117",
              border: "1px solid #1e293b",
              borderRadius: 12, padding: "12px 14px", marginBottom: 10,
              opacity: 1, transition: "opacity 0.15s",
            }}
          >
            {/* reorder */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, flexShrink: 0 }}>
              <button onClick={() => moveLink(i, -1)} disabled={i === 0} style={arrowBtn}>▲</button>
              <span style={{ fontSize: 11, color: "#475569", fontWeight: 600 }}>#{i + 1}</span>
              <button onClick={() => moveLink(i, 1)} disabled={i === data.links.length - 1} style={arrowBtn}>▼</button>
            </div>

            {/* label + url */}
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div className="field" style={{ margin: 0 }}>
                <label>Label</label>
                <input value={link.label} onChange={(e) => handleLink(i, "label", e.target.value)} placeholder="e.g. About" />
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label>URL</label>
                <input value={link.url} onChange={(e) => handleLink(i, "url", e.target.value)} placeholder="e.g. #about" />
              </div>
            </div>

            <button className="remove-btn" style={{ flexShrink: 0 }} onClick={() => removeLink(i)}>✕</button>
          </div>
        ))}
      </div>

      <SaveBar saving={saving} saved={saved} onSave={save} onReset={restore} restoring={restoring} />
    </div>
  );
}

const arrowBtn = {
  background: "#1e293b", border: "none", borderRadius: 4,
  color: "#64748b", width: 22, height: 22, fontSize: 9,
  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
};
