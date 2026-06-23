import axiosClient, { API_BASE } from "./axiosClient";

const BASE = "/api/admin";

// Generic helpers (all authenticated via axiosClient interceptor)
export const getSection    = (name)       => axiosClient.get(`${BASE}/${name}`).then(r => r.data);
export const updateSection = (name, data) => axiosClient.put(`${BASE}/${name}`, data).then(r => r.data);
export const createSection = (name, data) => axiosClient.post(`${BASE}/${name}`, data).then(r => r.data);
export const deleteSection = (name)       => axiosClient.delete(`${BASE}/${name}`).then(r => r.data);

// Image upload (authenticated)
export const uploadImage = async (file) => {
  const form = new FormData();
  form.append("image", file);
  const res = await axiosClient.post("/api/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  // Prefix with server base so it works in <img> tags
  return API_BASE + res.data.url;
};

// Restore a section to its original HTML defaults (stored in backend/seed/defaultData.js)
export const restoreSection = (name) =>
  axiosClient.post(`${BASE}/${name}/restore-default`).then(r => r.data);
