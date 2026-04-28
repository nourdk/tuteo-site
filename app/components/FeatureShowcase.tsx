"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type Slide = {
  type: "video" | "image";
  src: string;
  poster?: string;
  hasSound?: boolean;
  title: React.ReactNode;
  description: React.ReactNode;
};

type FeatureShowcaseProps = {
  id?: string;
  sectionTitle: React.ReactNode;
  slides: Slide[];
  background?: string;
};

export default function FeatureShowcase({ id, sectionTitle, slides, background }: FeatureShowcaseProps) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const modalTouchStartX = useRef(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const currentSlide = slides[current];
  const anyVideo = slides.some((s) => s.type === "video");

  const goTo = useCallback((index: number) => {
    // Pause all videos when switching slides
    videoRefs.current.forEach((v) => {
      if (v) { v.pause(); v.currentTime = 0; }
    });
    setPlaying(false);
    setCurrent(index);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (v) { v.pause(); v.currentTime = 0; }
    });
    setCurrent(0);
    setPlaying(false);
  }, []);

  useEffect(() => {
    if (expanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [expanded]);

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
    if (modalVideoRef.current) modalVideoRef.current.pause();
    setExpanded(false);
    setPlaying(false);
  }

  function toggleMute(e: React.MouseEvent) {
    e.stopPropagation();
    const newMuted = !muted;
    videoRefs.current.forEach((v) => { if (v) v.muted = newMuted; });
    if (modalVideoRef.current) modalVideoRef.current.muted = newMuted;
    setMuted(newMuted);
  }

  function modalGoTo(index: number) {
    setCurrent(index);
  }

  return (
    <>
      <section id={id} className="px-5 py-8 sm:py-12 md:py-16" style={background ? { background } : undefined}>
        <div className="mx-auto max-w-5xl">
          {/* Section title */}
          <h2
            className="text-xl sm:text-3xl md:text-4xl font-medium mb-4 sm:mb-6 text-left"
            style={{ color: "var(--color-text)" }}
          >
            {sectionTitle}
          </h2>

          {/* Card */}
          <div
            className="rounded-2xl overflow-hidden w-full"
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
            }}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
              touchStartY.current = e.touches[0].clientY;
            }}
            onTouchEnd={(e) => {
              const diffX = touchStartX.current - e.changedTouches[0].clientX;
              const diffY = touchStartY.current - e.changedTouches[0].clientY;
              if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
                if (diffX > 0 && current < slides.length - 1) goTo(current + 1);
                if (diffX < 0 && current > 0) goTo(current - 1);
              }
            }}
          >
            {/* Card content: phone + text */}
            <div className="flex flex-col md:flex-row md:items-center">
              {/* Phone side */}
              <div className="flex-shrink-0 flex justify-center items-center p-6 sm:p-8 md:py-12 md:pl-36 md:pr-4">
                  <div
                    className="relative w-[180px] sm:w-[200px] md:w-[220px] rounded-[2rem] overflow-hidden"
                    style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)", aspectRatio: "9/19.5" }}
                  >
                    <div className="absolute inset-0 rounded-[2rem] border pointer-events-none z-10" style={{ borderColor: "var(--color-text-muted)" }} />

                    {/* Slides */}
                    <div
                      className="flex transition-transform duration-300 ease-out h-full"
                      style={{ transform: `translateX(-${current * 100}%)` }}
                    >
                      {slides.map((slide, i) => (
                        <div key={i} className="w-[180px] sm:w-[200px] md:w-[220px] flex-shrink-0 h-full relative" style={{ background: "linear-gradient(180deg, #F5E8ED 0%, #F9F0DA 100%)" }}>
                          {slide.type === "video" ? (
                            <video
                              ref={(el) => { videoRefs.current[i] = el; }}
                              className="w-full h-full object-cover cursor-pointer"
                              src={slide.src}
                              poster={slide.poster}
                              onClick={handlePlayTap}
                              muted
                              playsInline
                              preload="auto"
                              onEnded={() => setPlaying(false)}
                            />
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={slide.src}
                              alt=""
                              className="w-full h-full object-cover cursor-pointer"
                              onClick={handlePlayTap}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Play overlay */}
                    {anyVideo && !playing && !expanded && (
                      <div className="absolute inset-0 flex items-center justify-center cursor-pointer z-[5]" onClick={handlePlayTap}>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.7)" }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(0,0,0,0.4)">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Sound on overlay */}
                    {playing && muted && !expanded && currentSlide.hasSound && (
                      <div className="absolute inset-0 flex items-center justify-center z-[5] cursor-pointer" onClick={toggleMute}>
                        <p className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.7)", color: "rgba(0,0,0,0.4)" }}>
                          Turn sound on!
                        </p>
                      </div>
                    )}
                  </div>
              </div>

              {/* Text side — grid on mobile for fixed height, normal on desktop */}
              <div className="flex-1 px-6 pb-6 sm:px-8 sm:pb-8 md:py-12 md:px-14">
                {/* Mobile: grid stacks all slides, tallest sets height */}
                <div className="grid md:hidden">
                  {slides.map((slide, i) => (
                    <div
                      key={i}
                      className="flex flex-col justify-center"
                      style={{
                        gridArea: "1 / 1",
                        opacity: i === current ? 1 : 0,
                        pointerEvents: i === current ? "auto" : "none",
                        transition: "opacity 0.2s ease",
                      }}
                    >
                      <h3
                        className="text-xl sm:text-2xl font-medium mb-3"
                        style={{ color: "var(--color-text)" }}
                      >
                        {slide.title}
                      </h3>
                      <p
                        className="text-sm sm:text-base leading-relaxed"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {slide.description}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Desktop: just show current slide */}
                <div className="hidden md:flex flex-col justify-center">
                  <h3
                    className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4"
                    style={{ color: "var(--color-text)" }}
                  >
                    {currentSlide.title}
                  </h3>
                  <p
                    className="text-sm sm:text-base md:text-xl leading-relaxed"
                    style={{ color: "var(--color-text-muted)", lineHeight: 1.7 }}
                  >
                    {currentSlide.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom bar: pagination + arrows */}
            {slides.length > 1 && (
              <div className="flex items-center justify-between px-6 sm:px-8 md:px-10 pb-5">
                <div className="flex gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className="w-2 h-2 rounded-full transition-all cursor-pointer"
                      style={{
                        background: i === current ? "var(--color-primary)" : "var(--color-text-muted)",
                        opacity: i === current ? 1 : 0.3,
                      }}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                    style={{ background: "rgba(0,0,0,0.05)", visibility: current > 0 ? "visible" : "hidden" }}
                    onClick={() => goTo(current - 1)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                    style={{ background: "rgba(0,0,0,0.05)", visibility: current < slides.length - 1 ? "visible" : "hidden" }}
                    onClick={() => goTo(current + 1)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile fullscreen modal */}
      {expanded && currentSlide.src && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={closeModal}
        >
          <div className="min-h-full flex flex-col items-center justify-center py-4">
            {/* Controls */}
            <div
              className="flex items-center justify-end gap-3 w-full px-6 mb-3"
              style={{ maxWidth: "min(75vw, 300px)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {anyVideo && (
                <button
                  className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                  onClick={toggleMute}
                >
                  {muted ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  )}
                </button>
              )}
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
                style={{ background: "rgba(255,255,255,0.2)" }}
                onClick={closeModal}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Phone frame */}
            <div onClick={(e) => e.stopPropagation()}>
              <div
                className="relative rounded-[2.5rem] overflow-hidden"
                style={{ width: "min(75vw, 300px)", aspectRatio: "9/19.5", boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}
              >
                <div className="absolute inset-0 rounded-[2.5rem] border pointer-events-none z-10" style={{ borderColor: "rgba(255,255,255,0.2)" }} />
                {currentSlide.type === "video" ? (
                  <>
                    <video
                      ref={modalVideoRef}
                      key={currentSlide.src}
                      className="w-full h-full object-cover"
                      src={currentSlide.src}
                      muted={muted}
                      playsInline
                      autoPlay
                      onEnded={() => setPlaying(false)}
                    />
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
                    {!playing && (
                      <div className="absolute inset-0 flex items-center justify-center z-[5] pointer-events-none">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.7)" }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(0,0,0,0.4)"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                        </div>
                      </div>
                    )}
                    {playing && muted && currentSlide.hasSound && (
                      <div className="absolute inset-0 flex items-center justify-center z-[5] pointer-events-none">
                        <p className="text-sm font-semibold px-4 py-2 rounded-full pointer-events-auto cursor-pointer" style={{ background: "rgba(255,255,255,0.7)", color: "rgba(0,0,0,0.4)" }} onClick={(e) => { e.stopPropagation(); toggleMute(e); }}>
                          Turn sound on!
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={currentSlide.src} alt="" className="w-full h-full object-cover" />
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
