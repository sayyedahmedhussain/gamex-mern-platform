import { useEffect, useState } from "react";
import { getMovingGames } from "../services/api";

export default function MovingGames() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getMovingGames().then(setData).catch(console.error);
  }, []);

  if (!data) return null;

  return (
    <div className="moving-games-section">

      {/* TITLE */}
      <div className="games-heading">
        <h2
          dangerouslySetInnerHTML={{
            __html: (data.heading || "").replace(/\n/g, "<br />"),
          }}
        />
      </div>

      {/* FIRST ROW */}
      <div className="slider-row">
        <div className="slider-track move-left">
          {[...(data.row1Images || []), ...(data.row1Images || [])].map(
            (img, index) => (
              <div className="game-box" key={index}>
                <img src={img} alt={`Game ${index + 1}`} />
              </div>
            )
          )}
        </div>
      </div>

      {/* SECOND ROW */}
      <div className="slider-row">
        <div className="slider-track move-right">
          {[...(data.row2Images || []), ...(data.row2Images || [])].map(
            (img, index) => (
              <div className="game-box" key={index}>
                <img src={img} alt={`Game ${index + 1}`} />
              </div>
            )
          )}
        </div>
      </div>

      <style>{`

/* =========================
   SECTION
========================= */

.moving-games-section{

  width:100%;

  background:#f4f4f4;

  padding:90px 0;

  overflow:hidden;
}

/* =========================
   HEADING
========================= */

.games-heading{

  text-align:center;

  margin-bottom:60px;

  padding:0 20px;
}

.games-heading h2{

  font-size:clamp(30px, 4vw, 52px);

  line-height:1.15;

  font-weight:700;

  color:#1f2937;

  margin:0;
}

/* =========================
   ROW
========================= */

.slider-row{

  width:100%;

  overflow:hidden;

  margin-bottom:25px;
}

/* =========================
   TRACK
========================= */

.slider-track{

  display:flex;

  align-items:center;

  gap:22px;

  width:max-content;
}

/* =========================
   ANIMATION
========================= */

.move-left{

  animation:moveLeft 80s linear infinite;
}

.move-right{

  animation:moveRight 80s linear infinite;
}

@keyframes moveLeft{

  from{
    transform:translateX(0);
  }

  to{
    transform:translateX(-50%);
  }
}

@keyframes moveRight{

  from{
    transform:translateX(-50%);
  }

  to{
    transform:translateX(0);
  }
}

/* =========================
   CARD
========================= */

.game-box{

  width:110px;
  height:110px;

  border-radius:28px;

  overflow:hidden;

  flex-shrink:0;

  background:white;

  box-shadow:0 6px 16px rgba(0,0,0,0.12);

  transition:0.3s;
}

.game-box:hover{

  transform:translateY(-8px);
}

.game-box img{

  width:100%;
  height:100%;

  object-fit:cover;

  display:block;
}

/* =========================
   LAPTOP
========================= */

@media(max-width:1200px){

  .game-box{

    width:100px;
    height:100px;
  }

  .slider-track{

    gap:18px;
  }

}

/* =========================
   TABLET
========================= */

@media(max-width:992px){

  .moving-games-section{

    padding:75px 0;
  }

  .games-heading{

    margin-bottom:50px;
  }

  .game-box{

    width:90px;
    height:90px;

    border-radius:24px;
  }

  .slider-track{

    gap:16px;
  }

}

/* =========================
   MOBILE
========================= */

@media(max-width:768px){

  .moving-games-section{

    padding:60px 0;
  }

  .games-heading{

    margin-bottom:40px;
  }

  .slider-track{

    gap:14px;
  }

  .game-box{

    width:78px;
    height:78px;

    border-radius:20px;
  }

  .move-left{

    animation:moveLeft 60s linear infinite;
  }

  .move-right{

    animation:moveRight 60s linear infinite;
  }

}

/* =========================
   SMALL MOBILE
========================= */

@media(max-width:480px){

  .moving-games-section{

    padding:50px 0;
  }

  .games-heading{

    margin-bottom:30px;
  }

  .game-box{

    width:68px;
    height:68px;

    border-radius:18px;
  }

  .slider-track{

    gap:12px;
  }

}

/* =========================
   VERY SMALL MOBILE
========================= */

@media(max-width:360px){

  .game-box{

    width:58px;
    height:58px;

    border-radius:14px;
  }

  .slider-track{

    gap:10px;
  }

}

      `}</style>

    </div>
  );
}
