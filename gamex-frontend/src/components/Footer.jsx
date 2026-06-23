import { useEffect, useState } from "react";
import { getFooter } from "../services/api";

export default function Footer() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getFooter()
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data) return null;

  return (
    <footer className="footer-wrapper">

      {/* BLUE BOX */}
      <div className="footer-top-box">

        <h2 style={{ whiteSpace: "pre-line" }}>
          {data.footerTop}
        </h2>

      </div>

      {/* FOOTER */}
      <div className="footer-section">

        <div className="footer-content">

          {/* ABOUT */}
          <div className="footer-col footer-about">

            <img
              src={data.about?.logo}
              alt="logo"
              className="footer-logo"
            />

            <p>
              {data.about?.text}
            </p>

            <div className="socials">

              {data.about?.socials?.map((social, index) => (
                <span key={index}>
                  {social}
                </span>
              ))}

            </div>

          </div>

          {/* LINKS */}
          <div className="footer-col">

            <h3>
              {data.links?.title}
            </h3>

            <ul>

              {data.links?.items?.map((item, index) => (
                <li key={index}>
                  {item}
                </li>
              ))}

            </ul>

          </div>

          {/* SERVICES */}
          <div className="footer-col">

            <h3>
              {data.services?.title}
            </h3>

            <ul>

              {data.services?.items?.map((item, index) => (
                <li key={index}>
                  {item}
                </li>
              ))}

            </ul>

          </div>

          {/* CONTACT */}
          <div className="footer-col">

            <h3>
              {data.contact?.title}
            </h3>

            <ul className="contact-list">

              {data.contact?.items?.map((item, index) => (
                <li key={index}>
                  {item}
                </li>
              ))}

            </ul>

          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="footer-bottom">

          {data.copyright}

        </div>

      </div>

      {/* CSS */}
      <style>{`

  .footer-wrapper{

    width:100%;

    background:#ffffff;

    position:relative;

    padding-top:85px;

    overflow:hidden;
   
  }

  /* BLUE BOX */

  .footer-top-box{

    width:88%;

    max-width:950px;

    background:#4a7df0;

    border-radius:8px;

    padding:28px 34px;

    margin:auto;

    position:absolute;

    top:0;

    left:50%;

    transform:translateX(-50%);

    z-index:10;

    box-shadow:0 10px 28px rgba(0,0,0,0.18);
  }

  .footer-top-box h2{

    color:white;

    font-size:24px;

    font-weight:800;

    text-align:center;

    line-height:1.6;

    margin:0;
  }

  /* BLACK FOOTER */

  .footer-section{

    width:100%;

    background:
    linear-gradient(
    to right,
    #1c2128,
    #20262d,
    #1a1f25
    );

    padding-top:90px;

    overflow:hidden;
  }

  /* CONTENT */

  .footer-content{

    width:100%;

    max-width:1350px;

    margin:auto;

    padding:0 40px 45px;

    display:grid;

    grid-template-columns:
    1.1fr
    0.9fr
    1.1fr
    1.2fr;

    gap:40px;

    color:white;
  }

  /* COLUMN */

  .footer-col h3{

    font-size:19px;

    margin-bottom:18px;

    font-weight:700;
  }

  .footer-col ul{

    list-style:none;

    padding:0;
    margin:0;
    
  }

  .footer-col ul li{

    margin-bottom:10px;

    font-size:15px;

    line-height:1.3;

    color:#ffffff;
  }

  /* ABOUT */

  .footer-about{

    max-width:250px;
  }

  .footer-logo{

    width:100px;

    margin-bottom:15px;
  }

  .footer-about p{

    font-size:15px;

    line-height:1.7;

    color:#ffffff;

    margin-bottom:18px;
  }

  /* SOCIAL */

  .socials{

    display:flex;

    gap:15px;
  }

  .socials span{

    font-size:20px;

    font-weight:700;

    cursor:pointer;

    transition:0.3s;
  }

  .socials span:hover{

    transform:translateY(-4px);

    color:#4a7df0;
  }

  /* CONTACT */

  .contact-list li{

    margin-bottom:15px;
  }

  /* COPYRIGHT */

  .footer-bottom{

    width:100%;

    background:#0d0f12;

    color:white;

    text-align:center;

    padding:15px 18px;

    font-size:14px;

    font-weight:600;
  }

  /* TABLET */

  @media(max-width:992px){

    .footer-wrapper{

      padding-top:75px;
    }

    .footer-top-box{

      width:92%;

      padding:24px 20px;
    }

    .footer-top-box h2{

      font-size:20px;
    }

    .footer-content{

      grid-template-columns:
      repeat(2,1fr);

      gap:35px;

      padding:0 25px 40px;
    }
  }

  /* MOBILE */

  @media(max-width:576px){

    .footer-wrapper{

      padding-top:65px;
    }

    .footer-top-box{

      width:94%;

      padding:20px 16px;
    }

    .footer-top-box h2{

      font-size:16px;

      line-height:1.6;
    }

    .footer-section{

      padding-top:75px;
    }

    .footer-content{

      grid-template-columns:1fr;

      gap:30px;

      padding:0 18px 35px;
    }

    .footer-about{

      max-width:100%;
    }

    .footer-col h3{

      font-size:18px;
    }

    .footer-col ul li{

      font-size:14px;
    }

    .footer-about p{

      font-size:14px;
    }
  }

`}</style>

    </footer>
  );
}