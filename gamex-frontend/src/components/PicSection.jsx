import { useState, useEffect } from "react";
import { getMemorySection } from "../services/api";

export default function AchievementSection() {
  const [activeTab, setActiveTab] = useState("activities");
  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    getMemorySection().then(setData).catch(console.error);
  }, []);

  if (!data) return null;

  const images =
    activeTab === "activities"
      ? data.activityImages || []
      : data.eventImages || [];

  return (
    <section className="memory-section">
      <p className="memory-subtitle">
        {data.subtitle}
      </p>

      <h2 className="memory-title">
        {data.heading}
      </h2>

      <div className="tabs">
        <button
          className={activeTab === "activities" ? "active" : ""}
          onClick={() => setActiveTab("activities")}
        >
          {data.activitiesTabText || "Activities"}
        </button>

        <button
          className={activeTab === "events" ? "active" : ""}
          onClick={() => setActiveTab("events")}
        >
          {data.eventsTabText || "Events"}
        </button>
      </div>

      {/* Top Row */}
      <div className="top-row">
        {images.slice(0, 3).map((img, index) => (
          <div className="image-card" key={index}>
            <img
              src={img}
              alt={`Memory ${index + 1}`}
              onClick={() => setSelectedImage(img)}
            />
          </div>
        ))}
      </div>

      {/* Bottom Row */}
      <div className="bottom-row">
        {images.slice(3).map((img, index) => (
          <div className="image-card" key={index}>
            <img
              src={img}
              alt={`Memory ${index + 4}`}
              onClick={() => setSelectedImage(img)}
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="image-modal"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt=""
            className="modal-image"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="close-btn"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>
        </div>
      )}
      <style>{`
        .memory-section {

  width: 100%;

  padding: 80px 5%;

  text-align: center;

  background: #f5f5f5;
}

/* TITLE */

.memory-subtitle {

  font-size: 15px;

  font-weight: 700;

  color: #4b5563;

  margin-bottom: 10px;
}

.memory-title {

  font-size: clamp(30px, 4vw, 52px);

  font-weight: 800;

  color: #1f2937;

  margin-bottom: 35px;

  line-height: 1.15;
}

/* TABS */

.tabs {

  display: flex;

  justify-content: center;

  gap: 10px;

  margin-bottom: 45px;

  flex-wrap: wrap;
}

.tabs button {

  padding: 12px 24px;

  border: 1px solid #d1d5db;

  background: white;

  cursor: pointer;

  border-radius: 8px;

  font-size: 15px;

  font-weight: 600;

  transition: 0.3s;
}

.tabs button:hover {

  transform: translateY(-2px);
}

.tabs button.active {

  background: #2563eb;

  color: white;

  border-color: #2563eb;
}

/* ROWS */

.top-row,
.bottom-row {

  display: flex;

  justify-content: center;

  gap: 20px;

  margin-bottom: 20px;

  flex-wrap: wrap;
}

/* CARD */

.image-card {

  overflow: hidden;

  border-radius: 16px;

  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}

.image-card img {

  width: 320px;

  height: 320px;

  object-fit: cover;

  display: block;

  cursor: pointer;

  transition: 0.4s;
}

.image-card img:hover {

  transform: scale(1.05);
}

/* MODAL */

.image-modal {

  position: fixed;

  inset: 0;

  background: rgba(0,0,0,0.85);

  display: flex;

  justify-content: center;

  align-items: center;

  z-index: 99999;

  padding: 20px;
}

.modal-image {

  max-width: 90%;

  max-height: 85vh;

  border-radius: 16px;

  object-fit: contain;

  box-shadow: 0 10px 30px rgba(255,255,255,0.15);
}

.close-btn {

  position: absolute;

  top: 20px;

  right: 20px;

  width: 45px;

  height: 45px;

  border: none;

  border-radius: 50%;

  background: white;

  cursor: pointer;

  font-size: 20px;

  font-weight: bold;

  transition: 0.3s;
}

.close-btn:hover {

  transform: scale(1.1);
}

/* =========================
   LAPTOP
========================= */

@media (max-width: 1200px) {

  .image-card img {

    width: 280px;

    height: 280px;
  }

}

/* =========================
   TABLET
========================= */

@media (max-width: 992px) {

  .memory-section {

    padding: 70px 4%;
  }

  .top-row,
  .bottom-row {

    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 18px;

    justify-items: center;
  }

  .image-card img {

    width: 100%;

    max-width: 340px;

    height: 260px;
  }

}

/* =========================
   MOBILE
========================= */

@media (max-width: 768px) {

  .memory-section {

    padding: 60px 20px;
  }

  .memory-title {

    margin-bottom: 25px;
  }

  .tabs {

    margin-bottom: 30px;
  }

  .top-row,
  .bottom-row {

    grid-template-columns: 1fr;
  }

  .image-card {

    width: 100%;
  }

  .image-card img {

    width: 100%;

    max-width: 100%;

    height: 250px;
  }

  .modal-image {

    max-width: 95%;

    max-height: 75vh;
  }

}

/* =========================
   SMALL MOBILE
========================= */

@media (max-width: 480px) {

  .memory-section {

    padding: 50px 16px;
  }

  .tabs button {

    width: 100%;

    max-width: 180px;
  }

  .image-card img {

    height: 220px;
  }

  .close-btn {

    width: 40px;

    height: 40px;

    font-size: 18px;

    top: 15px;

    right: 15px;
  }

}

/* =========================
   VERY SMALL MOBILE
========================= */

@media (max-width: 360px) {

  .memory-title {

    font-size: 24px;
  }

  .image-card img {

    height: 190px;
  }

}
      `}</style>
    </section>
  );
}