import React, {useState} from "react";
import "./AchievementCard.scss";

export default function AchievementCard({cardInfo, isDark}) {
  const [pulseIdx, setPulseIdx] = useState(null);

  function openUrlInNewTab(url, name, i) {
    // Brief pulse for click feedback — previously nothing visually
    // acknowledged the click before the new tab opened.
    setPulseIdx(i);
    setTimeout(() => setPulseIdx(null), 350);
    if (!url) {
      console.log(`URL for ${name} not found`);
      return;
    }
    var win = window.open(url, "_blank");
    win.focus();
  }

  return (
    <div className={isDark ? "dark-mode certificate-card" : "certificate-card"}>
      <div className="certificate-image-div">
        <img
          src={cardInfo.image}
          alt={cardInfo.imageAlt || "Card Thumbnail"}
          className="card-image"
        ></img>
      </div>
      <div className="certificate-detail-div">
        <h5 className={isDark ? "dark-mode card-title" : "card-title"}>
          {cardInfo.title}
        </h5>
        <p className={isDark ? "dark-mode card-subtitle" : "card-subtitle"}>
          {cardInfo.description}
        </p>
      </div>
      <div className="certificate-card-footer">
        {cardInfo.footer.map((v, i) => {
          return (
            <span
              key={i}
              className={[
                "certificate-tag",
                isDark ? "dark-mode" : "",
                pulseIdx === i ? "certificate-tag--pulse" : "",
              ].filter(Boolean).join(" ")}
              onClick={() => openUrlInNewTab(v.url, v.name, i)}
            >
              {v.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}
