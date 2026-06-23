import { useState } from "react";
import { uploadImage } from "../services/adminApi";

/**
 * Props:
 *  value    — current URL string
 *  onChange — callback(newUrl)
 *  label    — field label
 */
export default function ImageUpload({ value, onChange, label = "Image" }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="field">
      <label>{label}</label>
      <div className="img-upload-row">
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste URL or upload below"
        />
        <label className="upload-btn">
          {uploading ? "Uploading…" : "Upload File"}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFile}
            disabled={uploading}
          />
        </label>
      </div>
      {value && (
        <img src={value} alt="preview" className="img-preview" />
      )}
    </div>
  );
}
