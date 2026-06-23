import { useState, useEffect } from "react";
import { getNavbar } from "../services/api";

const DEFAULT_NAVBAR = {
  logoImage: "https://gamexglobal.pk/assets/img/logo/gamex--logo%201.png",
  logoText: "GAMEX GLOBAL",
  ctaText: "",
  ctaLink: "",
  links: [
    { label: "Home", url: "#" },
    { label: "About", url: "#" },
    { label: "Services", url: "#" },
    { label: "Games", url: "#" },
    { label: "Privacy Policy", url: "#" },
    { label: "Contact", url: "#" },
  ],
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState(DEFAULT_NAVBAR);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNavbar()
      .then((res) => {
        setData({
          logoImage: res?.logoImage || DEFAULT_NAVBAR.logoImage,
          logoText: res?.logoText || DEFAULT_NAVBAR.logoText,
          ctaText: res?.ctaText || DEFAULT_NAVBAR.ctaText,
          ctaLink: res?.ctaLink || DEFAULT_NAVBAR.ctaLink,
          links: res?.links?.length ? res.links : DEFAULT_NAVBAR.links,
        });
      })
      .catch(() => setData(DEFAULT_NAVBAR))
      .finally(() => setLoading(false));
  }, []);

  const links = (data.links || [])
    .filter((l) => l?.isVisible !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  if (loading) return <div className="navbar" />;

  return (
    <>
      <div className="navbar">

        {/* LOGO */}
        <div className="nav-logo">
          {data.logoImage && (
            <img src={data.logoImage} alt={data.logoText} />
          )}
          {data.logoText && <h2>{data.logoText}</h2>}
        </div>

        {/* DESKTOP LINKS */}
        <ul className="nav-links">
          {links.map((link, i) => (
            <li key={link._id || i}>
              <a href={link.url || "#"}>{link.label}</a>
            </li>
          ))}
        </ul>

        {/* CTA BUTTON — shown only if ctaText is set in admin */}
        {data.ctaText && (
          <a href={data.ctaLink || "#"} className="nav-cta">
            {data.ctaText}
          </a>
        )}

        {/* MOBILE TOGGLE */}
        <button className="menu-btn" onClick={() => setMenuOpen((p) => !p)}>
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu">
          {links.map((link, i) => (
            <a key={link._id || i} href={link.url || "#"}>
              {link.label}
            </a>
          ))}
          {data.ctaText && (
            <a href={data.ctaLink || "#"} className="mobile-cta">
              {data.ctaText}
            </a>
          )}
        </div>
      )}

      <style>{`

      .navbar{
        width:95%;
        min-height:92px;
        background:#161c24;
        margin:auto;
        margin-top:20px;
        border-radius:22px;

        display:flex;
        justify-content:space-between;
        align-items:center;

        padding:18px 35px;

        position:sticky;
        top:0;
        z-index:9999;

        box-shadow:0 10px 30px rgba(0,0,0,0.15);
      }

      /* LOGO */

      .nav-logo{
        display:flex;
        align-items:center;
        gap:10px;
      }

      .nav-logo img{
        width:52px;
      }

      .nav-logo h2{
        color:white;
        font-size:16px;
        font-weight:700;
        margin:0;
        white-space:nowrap;
      }

      /* DESKTOP LINKS */

      .nav-links{
        display:flex;
        align-items:center;
        gap:38px;

        list-style:none;
        margin:0;
        padding:0;
      }

      .nav-links li a{
        text-decoration:none;
        color:white;
        font-size:17px;
        font-weight:500;
        transition:0.3s;
      }

      .nav-links li a:hover{
        color:#3b82f6;
      }

      /* HAMBURGER */

      .menu-btn{
        display:none;
        background:none;
        border:none;
        color:white;
        font-size:30px;
        cursor:pointer;
      }

      /* MOBILE MENU */

      .mobile-menu{
        width:95%;
        margin:auto;
        margin-top:10px;

        background:#161c24;
        border-radius:20px;

        display:flex;
        flex-direction:column;

        padding:20px;
      }

      .mobile-menu a{
        color:white;
        text-decoration:none;
        padding:12px 0;
        border-bottom:1px solid rgba(255,255,255,0.1);
      }

      .mobile-menu a:last-child{
        border-bottom:none;
      }

      /* LARGE TABLETS */

      @media(max-width:1100px){

        .nav-links{
          gap:20px;
        }

        .nav-links li a{
          font-size:15px;
        }

      }

      /* TABLET */

      @media(max-width:900px){

        .navbar{
          padding:16px 20px;
        }

        .nav-logo h2{
          font-size:14px;
        }

      }

      /* MOBILE */

      @media(max-width:768px){

        .nav-links{
          display:none;
        }

        .menu-btn{
          display:block;
        }

        .navbar{
          min-height:75px;
          padding:12px 18px;
        }

        .nav-logo img{
          width:42px;
        }

        .nav-logo h2{
          font-size:13px;
        }

      }

      /* SMALL MOBILE */

      @media(max-width:480px){

        .navbar{
          width:96%;
        }

        .nav-logo h2{
          font-size:12px;
        }

        .menu-btn{
          font-size:26px;
        }

      }

      `}</style>



    </>
  );
}