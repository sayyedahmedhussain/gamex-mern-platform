import { useEffect, useState } from "react";
import { getDirectorMessage } from "../services/api";

export default function DirectorMessage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDirectorMessage()
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data) return null;

  return (
    <section className="director-section">

      {/* LEFT CONTENT */}

      <div className="director-left">

        <span className="director-small-title">
          {data.smallTitle}
        </span>

        <h2
          style={{ whiteSpace: "pre-line" }}
        >
          {data.directorName}
        </h2>

       <p
  className="director-message"
  dangerouslySetInnerHTML={{ __html: data.message }}
/>

        <div className="director-signature">
          {data.signatureName}
        </div>

        <span className="director-role">
          {data.designation}
        </span>

      </div>

      {/* RIGHT IMAGE */}

      <div className="director-right">

        <img
          src={data.directorImage}
          alt={data.directorName}
        />

      </div>


      <style>{`

/* =========================
   SECTION
========================= */

.director-section{

  width:100%;

  background:#f5f5f5;

  padding:80px 5%;

  display:flex;

  justify-content:space-between;

  align-items:center;

  gap:50px;

  overflow:hidden;
}

/* =========================
   LEFT
========================= */

.director-left{

  flex:1.2;

  max-width:750px;
}

.director-small-title{

  display:inline-block;

  font-size:14px;

  font-weight:700;

  color:#2563eb;

  margin-bottom:20px;

  text-transform:uppercase;

  letter-spacing:1px;
}

.director-left h2{

  font-size:clamp(30px,4vw,52px);

  font-weight:700;

  color:#1f2937;

  line-height:1.15;

  margin-bottom:20px;
}

/* =========================
   MESSAGE
========================= */

.director-message{

  font-size:16px;

  line-height:1.9;

  color:#374151;

  margin-bottom:25px;

  max-width:700px;
}

.quote-icon{

  font-size:40px;

  font-weight:800;

  color:#111827;

  margin-right:8px;

  position:relative;

  top:5px;
}

/* =========================
   SIGNATURE
========================= */

.director-signature{

  font-size:clamp(22px,3vw,34px);

  font-family:cursive;

  color:#111827;

  margin-bottom:8px;
}

.director-role{

  font-size:15px;

  color:#6b7280;

  font-weight:500;
}

/* =========================
   RIGHT IMAGE
========================= */

.director-right{

  flex:1;

  display:flex;

  justify-content:center;

  align-items:center;
}

.director-right img{

  width:100%;

  max-width:420px;

  height:auto;

  display:block;

  border-radius:30px;

  object-fit:cover;

  box-shadow:0 12px 35px rgba(0,0,0,0.12);
}

/* =========================
   LAPTOP
========================= */

@media(max-width:1200px){

  .director-section{

    gap:40px;
  }

  .director-right img{

    max-width:360px;
  }

}

/* =========================
   TABLET
========================= */

@media(max-width:992px){

  .director-section{

    flex-direction:column-reverse;

    text-align:center;

    padding:70px 30px;

    gap:35px;
  }

  .director-left{

    max-width:100%;
  }

  .director-message{

    max-width:100%;
  }

  .director-right{

    width:100%;
  }

  .director-right img{

    max-width:450px;
  }

}

/* =========================
   MOBILE
========================= */

@media(max-width:768px){

  .director-section{

    padding:60px 20px;
  }

  .director-message{

    font-size:15px;

    line-height:1.8;
  }

  .director-signature{

    font-size:28px;
  }

  .director-right img{

    max-width:350px;

    border-radius:24px;
  }

}

/* =========================
   SMALL MOBILE
========================= */

@media(max-width:480px){

  .director-section{

    padding:50px 16px;
  }

  .director-message{

    font-size:14px;

    line-height:1.75;
  }

  .quote-icon{

    font-size:30px;
  }

  .director-signature{

    font-size:24px;
  }

  .director-role{

    font-size:14px;
  }

  .director-right img{

    max-width:100%;

    border-radius:20px;
  }

}

/* =========================
   VERY SMALL MOBILE
========================= */

@media(max-width:360px){

  .director-left h2{

    font-size:24px;
  }

  .director-message{

    font-size:13px;
  }

  .director-signature{

    font-size:20px;
  }

}

      `}</style>

    </section>
  );
}