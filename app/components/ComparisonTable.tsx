"use client";

import { useState } from "react";

const competitors = ["Duolingo", "Speak", "Human tutor"] as const;

const rows = [
  ["Adapts to your level", "Somewhat", "Placement test", "Yes", "Real-time"],
  ["Talks about your interests", "No", "Preset scenarios", "Limited", "Anything,with web search"],
  ["Available anytime", "Yes", "Yes", "No", "Yes"],
  ["Measures real fluency", "Streaks", "Pronunciation only", "Subjectively", "Speed, accuracy, vocab"],
  ["Actually fun", "Gamified drills", "Polished but drill-oriented", "Depends", "Detective games, missions, stories"],
];

export default function ComparisonTable() {
  const [selected, setSelected] = useState(0);

  return (
    <>
      {/* Desktop: full table */}
      <div className="hidden md:block">
        <table className="w-full text-left text-sm" style={{ color: "var(--color-text)" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--color-primary-light)" }}>
              <th className="py-3 pr-4 font-medium" style={{ color: "var(--color-text-muted)" }}></th>
              <th className="py-3 px-4 font-medium" style={{ color: "var(--color-text-muted)" }}>Duolingo</th>
              <th className="py-3 px-4 font-medium" style={{ color: "var(--color-text-muted)" }}>Speak</th>
              <th className="py-3 px-4 font-medium" style={{ color: "var(--color-text-muted)" }}>Human tutor</th>
              <th className="py-3 px-4 font-bold" style={{ color: "var(--color-primary)" }}>Tuteo</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <td className="py-3 pr-4 font-medium">{row[0]}</td>
                <td className="py-3 px-4" style={{ color: "var(--color-text-muted)" }}>{row[1]}</td>
                <td className="py-3 px-4" style={{ color: "var(--color-text-muted)" }}>{row[2]}</td>
                <td className="py-3 px-4" style={{ color: "var(--color-text-muted)" }}>{row[3]}</td>
                <td className="py-3 px-4 font-semibold" style={{ color: "var(--color-primary)" }}>{row[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: 3-column table with competitor toggle */}
      <div className="md:hidden">
        {/* Competitor selector */}
        <div className="flex gap-2 mb-4">
          {competitors.map((name, i) => (
            <button
              key={name}
              onClick={() => setSelected(i)}
              className="flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer"
              style={{
                background: i === selected ? "var(--color-primary)" : "rgba(0,0,0,0.05)",
                color: i === selected ? "#fff" : "var(--color-text-muted)",
              }}
            >
              {name}
            </button>
          ))}
        </div>

        {/* 3-column table */}
        <table className="w-full text-left text-sm" style={{ color: "var(--color-text)" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--color-primary-light)" }}>
              <th className="py-3 pr-3 font-medium" style={{ color: "var(--color-text-muted)" }}></th>
              <th className="py-3 px-3 font-medium" style={{ color: "var(--color-text-muted)" }}>{competitors[selected]}</th>
              <th className="py-3 pl-3 font-bold" style={{ color: "var(--color-primary)" }}>Tuteo</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <td className="py-3 pr-3 font-medium text-xs">{row[0]}</td>
                <td className="py-3 px-3 text-xs" style={{ color: "var(--color-text-muted)" }}>{row[selected + 1]}</td>
                <td className="py-3 pl-3 text-xs font-semibold" style={{ color: "var(--color-primary)" }}>{row[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
