"use client";

import { useEffect, useState } from "react";

const MOBILE_MQ = "(max-width: 1023px)";

export function useMobileChromeHidden({
  disabled = false,
  topOffset = 24,
  threshold = 12,
}: {
  disabled?: boolean;
  topOffset?: number;
  threshold?: number;
} = {}) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mq = window.matchMedia(MOBILE_MQ);
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;

      const currentY = window.scrollY;

      if (!mq.matches || disabled) {
        setHidden(false);
        lastY = currentY;
        return;
      }

      if (currentY <= topOffset) {
        setHidden(false);
        lastY = currentY;
        return;
      }

      const difference = currentY - lastY;

      if (Math.abs(difference) < threshold) {
        return;
      }

      setHidden(difference > 0);
      lastY = currentY;
    };

    const scheduleUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    mq.addEventListener("change", scheduleUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      mq.removeEventListener("change", scheduleUpdate);
    };
  }, [disabled, threshold, topOffset]);

  return hidden;
}
