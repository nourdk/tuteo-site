"use client";

import { useState, useRef, useEffect } from "react";

export default function VideoPhone({ src, label, hasSound = false, delay = 0 }: { src: string; label: string; hasSound?: boolean; delay?: number }) {
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [delaying, setDelaying] = useState(delay > 0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (delay > 0) {
      const v = videoRef.current;
      if (v) v.pause();
      const timer = setTimeout(() => {
        if (v) v.play();
        setDelaying(false);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  function togglePlay() {
    const v = videoRef.current;
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
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  return (
    <div
      className="relative w-[260px] rounded-[2rem] overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #E8D0D8 0%, #F0D8A0 100%)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        aspectRatio: "9/19.5",
      }}
    >
      <div className="absolute inset-0 rounded-[2rem] border pointer-events-none z-10" style={{ borderColor: "var(--color-text-muted)" }} />
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-[1] cursor-pointer"
        src={src}
        autoPlay={delay === 0}
        loop
        muted
        playsInline
        aria-label={label}
        onClick={togglePlay}
      />

      {/* "Turn sound on!" center text when muted and playing */}
      {hasSound && muted && !paused && (
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

      {/* Sound toggle icon in corner */}
      {hasSound && !paused && (
        <button
          className="absolute bottom-8 right-4 z-[6] w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
          style={{ background: "rgba(0,0,0,0.45)" }}
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      )}

      {/* Play overlay when paused */}
      {paused && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer z-[5]"
          onClick={togglePlay}
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

      {/* Placeholder label */}
      <div className="absolute inset-0 flex items-end justify-center pb-6 z-0">
        <p className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>{label}</p>
      </div>
    </div>
  );
}
