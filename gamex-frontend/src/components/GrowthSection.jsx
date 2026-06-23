import React, { useEffect, useState } from "react";
import { getGrowthSection } from "../services/api";

export default function GrowthSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getGrowthSection().then(setData).catch(() => {});
  }, []);

  if (!data) return null;

return (
  <div className="growth-section">

    {/* TOP SECTION */}
    <div className="growth-top">

      {/* LEFT TEXT */}
      <div className="growth-content">

        <h2>{data.heading}</h2>

        <p>{data.description}</p>

      </div>

      {/* RIGHT IMAGE */}
      <div className="growth-image">

        <img
          src={data.mainImage}
          alt=""
        />

      </div>

    </div>

    {/* BOTTOM CARDS */}
    <div className="growth-cards">

      {data.cards?.map((card, index) => (
        <div className="growth-card" key={index}>

          <h3>{card.title}</h3>

          <p>{card.description}</p>

          <img
            src={card.image}
            alt=""
          />

        </div>
      ))}

    </div>

            <style>{`

/* =========================
   SECTION
========================= */

.growth-section{

  width:100%;

  background:#f4f4f4;

  padding:80px 5%;

  display:flex;

  flex-direction:column;

  gap:50px;
}

/* =========================
   TOP SECTION
========================= */

.growth-top{

  display:flex;

  justify-content:space-between;

  align-items:center;

  gap:50px;
}

/* =========================
   CONTENT
========================= */

.growth-content{

  flex:1;

  max-width:580px;
}

.growth-content h2{

  font-size:clamp(32px,4vw,52px);

  line-height:1.15;

  font-weight:700;

  color:#1f2937;

  margin-bottom:22px;

  white-space: pre-line;

}


.growth-content p{

  font-size:16px;

  line-height:1.8;

  color:#4b5563;

  white-space: pre-line;

}

/* =========================
   IMAGE
========================= */

.growth-image{

  flex:1;

  display:flex;

  justify-content:flex-end;
}

.growth-image img{

  width:100%;

  max-width:520px;

  height:280px;

  object-fit:cover;

  border-radius:24px;

  display:block;
}

/* =========================
   CARDS
========================= */

.growth-cards{

  display:grid;

  grid-template-columns:repeat(2,1fr);

  gap:28px;
}

/* =========================
   SINGLE CARD
========================= */

.growth-card{

  background:white;

  border:1px solid #c7d2fe;

  border-radius:28px;

  padding:32px;

  overflow:hidden;

  transition:0.35s;

  display:flex;

  flex-direction:column;

  height:100%;
}

.growth-card:hover{

  transform:translateY(-8px);

  box-shadow:0 10px 25px rgba(0,0,0,0.08);
}

.growth-card h3{

  font-size:clamp(24px,3vw,34px);

  line-height:1.15;

  font-weight:700;

  color:#1f2937;

  margin-bottom:18px;

  white-space: pre-line;

}


.growth-card p{

  font-size:17px;

  line-height:1.8;

  color:#4b5563;

  margin-bottom:25px;

  white-space: pre-line;

}
.growth-card img{

  width:100%;

  height:240px;

  object-fit:cover;

  border-radius:20px;

  margin-top:auto;

  display:block;
}

/* =========================
   LAPTOP
========================= */

@media(max-width:1200px){

  .growth-section{

    padding:70px 4%;
  }

  .growth-image img{

    height:250px;
  }

}

/* =========================
   TABLET
========================= */

@media(max-width:992px){

  .growth-top{

    flex-direction:column;

    align-items:center;

    text-align:center;
  }

  .growth-content{

    max-width:100%;
  }

  .growth-image{

    width:100%;

    justify-content:center;
  }

  .growth-image img{

    max-width:700px;

    height:auto;
  }

  .growth-cards{

    grid-template-columns:1fr;
  }

}

/* =========================
   MOBILE
========================= */

@media(max-width:768px){

  .growth-section{

    padding:60px 20px;

    gap:40px;
  }

  .growth-content p{

    font-size:15px;
  }

  .growth-card{

    padding:24px;
  }

  .growth-card p{

    font-size:15px;
  }

  .growth-card img{

    height:220px;
  }

}

/* =========================
   SMALL MOBILE
========================= */

@media(max-width:480px){

  .growth-section{

    padding:50px 16px;
  }

  .growth-content h2{

    font-size:28px;
  }

  .growth-content p{

    font-size:14px;

    line-height:1.7;
  }

  .growth-card{

    padding:20px;
  }

  .growth-card h3{

    font-size:22px;
  }

  .growth-card p{

    font-size:14px;

    line-height:1.7;
  }

  .growth-card img{

    height:180px;
  }

}

/* =========================
   VERY SMALL MOBILE
========================= */

@media(max-width:360px){

  .growth-content h2{

    font-size:24px;
  }

  .growth-card h3{

    font-size:20px;
  }

  .growth-card p{

    font-size:13px;
  }

  .growth-card img{

    height:160px;
  }

}

      `}</style>

        </div>
    );
}