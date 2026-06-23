import { useEffect, useState } from "react";
import { getServicesSection } from "../services/api";

function ServiceIcon({ icon }) {
  if (!icon) return null;

  const isImage = /^(https?:\/\/|\/|data:image)/i.test(icon);

  if (isImage) {
    return (
      <div className="icon">
        <img src={icon} alt="" />
      </div>
    );
  }

  return <div className="icon">{icon}</div>;
}

export default function ServicesSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getServicesSection().then(setData).catch(console.error);
  }, []);

  if (!data) return null;

  return (
    <div className="services-section">

      {/* LEFT CONTENT */}
      <div className="services-left">

        <span className="small-title">
          {data.smallTitle}
        </span>

        <h2
          dangerouslySetInnerHTML={{
            __html: (data.heading || "").replace(/\n/g, "<br />"),
          }}
        />

        <p>
          {data.description}
        </p>

        {data.description2 && (
          <p>
            {data.description2}
          </p>
        )}

        <button>
          {data.buttonText}
        </button>

      </div>

      {/* RIGHT CARDS */}
      <div className="services-right">

        {data.services?.map((service, index) => (
          <div
            key={index}
            className={`service-card ${
              index % 2 === 0 ? "blue" : "light"
            }`}
          >
            <ServiceIcon icon={service.icon} />

            <h3>
              {service.title}
            </h3>

            <p>
              {service.description}
            </p>
          </div>
        ))}

      </div>
      <style>{`

/* =========================
   SECTION
========================= */

.services-section{

  width:100%;

  background:white;

  padding:70px 5%;

  display:flex;

  justify-content:space-between;

  align-items:flex-start;

  gap:50px;

  overflow:hidden;
}

/* =========================
   LEFT SIDE
========================= */

.services-left{

  flex:1;

  max-width:560px;
}

.small-title{

  display:block;

  font-size:14px;

  font-weight:700;

  color:#1f2937;

  margin-bottom:12px;

  text-transform:uppercase;

  letter-spacing:1px;
}

.services-left h2{

  font-size:clamp(34px, 4vw, 52px);

  line-height:1.15;

  color:#1f2937;

  margin-bottom:20px;

  font-weight:800;
}

.services-left p{

  font-size:16px;

  line-height:1.8;

  color:#374151;

  margin-bottom:22px;
}

.services-left button{

  padding:14px 24px;

  background:#111827;

  color:white;

  border:none;

  border-radius:10px;

  font-size:15px;

  font-weight:700;

  cursor:pointer;

  transition:0.3s;
}

.services-left button:hover{

  background:#2563eb;

  transform:translateY(-4px);
}

/* =========================
   RIGHT SIDE
========================= */

.services-right{

  flex:1;

  display:grid;

  grid-template-columns:repeat(2, minmax(240px, 1fr));

  gap:20px;

  max-width:600px;
}

/* =========================
   CARD
========================= */

.service-card{

  padding:28px 24px;

  border-radius:20px;

  min-height:240px;

  transition:0.35s;

  box-shadow:0 8px 20px rgba(0,0,0,0.06);
}

.service-card:hover{

  transform:translateY(-8px);
}

.service-card.blue{

  background:#3b82f6;

  color:white;
}

.service-card.light{

  background:#dfe3f3;

  color:#1f2937;
}

/* =========================
   ICON
========================= */

.icon{

  font-size:32px;

  margin-bottom:18px;
}

/* =========================
   TITLE
========================= */

.service-card h3{

  font-size:26px;

  line-height:1.2;

  margin-bottom:14px;

  font-weight:800;
}

/* =========================
   TEXT
========================= */

.service-card p{

  font-size:15px;

  line-height:1.7;
}

/* =========================
   LARGE LAPTOP
========================= */

@media(max-width:1200px){

  .services-section{

    padding:60px 4%;
  }

  .services-right{

    max-width:560px;
  }

  .service-card{

    min-height:220px;
  }

}

/* =========================
   TABLET
========================= */

@media(max-width:992px){

  .services-section{

    flex-direction:column;

    align-items:center;

    gap:40px;
  }

  .services-left{

    max-width:100%;

    text-align:center;
  }

  .services-right{

    width:100%;

    max-width:750px;
  }

  .services-left h2{

    max-width:100%;
  }

}

/* =========================
   MOBILE
========================= */

@media(max-width:768px){

  .services-section{

    padding:50px 20px;
  }

  .services-right{

    grid-template-columns:1fr;
  }

  .services-left h2{

    font-size:32px;
  }

  .services-left p{

    font-size:15px;
  }

  .service-card{

    min-height:auto;

    padding:24px 20px;
  }

  .service-card h3{

    font-size:22px;
  }

  .service-card p{

    font-size:14px;
  }

}

/* =========================
   SMALL MOBILE
========================= */

@media(max-width:480px){

  .services-section{

    padding:40px 16px;
  }

  .services-left h2{

    font-size:28px;
  }

  .services-left p{

    font-size:14px;

    line-height:1.7;
  }

  .services-left button{

    width:100%;
  }

  .service-card{

    padding:20px 18px;
  }

  .icon{

    font-size:28px;
  }

  .service-card h3{

    font-size:20px;
  }

}

/* =========================
   VERY SMALL MOBILE
========================= */

@media(max-width:360px){

  .services-left h2{

    font-size:24px;
  }

  .services-left p{

    font-size:13px;
  }

  .service-card h3{

    font-size:18px;
  }

  .service-card p{

    font-size:13px;
  }

}

      `}</style>

    </div>
  );
}