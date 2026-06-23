import { useEffect, useState } from "react";
import { getAchievement } from "../services/api";

const DEFAULT_STATS = [
  {
    icon: "⬇",
    value: "100M+",
    label: "Downloads",
  },
  {
    icon: "👥",
    value: "10M+",
    label: "Active Users",
  },
  {
    icon: "📄",
    value: "70K+",
    label: "Projects Completed",
  },
  {
    icon: "👨‍💻",
    value: "100+",
    label: "Strong Team",
  },
];

function StatIcon({ icon }) {
  if (!icon) return <div className="stat-icon">✨</div>;

  const isImage = /^(https?:\/\/|\/|data:image)/i.test(icon);

  if (isImage) {
    return (
      <div className="stat-icon">
        <img
          src={icon}
          alt=""
          style={{
            width: "28px",
            height: "28px",
            objectFit: "contain",
          }}
        />
      </div>
    );
  }

  return <div className="stat-icon">{icon}</div>;
}

export default function AchievementSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAchievement().then(setData).catch(() => {});
  }, []);

  const smallTitle =
    data?.smallTitle || "Our Achievement";

  const heading =
    data?.heading || "Driven by Passion, Performance.";

  const description =
    data?.description ||
    "Elevate your potential and illuminate success by transforming bold ideas into powerful, results-driven IT achievements.";

  const stats =
    data?.stats?.length
      ? data.stats
      : DEFAULT_STATS;

  return (
    <section className="achievement-section">

      <div className="achievement-box">

        {/* LEFT */}

        <div className="achievement-left">

          <div
            className="small-heading"
            style={{ whiteSpace: "pre-line" }}
          >
            {smallTitle}
          </div>

          <h2 style={{ whiteSpace: "pre-line" }}>
            {heading}
          </h2>

          <p style={{ whiteSpace: "pre-line" }}>
            {description}
          </p>

        </div>

        {/* RIGHT */}

        <div className="achievement-right">

          {stats.map((stat, index) => (
            <div
              className="stat-card"
              key={index}
            >
              <StatIcon icon={stat.icon} />

              <h3
                style={{ whiteSpace: "pre-line" }}
              >
                {stat.value}
              </h3>

              <p
                style={{ whiteSpace: "pre-line" }}
              >
                {stat.label}
              </p>
            </div>
          ))}

        </div>

      </div>


<style>{`

/* =========================
   SECTION
========================= */

.achievement-section{

  width:100%;

  padding:60px 20px;

  background:#f5f5f5;

  display:flex;

  justify-content:center;

  align-items:center;
}

/* =========================
   MAIN BOX
========================= */

.achievement-box{

  width:100%;

  max-width:1200px;

  background:#4379e7;

  border-radius:24px;

  padding:50px 45px;

  display:flex;

  justify-content:space-between;

  align-items:center;

  gap:50px;
}

/* =========================
   LEFT
========================= */

.achievement-left{

  flex:1;

  color:white;
}

.small-heading{

  font-size:14px;

  font-weight:700;

  margin-bottom:16px;

  position:relative;

  display:inline-block;
}

.small-heading::after{

  content:"";

  position:absolute;

  top:50%;

  left:100%;

  margin-left:12px;

  width:60px;

  height:1px;

  background:rgba(255,255,255,0.6);
}

.achievement-left h2{

  font-size:clamp(30px,4vw,52px);

  line-height:1.15;

  margin-bottom:18px;

  font-weight:700;
}

.achievement-left p{

  font-size:16px;

  line-height:1.8;

  color:rgba(255,255,255,0.92);

  max-width:500px;
}

/* =========================
   RIGHT
========================= */

.achievement-right{

  flex:1;

  display:grid;

  grid-template-columns:repeat(2,1fr);

  position:relative;
}

/* CENTER LINES */

.achievement-right::before{

  content:"";

  position:absolute;

  top:50%;

  left:0;

  width:100%;

  height:1px;

  background:rgba(255,255,255,0.35);

  transform:translateY(-50%);
}

.achievement-right::after{

  content:"";

  position:absolute;

  top:0;

  left:50%;

  width:1px;

  height:100%;

  background:rgba(255,255,255,0.35);

  transform:translateX(-50%);
}

/* =========================
   CARD
========================= */

.stat-card{

  min-height:140px;

  display:flex;

  flex-direction:column;

  justify-content:center;

  align-items:center;

  text-align:center;

  color:white;

  padding:15px;
}

.stat-icon{

  font-size:28px;

  margin-bottom:10px;
}

.stat-card h3{

  font-size:clamp(26px,3vw,40px);

  font-weight:800;

  margin-bottom:6px;
}

.stat-card p{

  font-size:15px;

  color:rgba(255,255,255,0.95);
}

/* =========================
   TABLET
========================= */

@media(max-width:992px){

  .achievement-box{

    flex-direction:column;

    text-align:center;

    padding:40px 30px;

    gap:35px;
  }

  .achievement-left{

    width:100%;
  }

  .achievement-left p{

    margin:auto;
  }

  .small-heading::after{

    display:none;
  }

  .achievement-right{

    width:100%;
  }

}

/* =========================
   MOBILE
========================= */

@media(max-width:768px){

  .achievement-section{

    padding:40px 16px;
  }

  .achievement-box{

    padding:30px 22px;

    border-radius:20px;
  }

  .achievement-left p{

    font-size:15px;
  }

  .stat-card{

    min-height:120px;
  }

}

/* =========================
   SMALL MOBILE
========================= */

@media(max-width:576px){

  .achievement-right{

    grid-template-columns:1fr;
  }

  .achievement-right::before,

  .achievement-right::after{

    display:none;
  }

  .stat-card{

    border-bottom:1px solid rgba(255,255,255,0.25);

    min-height:110px;
  }

  .stat-card:last-child{

    border-bottom:none;
  }

  .stat-icon{

    font-size:24px;
  }

  .stat-card h3{

    font-size:28px;
  }

  .stat-card p{

    font-size:14px;
  }

}

/* =========================
   VERY SMALL MOBILE
========================= */

@media(max-width:360px){

  .achievement-left h2{

    font-size:24px;
  }

  .achievement-left p{

    font-size:13px;
  }

  .stat-card h3{

    font-size:24px;
  }

}

`}</style>

    </section>
  );
}