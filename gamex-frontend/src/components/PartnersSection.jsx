import { useEffect, useState } from "react";
import { getPartnersSection } from "../services/api";

export default function PartnersSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getPartnersSection().then(setData).catch(() => {});
  }, []);

  const smallTitle = data?.smallTitle || "Our Partner";
  const heading = data?.heading || "Partners in Success";
  const description =
    data?.description ||
    "We collaborate with industry leaders who share our vision. Together, we drive growth and innovation across the gaming ecosystem while building long-term strategic partnerships.";

  const partners = data?.partners?.length
    ? data.partners
    : [];

  return (
    <section className="partners-section">

      {/* LEFT SIDE */}
      <div className="partners-left">

        <span className="partners-small-title">
          {smallTitle}
        </span>

        <h2>{heading}</h2>

        <p>{description}</p>

      </div>

      {/* RIGHT SIDE */}
      <div className="partners-right">

        {/* ROW 1 (2 items) */}
        <div className="partners-row row-2">
          {partners.slice(0, 2).map((img, i) => (
            <div className="partner-card" key={i}>
              <img src={img} alt="" />
            </div>
          ))}
        </div>

        {/* ROW 2 (3 items) */}
        <div className="partners-row row-3">
          {partners.slice(2, 5).map((img, i) => (
            <div
              className={`partner-card ${i === 2 ? "small-card" : ""}`}
              key={i}
            >
              <img src={img} alt="" />
            </div>
          ))}
        </div>

        {/* ROW 3 (3 items) */}
        <div className="partners-row row-3">
          {partners.slice(5, 8).map((img, i) => (
            <div
              className={`partner-card ${i === 2 ? "small-card" : ""}`}
              key={i}
            >
              <img src={img} alt="" />
            </div>
          ))}
        </div>

        {/* ROW 4 (1 item) */}
        <div className="partners-row row-1">
          {partners[8] && (
            <div className="partner-card bottom-card">
              <img src={partners[8]} alt="" />
            </div>
          )}
        </div>

      </div>

      {/* CSS */}

      <style>{`

        .partners-section{

          width:100%;

          background:#f5f5f5;

          padding:60px 40px;

          display:flex;
          justify-content:space-between;
          align-items:center;

          gap:60px;

          overflow:hidden;
        }

        /* LEFT SIDE */

        .partners-left{

          width:60%;
        }

        .partners-small-title{

          font-size:15px;

          font-weight:700;

          color:#2563eb;

          display:inline-block;

          margin-bottom:18px;
        }

        .partners-left h2{

          font-size:30px;

          line-height:1.15;

          color:#1f2937;

          font-weight:800;

          margin-bottom:20px;
        }

        .partners-left p{

          font-size:16px;

          line-height:1.9;

          color:#4b5563;

          max-width:500px;
        }

        /* RIGHT SIDE */

        .partners-right{

          width:55%;

          display:flex;
          flex-direction:column;

          align-items:center;

          gap:18px;
        }

        /* ROWS */

        .partners-row{

          display:flex;

          justify-content:center;

          gap:18px;

          width:100%;
        }

        .row-2{
          max-width:360px;
        }

        .row-3{
          max-width:520px;
        }

        .row-1{
          max-width:180px;
        }

        /* CARD */

        .partner-card{

          width:150px;
          height:92px;

          background:white;

          border-radius:18px;

          display:flex;
          justify-content:center;
          align-items:center;

          box-shadow:0 3px 12px rgba(0,0,0,0.06);

          transition:0.3s;
        }

        .partner-card:hover{

          transform:translateY(-6px);
        }

        /* SMALL CARD */

        .small-card{

          width:92px;
        }

        /* LAST CARD */

        .bottom-card{

          width:92px;
          height:92px;
        }

        /* IMAGE */

        .partner-card img{

          width:78%;
          height:78%;

          object-fit:contain;
        }

        /* TABLET */

        @media(max-width:992px){

          .partners-section{

            flex-direction:column;

            padding:60px 25px;

            gap:45px;
          }

          .partners-left{

            width:100%;

            text-align:center;
          }

          .partners-left p{

            margin:auto;

            max-width:620px;
          }

          .partners-right{

            width:100%;
          }

          .partners-left h2{

            font-size:38px;
          }
        }

        /* MOBILE */

        @media(max-width:576px){

          .partners-section{

            padding:45px 18px;
          }

          .partners-left h2{

            font-size:28px;
          }

          .partners-left p{

            font-size:15px;

            line-height:1.7;
          }

          .partners-row{

            gap:12px;
          }

          .partner-card{

            width:120px;
            height:78px;
          }

          .small-card{

            width:78px;
          }

          .bottom-card{

            width:78px;
            height:78px;
          }
        }

      `}</style>

    </section>
  );
}