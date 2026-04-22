"use client";

import { useState } from "react";

const screens = [
  { type: "image" as const, src: "/images/language-pulse.png", alt: "Language Pulse dashboard" },
  { type: "placeholder" as const, label: "Insights review screen" },
  { type: "placeholder" as const, label: "Progress over time screen" },
];

export default function PhoneCarousel() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Phone frame */}
      <div
        className="relative w-[260px] rounded-[2rem] overflow-hidden"
        style={{
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <div
          className="absolute inset-0 rounded-[2rem] border pointer-events-none z-10"
          style={{ borderColor: "var(--color-text-muted)" }}
        />

        {/* Slides */}
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {screens.map((screen, i) => (
            <div key={i} className="w-[260px] flex-shrink-0">
              {screen.type === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={screen.src}
                  alt={screen.alt}
                  className="w-full h-auto block"
                />
              ) : (
                <div
                  className="w-full flex items-center justify-center"
                  style={{
                    aspectRatio: "9/19.5",
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
            onClick={() => setCurrent(i)}
            className="w-2 h-2 rounded-full transition-all"
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
