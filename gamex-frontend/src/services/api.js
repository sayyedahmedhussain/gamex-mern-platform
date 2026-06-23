import axios from "axios";

// Public, read-only endpoints exposed by the GameX admin backend.
// No authentication required — these are safe to call from the live site.
const BASE = "http://localhost:5000/api/sections";

export const getNavbar          = () => axios.get(`${BASE}/navbar`).then(r => r.data);
export const getHero            = () => axios.get(`${BASE}/hero`).then(r => r.data);
export const getGameSection     = () => axios.get(`${BASE}/gamesection`).then(r => r.data);
export const getServicesSection = () => axios.get(`${BASE}/services`).then(r => r.data);
export const getGrowthSection   = () => axios.get(`${BASE}/growth`).then(r => r.data);
export const getAchievement     = () => axios.get(`${BASE}/achievement`).then(r => r.data);
export const getDirectorMessage = () => axios.get(`${BASE}/director`).then(r => r.data);
export const getPartnersSection = () => axios.get(`${BASE}/partners`).then(r => r.data);
export const getFooter          = () => axios.get(`${BASE}/footer`).then(r => r.data);
export const getMovingGames     = () => axios.get(`${BASE}/movinggames`).then(r => r.data);
export const getMemorySection   = () => axios.get(`${BASE}/memory`).then(r => r.data);
