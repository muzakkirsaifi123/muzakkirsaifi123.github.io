import {useEffect} from "react";

function observeRevealElements() {
  const elements = document.querySelectorAll("[data-reveal]:not(.revealed)");
  if (!elements.length) return () => {};

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    // rootMargin pushes the trigger point: elements must be 8% inside the viewport
    {threshold: 0.08, rootMargin: "0px 0px -8% 0px"}
  );

  elements.forEach(el => observer.observe(el));
  return () => observer.disconnect();
}

/**
 * Watches all [data-reveal] elements via IntersectionObserver.
 * Re-scans after 200ms to catch elements rendered in child effects.
 */
export default function useScrollReveal() {
  useEffect(() => {
    // Immediate scan (catches elements already in DOM after first render)
    let cleanup1 = observeRevealElements();

    // Delayed re-scan (catches elements rendered by child useEffects / Lottie)
    const timer = setTimeout(() => {
      cleanup1();
      cleanup1 = observeRevealElements();
    }, 250);

    return () => {
      clearTimeout(timer);
      cleanup1();
    };
  }, []);
}
