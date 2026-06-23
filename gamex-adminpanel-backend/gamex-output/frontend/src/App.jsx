import { useState } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import NavbarEditor from "./pages/NavbarEditor";
import HeroEditor from "./pages/HeroEditor";
import GameSectionEditor from "./pages/GameSectionEditor";
import MovingGamesEditor from "./pages/MovingGamesEditor";
import MemorySectionEditor from "./pages/MemorySectionEditor";
import ServicesSectionEditor from "./pages/ServicesSectionEditor";
import GrowthSectionEditor from "./pages/GrowthSectionEditor";
import AchievementSectionEditor from "./pages/AchievementSectionEditor";
import DirectorMessageEditor from "./pages/DirectorMessageEditor";
import PartnersSectionEditor from "./pages/PartnersSectionEditor";
import Footer from "./pages/Footer";

const SECTIONS = [
  { key: "dashboard", label: "Dashboard", },
  { key: "navbar", label: "Navbar", },
  { key: "hero", label: "Hero Section", },
  { key: "gamesection", label: "Game Section", },
  { key: "movinggames", label: "Moving Games", },
  { key: "memory", label: "Memory Section", },
  { key: "services", label: "Services", },
  { key: "growth", label: "Growth & Stats", },
  { key: "achievement", label: "Achievements", },
  { key: "director", label: "Director Message", },
  { key: "partners", label: "Partners", },
  { key: "footer", label: "Footer", },
];

function Dashboard() {
  return (
    <div className="dashboard-home">
      <div className="dash-welcome">
        <h1>GameX Admin Panel</h1>
        <p>Welcome back. Select a section from the sidebar to edit your website content.</p>
      </div>
      <div className="dash-cards">
        {SECTIONS.filter(s => s.key !== "dashboard").map(s => (
          <div className="dash-card" key={s.key}>
            <span className="dash-card-icon">{s.icon}</span>
            <span className="dash-card-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const PAGE_MAP = {
  dashboard: <Dashboard />,
  navbar: <NavbarEditor />,
  hero: <HeroEditor />,
  gamesection: <GameSectionEditor />,
  movinggames: <MovingGamesEditor />,
  memory: <MemorySectionEditor />,
  services: <ServicesSectionEditor />,
  growth: <GrowthSectionEditor />,
  achievement: <AchievementSectionEditor />,
  director: <DirectorMessageEditor />,
  partners: <PartnersSectionEditor />,
  footer: <Footer />,
};

function sectionPath(key) {
  return key === "dashboard" ? "/" : `/${key}`;
}

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const activeKey =
    SECTIONS.find(s => sectionPath(s.key) === location.pathname)?.key || "dashboard";

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <div className="sidebar-logo">
          <span className="logo-icon">GX</span>
          {sidebarOpen && <span className="logo-text">Admin</span>}
        </div>
        <nav className="sidebar-nav">
          {SECTIONS.map(s => (
            <button
              key={s.key}
              className={`nav-item ${activeKey === s.key ? "active" : ""}`}
              onClick={() => navigate(sectionPath(s.key))}
              title={s.label}
            >
              <span className="nav-icon">{s.icon}</span>
              {sidebarOpen && <span className="nav-label">{s.label}</span>}
            </button>
          ))}
        </nav>
        {/* <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? "◀" : "▶"}
        </button> */}
      </aside>

      {/* MAIN */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="breadcrumb">
            <span className="breadcrumb-root">Admin</span>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-current">
              {SECTIONS.find(s => s.key === activeKey)?.label}
            </span>
          </div>
          <div className="header-actions">
            {user && <span className="header-user">{user.username}</span>}
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noreferrer"
              className="view-site-btn"
            >
              View Site ↗
            </a>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>
        <div className="admin-content">
          <Routes>
            {SECTIONS.map(s => (
              <Route key={s.key} path={sectionPath(s.key)} element={PAGE_MAP[s.key]} />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #0f1117;
          color: #e2e8f0;
        }

        /* ── LAYOUT ── */
        .admin-layout {
          display: flex;
          min-height: 100vh;
        }

        /* ── SIDEBAR ── */
        .sidebar {
          width: 240px;
          background: #161c24;
          border-right: 1px solid #1e293b;
          display: flex;
          flex-direction: column;
          transition: width 0.25s ease;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
          flex-shrink: 0;
        }
        .sidebar.collapsed { width: 64px; }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 16px;
          border-bottom: 1px solid #1e293b;
          min-height: 64px;
        }
        .logo-icon {
          width: 32px; height: 32px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 13px; color: white;
          flex-shrink: 0;
        }
        .logo-text {
          font-weight: 700; font-size: 18px; color: white;
          white-space: nowrap;
        }

        .sidebar-nav {
          flex: 1;
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          overflow-y: auto;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 10px;
          border: none;
          background: transparent;
          color: #94a3b8;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
          text-align: left;
          white-space: nowrap;
          overflow: hidden;
        }
        .nav-item:hover { background: #1e293b; color: #e2e8f0; }
        .nav-item.active { background: #1e40af20; color: #60a5fa; }

        // .nav-icon { font-size: 16px; flex-shrink: 0; width: 20px; text-align: center; }
        .nav-label { white-space: nowrap; }

        // .sidebar-toggle {
        //   margin: 12px 8px;
        //   padding: 8px;
        //   background: #1e293b;
        //   border: none;
        //   border-radius: 8px;
        //   color: #94a3b8;
        //   cursor: pointer;
        //   font-size: 12px;
        //   transition: 0.15s;
        // }
        // .sidebar-toggle:hover { color: white; }

        /* ── MAIN ── */
        .admin-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .admin-header {
          height: 64px;
          background: #161c24;
          border-bottom: 1px solid #1e293b;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .breadcrumb { display: flex; align-items: center; gap: 8px; }
        .breadcrumb-root { color: #64748b; font-size: 14px; }
        .breadcrumb-sep { color: #334155; }
        .breadcrumb-current { color: #e2e8f0; font-size: 14px; font-weight: 600; }

        .view-site-btn {
          padding: 7px 16px;
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 8px;
          color: #94a3b8;
          font-size: 13px;
          text-decoration: none;
          transition: 0.15s;
        }
        .view-site-btn:hover { color: white; border-color: #475569; }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .header-user {
          font-size: 13px;
          color: #94a3b8;
          font-weight: 600;
        }
        .logout-btn {
          padding: 7px 16px;
          background: #450a0a20;
          border: 1px solid #7f1d1d;
          border-radius: 8px;
          color: #f87171;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.15s;
        }
        .logout-btn:hover { background: #450a0a40; }

        .admin-content {
          flex: 1;
          padding: 28px;
          overflow-y: auto;
          max-width: 900px;
          width: 100%;
        }

        /* ── EDITOR STYLES ── */
        .editor h2 {
          font-size: 22px;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #1e293b;
        }

        .field {
          margin-bottom: 18px;
        }
        .field label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 7px;
        }
        .field input, .field textarea {
          width: 100%;
          background: #1e293b;
          border: 1px solid #2d3f55;
          border-radius: 10px;
          padding: 10px 14px;
          color: #e2e8f0;
          font-size: 14px;
          transition: border-color 0.15s;
          font-family: inherit;
        }
        .field input:focus, .field textarea:focus {
          outline: none;
          border-color: #3b82f6;
        }
        .field textarea { resize: vertical; }

        .field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        /* image upload */
        .img-upload-row {
          display: flex; gap: 10px;
        }
        .img-upload-row input { flex: 1; }
        .upload-btn {
          padding: 10px 16px;
          background: #1e40af;
          border-radius: 10px;
          color: white;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          border: none;
          transition: background 0.15s;
        }
        .upload-btn:hover { background: #2563eb; }
        .img-preview {
          margin-top: 10px;
          max-height: 100px;
          max-width: 200px;
          border-radius: 8px;
          object-fit: contain;
          background: #0f1117;
          border: 1px solid #2d3f55;
        }

        /* blocks */
        .section-block {
          background: #161c24;
          border: 1px solid #1e293b;
          border-radius: 14px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .section-block h3 {
          font-size: 15px;
          font-weight: 600;
          color: #cbd5e1;
          margin-bottom: 16px;
        }

        .block-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .block-header h3 { margin: 0; }

        /* list items */
        .list-item {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
          align-items: center;
        }
        .list-item input {
          flex: 1;
          background: #1e293b;
          border: 1px solid #2d3f55;
          border-radius: 8px;
          padding: 9px 12px;
          color: #e2e8f0;
          font-size: 14px;
          font-family: inherit;
        }

        /* card items */
        .card-item {
          background: #0f1117;
          border: 1px solid #1e293b;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 14px;
        }
        .card-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
          font-size: 13px;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
        }

        /* tags */
        .tags-row {
          display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;
        }
        .tag-chip {
          display: flex; align-items: center; gap: 6px;
          background: #1e293b; border-radius: 20px;
          padding: 4px 12px; font-size: 13px; color: #60a5fa;
        }
        .tag-chip button {
          background: none; border: none; color: #64748b;
          cursor: pointer; font-size: 12px; padding: 0;
        }
        .tag-chip button:hover { color: #ef4444; }

        /* image grid */
        .image-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
        }
        .image-grid-item {
          background: #0f1117;
          border: 1px solid #1e293b;
          border-radius: 10px;
          padding: 12px;
        }

        /* buttons */
        .add-btn {
          padding: 7px 14px;
          background: #1e293b;
          border: 1px dashed #475569;
          border-radius: 8px;
          color: #60a5fa;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.15s;
        }
        .add-btn:hover { background: #1e40af20; border-color: #3b82f6; }

        .remove-btn {
          padding: 6px 10px;
          background: #450a0a20;
          border: 1px solid #450a0a;
          border-radius: 7px;
          color: #f87171;
          font-size: 12px;
          cursor: pointer;
          white-space: nowrap;
          transition: 0.15s;
          flex-shrink: 0;
        }
        .remove-btn:hover { background: #450a0a40; }
        .remove-btn.full-w { width: 100%; margin-top: 8px; }

        /* save bar */
        .save-bar {
          position: sticky;
          bottom: 0;
          background: linear-gradient(transparent, #0f1117 40%);
          padding: 20px 0 4px;
          margin-top: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .save-btn {
          padding: 12px 32px;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          border: none;
          border-radius: 10px;
          color: white;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          min-width: 160px;
        }
        .save-btn:hover:not(:disabled) { filter: brightness(1.15); transform: translateY(-1px); }
        .save-btn.saving { opacity: 0.6; cursor: not-allowed; }
        .save-btn.saved { background: linear-gradient(135deg, #16a34a, #059669); }
        .restore-btn {
          padding: 12px 24px;
          background: transparent;
          border: 1px solid #334155;
          border-radius: 10px;
          color: #94a3b8;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .restore-btn:hover:not(:disabled) { border-color: #f59e0b; color: #f59e0b; background: #f59e0b12; }
        .restore-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        /* loading */
        .loading {
          padding: 40px;
          text-align: center;
          color: #64748b;
          font-size: 16px;
        }

        /* DASHBOARD */
        .dashboard-home { padding: 4px 0; }
        .dash-welcome { margin-bottom: 32px; }
        .dash-welcome h1 {
          font-size: 28px; font-weight: 800;
          background: linear-gradient(135deg, #60a5fa, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }
        .dash-welcome p { color: #64748b; font-size: 15px; }

        .dash-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 14px;
          margin-bottom: 32px;
        }
        .dash-card {
          background: #161c24;
          border: 1px solid #1e293b;
          border-radius: 14px;
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: default;
          transition: 0.15s;
        }
        .dash-card:hover { border-color: #3b82f6; background: #1e2533; }
        // .dash-card-icon { font-size: 26px; }
        .dash-card-label { font-size: 13px; font-weight: 600; color: #94a3b8; text-align: center; }

        .info-box h3 { font-size: 15px; font-weight: 700; color: #e2e8f0; margin-bottom: 12px; }
        .info-box ul { padding-left: 18px; color: #94a3b8; font-size: 14px; line-height: 1.9; }
        .info-box code {
          display: block;
          background: #0f1117;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 13px;
          color: #60a5fa;
          margin-top: 4px;
        }

        @media (max-width: 768px) {
          .sidebar { width: 64px; }
          .sidebar.open { position: fixed; z-index: 100; width: 220px; }
          .field-row { grid-template-columns: 1fr; }
          .admin-content { padding: 16px; }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/*" element={<AdminLayout />} />
      </Route>
    </Routes>
  );
}
