"use client"

import Link from "next/link"
import { Match, MatchStatus } from "@/lib/matches"

function StatusBadge({ status }: { status: MatchStatus }) {
  if (status === "live") {
    return (
      <span
        style={{
          background: "#F0B90B",
          color: "#0a0a0a",
          fontSize: "0.65rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          padding: "3px 10px",
          borderRadius: "4px",
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <span className="pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "#0a0a0a", display: "inline-block" }} />
        LIVE
      </span>
    )
  }
  if (status === "resolved") {
    return (
      <span
        style={{
          background: "#1DB954",
          color: "#0a0a0a",
          fontSize: "0.65rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          padding: "3px 10px",
          borderRadius: "4px",
        }}
      >
        FUNDED
      </span>
    )
  }
  return (
    <span
      style={{
        background: "#1a1a1a",
        color: "#888",
        fontSize: "0.65rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        padding: "3px 10px",
        borderRadius: "4px",
        border: "1px solid #2a2a2a",
      }}
    >
      UPCOMING
    </span>
  )
}

export function MatchCard({ match }: { match: Match }) {
  const accentColor = match.status === "resolved" ? "#1DB954" : "#F0B90B"
  const totalSol = match.totalSol || 0

  return (
    <Link href={`/match/${match.id}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "#141414",
          border: "1px solid #2a2a2a",
          borderRadius: "12px",
          padding: "20px",
          cursor: "pointer",
          transition: "border-color 0.2s, transform 0.2s",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = accentColor + "66"
          ;(e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "#2a2a2a"
          ;(e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#888", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
            {match.group}
          </span>
          <StatusBadge status={match.status} />
        </div>

        {/* Teams */}
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
            <span style={{ fontSize: "2rem" }}>{match.teamA.flag}</span>
            <div>
              <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "-0.01em" }}>
                {match.teamA.name}
              </div>
            </div>
          </div>
          <div style={{ color: "#444", fontSize: "0.8rem", fontWeight: 600, margin: "6px 0", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            vs
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
            <span style={{ fontSize: "2rem" }}>{match.teamB.flag}</span>
            <div>
              <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "-0.01em" }}>
                {match.teamB.name}
              </div>
            </div>
          </div>
        </div>

        {/* Projects preview */}
        <div style={{ background: "#1a1a1a", borderRadius: "8px", padding: "12px", fontSize: "0.78rem", color: "#888" }}>
          <div style={{ marginBottom: "6px" }}>
            <span style={{ color: "#F0B90B" }}>{match.teamA.flag}</span> {match.teamA.project.name}
          </div>
          <div>
            <span style={{ color: "#F0B90B" }}>{match.teamB.flag}</span> {match.teamB.project.name}
          </div>
        </div>

        {/* Pool + charity */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "0.65rem", color: "#444", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>
              Pool
            </div>
            <div style={{ fontFamily: "monospace", fontWeight: 700, color: accentColor, fontSize: "1.1rem" }}>
              {totalSol.toFixed(2)} SOL
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.65rem", color: "#444", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>
              ♥ World Vision
            </div>
            <div style={{ fontFamily: "monospace", fontWeight: 700, color: accentColor === "#1DB954" ? "#1DB954" : "#F0B90B", fontSize: "0.95rem" }}>
              {totalSol.toFixed(2)} SOL
            </div>
          </div>
        </div>

        {/* Kickoff */}
        <div style={{ fontSize: "0.78rem", color: "#666", borderTop: "1px solid #2a2a2a", paddingTop: "12px" }}>
          {match.kickoffDisplay} · {match.venue}
        </div>

        {/* CTA */}
        <div
          style={{
            background: match.status === "resolved" ? "#1DB954" : "#F0B90B",
            color: "#0a0a0a",
            fontWeight: 800,
            fontSize: "0.85rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            padding: "12px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          {match.status === "resolved" ? "VIEW RESULTS" : "FUND THIS MATCH →"}
        </div>
      </div>
    </Link>
  )
}
