import axiosClient from "./axiosClient";

// POST /api/auth/login → { token, user }
export const loginRequest = (emailOrUsername, password) =>
  axiosClient.post("/api/auth/login", { emailOrUsername, password }).then((r) => r.data);

// GET /api/auth/me → { user }  (verifies the stored token is still valid)
export const fetchMe = () => axiosClient.get("/api/auth/me").then((r) => r.data);
