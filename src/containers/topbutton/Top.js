import React, {useState, useEffect} from "react";
import "./Top.scss";

export default function Top() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const scrollFunction = () => {
      setVisible(
        document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
      );
    };
    scrollFunction(); // correct state immediately on mount, no need to wait for window.onload
    window.addEventListener("scroll", scrollFunction, {passive: true});
    return () => window.removeEventListener("scroll", scrollFunction);
  }, []);

  const scrollToTop = () => {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE, Opera
  };

  return (
    <button
      onClick={scrollToTop}
      id="topButton"
      title="Go to top"
      style={{visibility: visible ? "visible" : "hidden"}}
    >
      <i className="fas fa-hand-point-up" aria-hidden="true"></i>
    </button>
  );
}
