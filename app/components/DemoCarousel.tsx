"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export type DemoScreen = {
  type: "video" | "image" | "placeholder";
  src?: string;
  label: string;
  hasSound?: boolean;
  poster?: string;
};

type DemoCarouselProps = {
  screens: DemoScreen[];
  delay?: number;
};

export default function DemoCarousel({ screens, delay = 0 }: DemoCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const modalTouchStartX = useRef(0);
  const modalTouchStartY = useRef(0);

  const anyHasSound = screens.some((s) => s.hasSound);
  const anyVideo = screens.some((s) => s.type === "video");
  const currentScreen = screens[current];

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    videoRefs.current.forEach((v, idx) => {
      if (!v) return;
      v.currentTime = 0;
      if (idx === index) {
        v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      } else {
        v.pause();
      }
    });
  }, []);

  // Reset all videos to beginning on mount, no autoplay
  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (v) {
        v.pause();
        v.currentTime = 0;
      }
    });
    setCurrent(0);
    setPlaying(false);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (expanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [expanded]);

  // Sync modal video when expanded opens
  useEffect(() => {
    if (expanded && modalVideoRef.current) {
      modalVideoRef.current.currentTime = 0;
      modalVideoRef.current.muted = muted;
      modalVideoRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [expanded, current, muted]);

  function isMobile() {
    return window.innerWidth < 640;
  }

  function handlePlayTap() {
    if (isMobile()) {
      setExpanded(true);
    } else {
      const v = videoRefs.current[current];
      if (!v) return;
      if (v.paused) {
        v.play().then(() => setPlaying(true)).catch(() => {});
      } else {
        v.pause();
        setPlaying(false);
      }
    }
  }

  function closeModal() {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setExpanded(false);
    setPlaying(false);
  }

  function toggleMute(e: React.MouseEvent) {
    e.stopPropagation();
    const newMuted = !muted;
    videoRefs.current.forEach((v) => {
      if (v) v.muted = newMuted;
    });
    if (modalVideoRef.current) modalVideoRef.current.muted = newMuted;
    setMuted(newMuted);
  }

  function handleModalVideoEnded() {
    if (current < screens.length - 1) {
      setCurrent(current + 1);
    } else {
      setPlaying(false);
    }
  }

  function modalGoTo(index: number) {
    setCurrent(index);
  }

  return (
    <>
      <div className="flex flex-col items-center gap-3">
        {/* Sound toggle above phone */}
        {anyHasSound && (
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

        {/* Phone frame with arrows (thumbnail) */}
        <div className="flex items-center gap-2 sm:hidden">
          {screens.length > 1 && (
            <button
              className="w-6 h-6 flex items-center justify-center cursor-pointer"
              style={{ visibility: current > 0 ? "visible" : "hidden" }}
              onClick={() => goTo(current - 1)}
              aria-label="Previous"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}
        <div
          className="relative w-[160px] sm:w-[240px] md:w-[260px] rounded-[2rem] overflow-hidden touch-pan-y"
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
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
              touchStartY.current = e.touches[0].clientY;
            }}
            onTouchEnd={(e) => {
              const diffX = touchStartX.current - e.changedTouches[0].clientX;
              const diffY = touchStartY.current - e.changedTouches[0].clientY;
              if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
                if (diffX > 0 && current < screens.length - 1) goTo(current + 1);
                if (diffX < 0 && current > 0) goTo(current - 1);
              }
            }}
          >
            {screens.map((screen, i) => (
              <div key={i} className="w-[160px] sm:w-[240px] md:w-[260px] flex-shrink-0 h-full relative">
                {screen.type === "video" && screen.src ? (
                  <video
                    ref={(el) => { videoRefs.current[i] = el; }}
                    className="w-full h-full object-cover cursor-pointer"
                    src={screen.src}
                    poster={screen.poster}
                    onClick={handlePlayTap}
                    muted
                    playsInline
                    preload="auto"
                    onEnded={() => {
                      if (i < screens.length - 1) {
                        goTo(i + 1);
                      } else {
                        setPlaying(false);
                      }
                    }}
                  />
                ) : screen.type === "image" && screen.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={screen.src}
                    alt={screen.label}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={handlePlayTap}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: "linear-gradient(180deg, #E8D0D8 0%, #F0D8A0 100%)" }}
                  >
                    <p className="text-xs font-medium px-4 text-center" style={{ color: "var(--color-text-muted)" }}>
                      {screen.label}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Paused → play button (videos only) */}
          {anyVideo && !playing && !expanded && (
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer z-[5]"
              onClick={handlePlayTap}
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

          {/* Playing + muted → "Turn sound on!" */}
          {playing && muted && !expanded && currentScreen.hasSound && (
            <div
              className="absolute inset-0 flex items-center justify-center z-[5] cursor-pointer"
              onClick={toggleMute}
            >
              <p
                className="text-sm font-semibold px-4 py-2 rounded-full"
                style={{ background: "rgba(255,255,255,0.7)", color: "rgba(0,0,0,0.4)" }}
              >
                Turn sound on!
              </p>
            </div>
          )}
        </div>
          {screens.length > 1 && (
            <button
              className="w-6 h-6 flex items-center justify-center cursor-pointer"
              style={{ visibility: current < screens.length - 1 ? "visible" : "hidden" }}
              onClick={() => goTo(current + 1)}
              aria-label="Next"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
        </div>

        {/* Pagination dots */}
        {screens.length > 1 && (
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
        )}
      </div>

      {/* ── Fullscreen modal (mobile only) ── */}
      {expanded && currentScreen.src && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={closeModal}
        >
          <div className="min-h-full flex flex-col items-center justify-center py-4">
          {/* Controls above the phone */}
          <div
            className="flex items-center justify-end gap-3 w-full px-6 mb-3"
            style={{ maxWidth: "min(75vw, 300px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mute toggle (videos only) */}
            {anyVideo && (
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
                style={{ background: "rgba(255,255,255,0.2)" }}
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </button>
            )}

            {/* Close */}
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
              style={{ background: "rgba(255,255,255,0.2)" }}
              onClick={closeModal}
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Phone frame with arrows */}
          <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            {/* Left arrow */}
            {screens.length > 1 && (
              <button
                className="w-8 h-8 flex items-center justify-center cursor-pointer"
                style={{ visibility: current > 0 ? "visible" : "hidden" }}
                onClick={() => modalGoTo(current - 1)}
                aria-label="Previous"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}

          <div
            className="relative rounded-[2.5rem] overflow-hidden"
            style={{
              width: "min(75vw, 300px)",
              aspectRatio: "9/19.5",
              boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
            }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              modalTouchStartX.current = e.touches[0].clientX;
              modalTouchStartY.current = e.touches[0].clientY;
            }}
            onTouchEnd={(e) => {
              const diffX = modalTouchStartX.current - e.changedTouches[0].clientX;
              // Horizontal swipe → navigate
              if (Math.abs(diffX) > 50) {
                if (diffX > 0 && current < screens.length - 1) modalGoTo(current + 1);
                if (diffX < 0 && current > 0) modalGoTo(current - 1);
              }
            }}
          >
            <div
              className="absolute inset-0 rounded-[2.5rem] border pointer-events-none z-10"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            />
            {currentScreen.type === "video" ? (
              <>
                <video
                  ref={modalVideoRef}
                  key={currentScreen.src}
                  className="w-full h-full object-cover"
                  src={currentScreen.src}
                  muted={muted}
                  playsInline
                  autoPlay
                  onEnded={handleModalVideoEnded}
                />
                {/* Tap to play/pause overlay (invisible, always active) */}
                <div
                  className="absolute inset-0 z-[4]"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (modalVideoRef.current) {
                      if (modalVideoRef.current.paused) {
                        modalVideoRef.current.play().then(() => setPlaying(true)).catch(() => {});
                      } else {
                        modalVideoRef.current.pause();
                        setPlaying(false);
                      }
                    }
                  }}
                />

                {/* Paused → play button in modal */}
                {!playing && (
                  <div
                    className="absolute inset-0 flex items-center justify-center z-[5] pointer-events-none"
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

                {/* Playing + muted → "Turn sound on!" in modal */}
                {playing && muted && currentScreen.hasSound && (
                  <div
                    className="absolute inset-0 flex items-center justify-center z-[5] pointer-events-none"
                  >
                    <p
                      className="text-sm font-semibold px-4 py-2 rounded-full pointer-events-auto cursor-pointer"
                      style={{ background: "rgba(255,255,255,0.7)", color: "rgba(0,0,0,0.4)" }}
                      onClick={(e) => { e.stopPropagation(); toggleMute(e); }}
                    >
                      Turn sound on!
                    </p>
                  </div>
                )}
              </>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentScreen.src}
                alt={currentScreen.label}
                className="w-full h-full object-cover"
              />
            )}
          </div>

            {/* Right arrow */}
            {screens.length > 1 && (
              <button
                className="w-8 h-8 flex items-center justify-center cursor-pointer"
                style={{ visibility: current < screens.length - 1 ? "visible" : "hidden" }}
                onClick={() => modalGoTo(current + 1)}
                aria-label="Next"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </div>

          {/* Pagination dots in modal */}
          {screens.length > 1 && (
            <div className="flex gap-3 mt-4" onClick={(e) => e.stopPropagation()}>
              {screens.map((_, i) => (
                <button
                  key={i}
                  onClick={() => modalGoTo(i)}
                  className="w-2.5 h-2.5 rounded-full transition-all cursor-pointer"
                  style={{
                    background: i === current ? "#fff" : "rgba(255,255,255,0.4)",
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
          </div>
        </div>
      )}
    </>
  );
}
