import { useEffect, useRef, useState } from "react";
import { getHero } from "../services/api";

export default function HeroOrbit() {

  const canvasRef = useRef(null);
  const [hero, setHero] = useState(null);

  useEffect(() => {
    getHero().then(setHero).catch(() => {});
  }, []);

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const CX = 450;
    const CY = 530;

    /* BIG OUTER RINGS */

    const RED_MIN = 150;
    const RED_MAX = 190;

    const YLW_MIN = 160;
    const YLW_MAX = 180;

    const CYCLE = 4000;

    let yrAngle = 0;
    let rrAngle = 0;
    let lastTs = null;

    function drawRing(r, color, alpha) {

      ctx.beginPath();

      ctx.arc(CX, CY, r, 0, Math.PI * 2);

      ctx.strokeStyle = color;

      ctx.globalAlpha = alpha;

      ctx.lineWidth = 1.2;

      ctx.stroke();

      ctx.globalAlpha = 1;
    }

    function animate(ts) {

      if (!lastTs) lastTs = ts;

      const dt = ts - lastTs;

      lastTs = ts;

      ctx.clearRect(0, 0, 900, 900);

      rrAngle = (rrAngle + 0.05 * dt / 16) % 360;

      yrAngle = (yrAngle - 0.05 * dt / 16 + 360) % 360;

      const rrPhase = (ts % CYCLE) / CYCLE;

      const yrPhase = ((ts + CYCLE * 0.5) % CYCLE) / CYCLE;

      const rrR =
        RED_MIN + (RED_MAX - RED_MIN) * rrPhase;

      const yrR =
        YLW_MIN + (YLW_MAX - YLW_MIN) * yrPhase;

      const rrAlpha =
         0.25 + 0.35 * Math.sin(rrPhase * Math.PI);

      const yrAlpha =
        0.30 + 0.40 * Math.sin(yrPhase * Math.PI);

      /* RED */

      ctx.save();

      ctx.translate(CX, CY);

      ctx.rotate(rrAngle * Math.PI / 180);

      ctx.translate(-CX, -CY);

      drawRing(rrR, "rgba(255,0,0,1)", rrAlpha);

      ctx.restore();

      /* YELLOW */

      ctx.save();

      ctx.translate(CX, CY);

      ctx.rotate(yrAngle * Math.PI / 180);

      ctx.translate(-CX, -CY);

      drawRing(yrR, "rgba(255,196,0,1)", yrAlpha);

      ctx.restore();

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

  }, []);

  return (

    <div className="hero-section">

      {/* HERO TEXT */}

      <div className="hero-text">

        {hero?.headline ? (
          <h1 dangerouslySetInnerHTML={{ __html: hero.headline.replace(/\n/g, "<br />") }} />
        ) : (
          <h1>
            Driving Innovation in <br />
            MENA's Gaming Scene
          </h1>
        )}

        {hero?.subheadline && <p className="hero-subheadline">{hero.subheadline}</p>}

        {hero?.description && <p className="hero-description">{hero.description}</p>}

        {hero?.ctaText && hero?.ctaLink && (
          <a className="hero-cta" href={hero.ctaLink}>{hero.ctaText}</a>
        )}

      </div>

      {/* ROOT */}

      <div className="root">

        {/* BLUE RINGS */}

        <div className="br br1"></div>

        <div className="br br2"></div>

        {/* CANVAS */}

        <canvas
          ref={canvasRef}
          id="ringCanvas"
          width="900"
          height="900"
        ></canvas>

        {/* INNER ROTATION */}

        <div className="track track-inner">

          <div className="node ti1">
            <img src="https://gamexglobal.pk/assets/img/icon/icon7.webp" />
          </div>

          <div className="node ti2">
            <img src="https://gamexglobal.pk/assets/img/icon/icon8.webp" />
          </div>

          <div className="node ti3">
            <img src="https://gamexglobal.pk/assets/img/icon/icon5.webp" />
          </div>

          <div className="node ti4">
            <img src="https://gamexglobal.pk/assets/img/icon/icon6.webp" />
          </div>

        </div>

        {/* OUTER ROTATION */}

        <div className="track track-outer">

          <div className="node to1">
            <img src="https://gamexglobal.pk/assets/img/icon/icon2.webp" />
          </div>

          <div className="node to2">
            <img src="https://gamexglobal.pk/assets/img/icon/icon1.webp" />
          </div>

          <div className="node to3">
            <img src="https://gamexglobal.pk/assets/img/icon/icon4.webp" />
          </div>

          <div className="node to4">
            <img src="https://gamexglobal.pk/assets/img/icon/icon3.webp" />
          </div>

        </div>

        {/* CENTER */}

        <div className="center">

          <div className="center-box">

            <img
              src="https://gamexglobal.pk/assets/img/logo/gamex--logo%201.png"
              alt=""
            />

          </div>

          <span className="center-label">
            Gamex Global
          </span>

        </div>

      </div>

      {/* CSS */}

      <style>{`

        .hero-section{

          width:100%;
          min-height:56vh;

          background:
          linear-gradient(
to bottom,
rgba(255,255,255,0.02),
rgba(255,255,255,0.02)
),
          url("https://gamexglobal.pk/assets/img/SS08.png"),
          url("https://gamexglobal.pk/assets/img/SS07.png");

          background-repeat:no-repeat,no-repeat,no-repeat;

          background-position:
          center,
          left center,
          right center;

          background-size:
          cover,
          380px,
          370px;

          background-color:#d9eef8;

          display:flex;
          align-items:flex-start; /* CHANGED from center to push content up */
          justify-content:flex-start; /* CHANGED from center */
          padding-top:20px; /* REDUCED from 35px to push content up */
          padding-bottom:35px;
          overflow:hidden;
          position:relative;
          flex-direction:column;
        }

        /* HERO TEXT */

        .hero-text{
          position:relative;
          text-align:center;
          z-index:100;
          margin-bottom:0px;
          width:100%;
          padding-top:10px; /* ADDED to control top spacing */
        }

        .hero-text h1{
          font-size:32px;
          line-height:1.1;
          color:#2d2d2d;
          font-weight:700;
          margin:0;
        }

        .hero-subheadline{
          font-size:18px;
          color:#374151;
          font-weight:600;
          margin-top:0.5cm; /* EXACTLY 0.5cm spacing */
          margin-bottom:0;
        }

        .hero-description{
          font-size:15px;
          color:#4b5563;
          margin-top:0.5cm; /* EXACTLY 0.5cm spacing */
          margin-bottom:0;
          max-width:520px;
          margin-left:auto;
          margin-right:auto;
        }

        .hero-cta{
          display:inline-block;
          margin-top:0.5cm; /* EXACTLY 0.5cm spacing */
          padding:10px 24px;
          background:#2563eb;
          color:white;
          border-radius:10px;
          font-weight:700;
          text-decoration:none;
          transition:0.3s;
          font-size:14px;
        }

        .hero-cta:hover{
          background:#1d4ed8;
          transform:translateY(-3px);
        }

        /* ROOT */

        .root{
          position:relative;
          width:480px;
          height:620px;
          margin-top:0px;
          flex-shrink:0;
          align-self:center; /* Center the root container */
        }

        /* BLUE RINGS */

        .br{
          position:absolute;

          top:50%;
          left:50%;

          border-radius:50%;

          transform:translate(-50%,-50%);
        }

        .br1{
          width:260px;
          height:260px;

          border:3px solid #4a80e0;
        }

        .br2{
          width:420px;
          height:420px;

          border:3px solid #4a80e0;
        }

        /* CANVAS */

        #ringCanvas{
          position:absolute;

          top:-210px;
          left:-210px;

          width:900px;
          height:900px;

          z-index:2;

          pointer-events:none;
        }

        /* TRACK */

        .track{
          position:absolute;

          top:50%;
          left:50%;

          border-radius:50%;

          z-index:8;
        }

        .track-inner{

          width:260px;
          height:260px;

          margin-left:-130px;
          margin-top:-130px;

          animation:orbitCW 10s linear infinite;
        }

        .track-outer{

          width:420px;
          height:420px;

          margin-left:-210px;
          margin-top:-210px;

          animation:orbitCCW 16s linear infinite;
        }

        @keyframes orbitCW{

          from{
            transform:rotate(0deg);
          }

          to{
            transform:rotate(360deg);
          }

        }

        @keyframes orbitCCW{

          from{
            transform:rotate(0deg);
          }

          to{
            transform:rotate(-360deg);
          }

        }

        /* ICONS */

        .node{

  position:absolute;

  width:65px;
  height:65px;

  display:flex;
  align-items:center;
  justify-content:center;

  transform:translate(-50%,-50%);

  z-index:9;

  background:transparent;

  box-shadow:none;

  border:none;
}

       .node img{

  width:45px;
  height:45px;
  border-radius:35%;
  object-fit:contain;

  filter:
  drop-shadow(0 0 8px rgba(0,0,0,0.15));
}

        .track-inner .node{
          animation:ctrCW 10s linear infinite;
        }

        .track-outer .node{
          animation:ctrCCW 16s linear infinite;
        }

        @keyframes ctrCW{

          from{
            transform:translate(-50%,-50%) rotate(0deg);
          }

          to{
            transform:translate(-50%,-50%) rotate(-360deg);
          }

        }

        @keyframes ctrCCW{

          from{
            transform:translate(-50%,-50%) rotate(0deg);
          }

          to{
            transform:translate(-50%,-50%) rotate(360deg);
          }

        }
          /* ===========================
   LARGE TABLET
=========================== */

@media (max-width: 1024px){

  .hero-section{
    background-size:
    cover,
    280px,
    280px;

    min-height:50vh;
    padding-top:15px; /* REDUCED */
  }

  .hero-text h1{
    font-size:28px;
  }

  .root{
    transform:scale(.85);
  }

}

/* ===========================
   TABLET
=========================== */

@media (max-width: 768px){

  .hero-section{

    min-height:45vh;

    padding-top:10px; /* REDUCED */
    padding-bottom:25px;

    background-size:
    cover,
    220px,
    220px;

    background-position:
    center,
    left 60%,
    right 60%;
  }

  .hero-text{
    width:90%;
    padding-top:5px; /* REDUCED */
  }

  .hero-text h1{
    font-size:24px;
    line-height:1.3;
  }

  .root{
    transform:scale(.70);
    margin-top:0px;
  }

}

/* ===========================
   MOBILE
=========================== */

@media (max-width: 576px){

  .hero-section{

    min-height:40vh;

    padding-top:5px; /* REDUCED */
    padding-bottom:20px;

    background-size:
    cover,
    140px,
    140px;

    background-position:
    center,
    left 58%,
    right 58%;
  }

  .hero-text{
    width:95%;
    padding-top:0px;
  }

  .hero-text h1{
    font-size:20px;
    line-height:1.3;
  }

  .root{
    transform:scale(.50);
    margin-top:-10px;
  }

}

/* ===========================
   SMALL MOBILE
=========================== */

@media (max-width: 400px){

  .hero-section{

    min-height:35vh;

    background-size:
    cover,
    100px,
    100px;
  }

  .hero-text h1{
    font-size:18px;
  }

  .root{
    transform:scale(.42);
    margin-top:-20px;
  }

}

        /* INNER ICONS */

        .ti1{
          top:calc(50% - 130px);
          left:50%;
        }

        .ti2{
          top:50%;
          left:calc(50% + 130px);
        }

        .ti3{
          top:calc(50% + 130px);
          left:50%;
        }

        .ti4{
          top:50%;
          left:calc(50% - 130px);
        }

        /* OUTER ICONS */

        .to1{
          top:calc(50% - 210px);
          left:50%;
        }

        .to2{
          top:50%;
          left:calc(50% + 210px);
        }

        .to3{
          top:calc(50% + 210px);
          left:50%;
        }

        .to4{
          top:50%;
          left:calc(50% - 210px);
        }

        /* CENTER */

        .center{

          position:absolute;

          top:50%;
          left:50%;

          transform:translate(-50%,-50%);

          display:flex;
          flex-direction:column;
          align-items:center;

          gap:8px;

          z-index:20;
        }

        .center-box{

  width:170px;
  height:170px;

  background:transparent;

  border-radius:35px;

  display:flex;
  align-items:center;
  justify-content:center;

  box-shadow:none;

  backdrop-filter:none;
}

.center-box img{
  width:150px;
  object-fit:contain;
}

        .center-label{

          font-size:22px;

          font-weight:700;

          color:#1e2d50;

          white-space:nowrap;
        }

      `}</style>

    </div>
  );
}