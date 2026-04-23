"use client";

import { useState } from "react";

export default function ExpandableText({
  preview,
  full,
}: {
  preview: React.ReactNode;
  full: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <p
        className="text-base sm:text-lg leading-relaxed mb-4"
        style={{ color: "var(--color-text-muted)" }}
      >
        {preview}
        {expanded && <>{full}</>}
      </p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-sm font-medium cursor-pointer mb-8"
        style={{ color: "var(--color-primary)" }}
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
}
