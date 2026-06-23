import Navbar from "./components/Navbar";
import HeroOrbit from "./components/HeroOrbit";
import GameSection from "./components/GameSection";
import ServicesSection from "./components/ServicesSection.jsx";
import MovingGames from "./components/MovingGames";
import GrowthSection from "./components/GrowthSection.jsx";
import AchievementSection from "./components/AchievementSection.jsx";
import PicSection from "./components/PicSection.jsx";
import DirectorMessage from "./components/DirectorMessage.jsx";
import PartnersSection from "./components/PartnersSection.jsx";
import Footer from "./components/Footer.jsx";


function App() {
  return (
    <>
      <Navbar />
      <HeroOrbit />
      <GameSection />
      <ServicesSection />
      <MovingGames />
      <GrowthSection/>
      <AchievementSection/>
      <PicSection/>
      <DirectorMessage/>
      <PartnersSection/>
      <Footer/>
      <a
  href="https://wa.me/923005005086"
  className="whatsapp-float"
  target="_blank"
  rel="noreferrer"
>
  <img
    src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
    alt="WhatsApp"
  />
</a>
<style>
  {`
  .whatsapp-float{

  position:fixed;

  right:22px;

  bottom:22px;

  width:68px;
  height:68px;

  border-radius:50%;

  background:#25d366;

  display:flex;
  justify-content:center;
  align-items:center;

  box-shadow:0 8px 25px rgba(0,0,0,0.25);

  z-index:999999;

  transition:0.3s;

  animation:whatsappPop 2s infinite;
}

.whatsapp-float:hover{

  transform:scale(1.12);
}

.whatsapp-float img{

  width:38px;
  height:38px;

  object-fit:contain;
}

/* ANIMATION */

@keyframes whatsappPop{

  0%{
    transform:scale(1);
  }

  50%{
    transform:scale(1.08);
  }

  100%{
    transform:scale(1);
  }
}

/* MOBILE */

@media(max-width:576px){

  .whatsapp-float{

    width:58px;
    height:58px;

    right:16px;
    bottom:16px;
  }

  .whatsapp-float img{

    width:32px;
    height:32px;
  }
}`}
</style>
    </>
  );
}

export default App;