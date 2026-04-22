"use client";

import { useState, useRef } from "react";

const screens = [
  { type: "video" as const, src: "/videos/journey_edited.mp4", label: "Insights review" },
  { type: "video" as const, src: "/videos/silent_curriculum.mp4", label: "Curriculum tracking" },
  { type: "video" as const, src: "/videos/correction_silent_edited.mp4", label: "Correction details" },
];

export default function InsightsCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const touchStart = useRef(0);

  function togglePlay(index: number) {
    const v = videoRefs.current[index];
    if (!v) return;
    if (v.paused) {
      v.play();
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Phone frame */}
      <div
        className="relative w-[260px] rounded-[2rem] overflow-hidden"
        style={{
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          aspectRatio: "9/19.5",
        }}
      >
        <div
          className="absolute inset-0 rounded-[2rem] border pointer-events-none z-10"
          style={{ borderColor: "var(--color-text-muted)" }}
        />

        {/* Slides */}
        <div
          className="flex transition-transform duration-300 ease-out h-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
          onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const diff = touchStart.current - e.changedTouches[0].clientX;
            let next = current;
            if (diff > 50 && current < screens.length - 1) next = current + 1;
            if (diff < -50 && current > 0) next = current - 1;
            if (next !== current) {
              setCurrent(next);
              setPaused(false);
              videoRefs.current.forEach((v, idx) => {
                if (!v) return;
                v.currentTime = 0;
                if (idx === next) v.play();
                else v.pause();
              });
            }
          }}
        >
          {screens.map((screen, i) => (
            <div key={i} className="w-[260px] flex-shrink-0 h-full relative">
              {screen.type === "video" ? (
                <>
                  <video
                    ref={(el) => { videoRefs.current[i] = el; }}
                    className="w-full h-full object-cover cursor-pointer"
                    src={screen.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onClick={() => togglePlay(i)}
                  />
                  {/* Play overlay when paused */}
                  {paused && current === i && (
                    <div
                      className="absolute inset-0 flex items-center justify-center cursor-pointer z-[5]"
                      onClick={() => togglePlay(i)}
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.7)" }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(0,0,0,0.4)">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(180deg, #E8D0D8 0%, #F0D8A0 100%)",
                  }}
                >
                  <p
                    className="text-xs font-medium px-4 text-center"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {screen.label}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex gap-2">
        {screens.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrent(i);
              setPaused(false);
              videoRefs.current.forEach((v, idx) => {
                if (!v) return;
                v.currentTime = 0;
                if (idx === i) v.play();
                else v.pause();
              });
            }}
            className="w-2 h-2 rounded-full transition-all cursor-pointer"
            style={{
              background: i === current ? "var(--color-primary)" : "var(--color-text-muted)",
              opacity: i === current ? 1 : 0.3,
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
