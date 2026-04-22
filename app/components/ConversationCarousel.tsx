"use client";

import { useState, useRef, useEffect } from "react";

const screens = [
  { src: "/videos/lesson_walkthrough_sound.mp4", label: "Lesson walkthrough", hasSound: true, delay: 3000 },
  { src: "/videos/exercise_edited.mp4", label: "Exercise demo", hasSound: true, delay: 0 },
];

export default function ConversationCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [delaying, setDelaying] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const touchStart = useRef(0);

  // Initial delay for first video
  useEffect(() => {
    const v = videoRefs.current[0];
    if (v) v.pause();
    const timer = setTimeout(() => {
      if (v) v.play();
      setDelaying(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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

  function toggleMute(e: React.MouseEvent) {
    e.stopPropagation();
    videoRefs.current.forEach((v) => {
      if (v) v.muted = !muted;
    });
    setMuted(!muted);
  }

  function goTo(index: number) {
    setCurrent(index);
    setPaused(false);
    setDelaying(false);
    videoRefs.current.forEach((v, idx) => {
      if (!v) return;
      v.currentTime = 0;
      if (idx === index) v.play();
      else v.pause();
    });
  }

  const currentScreen = screens[current];

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Sound toggle above phone */}
      {currentScreen.hasSound && (
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
          style={{ background: "rgba(0,0,0,0.08)" }}
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      )}

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
            if (diff > 50 && current < screens.length - 1) goTo(current + 1);
            if (diff < -50 && current > 0) goTo(current - 1);
          }}
        >
          {screens.map((screen, i) => (
            <div key={i} className="w-[260px] flex-shrink-0 h-full relative">
              <video
                ref={(el) => { videoRefs.current[i] = el; }}
                className="w-full h-full object-cover cursor-pointer"
                src={screen.src}
                loop
                muted
                playsInline
                onClick={() => togglePlay(i)}
              />
            </div>
          ))}
        </div>

        {/* "Turn sound on!" center text when muted */}
        {currentScreen.hasSound && muted && !paused && !delaying && (
          <div
            className="absolute inset-0 flex items-center justify-center z-[5] cursor-pointer"
            onClick={toggleMute}
          >
            <p
              className="text-sm font-semibold px-4 py-2 rounded-full"
              style={{ background: "rgba(0,0,0,0.45)", color: "#fff" }}
            >
              Turn sound on!
            </p>
          </div>
        )}

        {/* Play overlay when paused */}
        {paused && (
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer z-[5]"
            onClick={() => togglePlay(current)}
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
      </div>

      {/* Pagination dots */}
      <div className="flex gap-2">
        {screens.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
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
