import axios from "axios";

// Public read-only endpoints — used by the live website to fetch
// admin-managed content. No authentication required.
const BASE = "http://localhost:5000/api/sections";

export const getNavbar          = () => axios.get(`${BASE}/navbar`).then(r => r.data);
export const getHero            = () => axios.get(`${BASE}/hero`).then(r => r.data);
export const getGameSection     = () => axios.get(`${BASE}/gamesection`).then(r => r.data);
export const getMovingGames     = () => axios.get(`${BASE}/movinggames`).then(r => r.data);
export const getServicesSection = () => axios.get(`${BASE}/services`).then(r => r.data);
export const getGrowthSection   = () => axios.get(`${BASE}/growth`).then(r => r.data);
export const getAchievement     = () => axios.get(`${BASE}/achievement`).then(r => r.data);
export const getDirectorMessage = () => axios.get(`${BASE}/director`).then(r => r.data);
export const getPartnersSection = () => axios.get(`${BASE}/partners`).then(r => r.data);
export const getFooter = (section) => axios.get(`/api/sections/${section}`).then(r => r.data);