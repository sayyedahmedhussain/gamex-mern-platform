import { useEffect, useState } from "react";
import { getGameSection } from "../services/api";

export default function GameSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getGameSection().then(setData).catch(console.error);
  }, []);

  if (!data) return null;

  return (
    <section className="games-section">
      {/* LEFT GAMES */}
      <div className="games-side left-side">
        {data.gameImages?.slice(0, 4).map((game, index) => (
          <div className="game-card" key={index}>
            <img src={game} alt={`Game ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* CENTER CONTENT */}
      <div className="games-content">
        <h2>{data.heading}</h2>
        <p>{data.description}</p>

        <div className="game-tags">
          {data.tags?.map((tag, i) => (
            <span key={i}>{tag}</span>
          ))}
        </div>
      </div>

      {/* RIGHT GAMES */}
      <div className="games-side right-side">
        {data.gameImages?.slice(4, 8).map((game, index) => (
          <div className="game-card" key={index}>
            <img src={game} alt={`Game ${index + 5}`} />
          </div>
        ))}
      </div>

      <style>{`

.games-section{
  width:100%;
  min-height:430px;

  background:#071018;

  padding:70px 30px;

  display:flex;
  justify-content:center;
  align-items:center;

  gap:50px;

  overflow:hidden;
  position:relative;
}

/* LEFT + RIGHT SIDE */

.games-side{
  width:240px;

  display:grid;
  grid-template-columns:repeat(2,1fr);

  gap:18px;

  flex-shrink:0;
  z-index:2;
}

/* GAME CARD */

.game-card{
  width:105px;
  height:105px;

  border-radius:28px;

  overflow:hidden;

  background:#111827;

  box-shadow:0 8px 20px rgba(0,0,0,0.35);

  transition:0.4s;
  cursor:pointer;
}

.game-card:hover{
  transform:translateY(-10px) scale(1.05);
}

.game-card img{
  width:100%;
  height:100%;

  object-fit:cover;
}

/* CENTER CONTENT */

.games-content{
  width:100%;
  max-width:620px;

  display:flex;
  flex-direction:column;

  justify-content:center;
  align-items:center;

  text-align:center;

  z-index:2;
}

/* HEADING */

.games-content h2{
  font-size:52px;
  color:white;

  font-weight:900;

  line-height:1.1;

  margin-bottom:18px;
}

/* PARAGRAPH */

.games-content p{
  color:#d1d5db;

  font-size:17px;
  line-height:1.7;

  max-width:560px;

  margin-bottom:28px;
}

/* TAGS */

.game-tags{
  display:flex;

  justify-content:center;
  align-items:center;

  gap:12px;

  flex-wrap:nowrap;

  overflow-x:auto;

  width:100%;

  padding-bottom:5px;

  scrollbar-width:none;
}

.game-tags::-webkit-scrollbar{
  display:none;
}

.game-tags span{
  padding:11px 22px;

  background:white;

  border-radius:999px;

  font-size:14px;
  font-weight:600;

  color:#111827;

  transition:0.3s;

  cursor:pointer;

  flex-shrink:0;
}

.game-tags span:hover{
  transform:translateY(-4px);

  background:#2563eb;
  color:white;
}

/* =========================
   LARGE LAPTOP
========================= */

@media (max-width:1200px){

  .games-content h2{
    font-size:44px;
  }

  .games-side{
    width:210px;
  }

  .game-card{
    width:92px;
    height:92px;
  }

}

/* =========================
   TABLET
========================= */

@media (max-width:992px){

  .games-section{
    gap:25px;
    padding:60px 20px;
  }

  .games-content h2{
    font-size:38px;
  }

  .games-content p{
    font-size:15px;
  }

  .games-side{
    width:180px;
    gap:12px;
  }

  .game-card{
    width:80px;
    height:80px;

    border-radius:22px;
  }

}

/* =========================
   MOBILE
========================= */

@media (max-width:768px){

  .games-section{
    flex-direction:column;

    padding:50px 15px;

    gap:35px;
  }

  .games-content{
    order:1;
  }

  .left-side{
    order:2;
  }

  .right-side{
    order:3;
  }

  .games-content h2{
    font-size:32px;
    line-height:1.15;
  }

  .games-content p{
    font-size:14px;

    line-height:1.6;

    max-width:90%;
  }

  .games-side{
    width:100%;
    max-width:220px;

    justify-content:center;
  }

  .game-card{
    width:75px;
    height:75px;
  }

  .game-tags{
    flex-wrap:wrap;

    overflow:visible;

    gap:10px;
  }

  .game-tags span{
    padding:10px 16px;

    font-size:13px;
  }

}

/* =========================
   SMALL MOBILE
========================= */

@media (max-width:480px){

  .games-section{
    min-height:auto;

    padding:40px 12px;
  }

  .games-content h2{
    font-size:26px;
  }

  .games-content p{
    font-size:13px;
  }

  .games-side{
    max-width:190px;

    gap:10px;
  }

  .game-card{
    width:68px;
    height:68px;

    border-radius:18px;
  }

  .game-tags{
    gap:8px;
  }

  .game-tags span{
    padding:8px 14px;

    font-size:12px;
  }

}

/* =========================
   VERY SMALL MOBILE
========================= */

@media (max-width:360px){

  .games-content h2{
    font-size:22px;
  }

  .games-content p{
    font-size:12px;
  }

  .game-card{
    width:60px;
    height:60px;
  }

  .game-tags span{
    font-size:11px;

    padding:7px 12px;
  }

}

      `}</style>
    </section>
  );
}