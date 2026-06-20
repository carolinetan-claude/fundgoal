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
          fontSize: "0.6rem",
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
          fontSize: "0.6rem",
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
        background: "rgba(0,0,0,0.08)",
        color: "#666",
        fontSize: "0.6rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        padding: "3px 10px",
        borderRadius: "4px",
      }}
    >
      UPCOMING
    </span>
  )
}

export function MatchCard({ match }: { match: Match }) {
  const totalSol = match.totalSol || 0
  const backers = match.backers || 0
  const isResolved = match.status === "resolved"

  return (
    <Link href={`/match/${match.id}`} style={{ textDecoration: "none" }}>
      <div
        className="pvp-card"
        style={{
          borderRadius: "16px",
          overflow: "hidden",
          cursor: "pointer",
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          border: "2px solid #F0B90B",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px) scale(1.01)"
          ;(e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(240,185,11,0.3)"
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0) scale(1)"
          ;(e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.4)"
        }}
      >
        {/* === White arena with flags === */}
        <div
          style={{
            position: "relative",
            height: "200px",
            background: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Group badge top-left */}
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "14px",
              zIndex: 5,
              fontSize: "0.6rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#999",
            }}
          >
            {match.group}
          </div>

          {/* Status badge top-right */}
          <div style={{ position: "absolute", top: "10px", right: "14px", zIndex: 5 }}>
            <StatusBadge status={match.status} />
          </div>

          {/* Team A — left */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              paddingTop: "16px",
            }}
          >
            <div style={{ fontSize: "4rem", lineHeight: 1 }}>{match.teamA.flag}</div>
            <div
              style={{
                fontSize: "0.8rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                color: "#0a0a0a",
              }}
            >
              {match.teamA.name}
            </div>
          </div>

          {/* VS badge — center */}
          <div
            className="vs-badge"
            style={{
              zIndex: 10,
              background: "#F0B90B",
              color: "#0a0a0a",
              fontWeight: 900,
              fontSize: "1rem",
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(240,185,11,0.4), 0 0 40px rgba(240,185,11,0.15)",
              border: "2px solid rgba(0,0,0,0.1)",
              flexShrink: 0,
            }}
          >
            VS
          </div>

          {/* Team B — right */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              paddingTop: "16px",
            }}
          >
            <div style={{ fontSize: "4rem", lineHeight: 1 }}>{match.teamB.flag}</div>
            <div
              style={{
                fontSize: "0.8rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                color: "#0a0a0a",
              }}
            >
              {match.teamB.name}
            </div>
          </div>
        </div>

        {/* === Dark footer strip === */}
        <div
          style={{
            background: "#0a0a0a",
            padding: "16px 18px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {/* Projects preview */}
          <div style={{ background: "#141414", borderRadius: "8px", padding: "10px 12px", fontSize: "0.75rem", color: "#888" }}>
            <div style={{ marginBottom: "4px" }}>
              <span style={{ color: "#F0B90B" }}>{match.teamA.flag}</span>{" "}
              {match.teamA.project.name}
            </div>
            <div>
              <span style={{ color: "#F0B90B" }}>{match.teamB.flag}</span>{" "}
              {match.teamB.project.name}
            </div>
          </div>

          {/* Pool + backers */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "0.6rem", color: "#444", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>
                Pool
              </div>
              <div style={{ fontFamily: "monospace", fontWeight: 700, color: isResolved ? "#1DB954" : "#F0B90B", fontSize: "1.05rem" }}>
                {totalSol.toFixed(2)} SOL
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.6rem", color: "#444", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>
                Backers
              </div>
              <div style={{ fontFamily: "monospace", fontWeight: 700, color: "#FFFFFF", fontSize: "1.05rem" }}>
                {backers}
              </div>
            </div>
          </div>

          {/* Kickoff */}
          <div style={{ fontSize: "0.72rem", color: "#555", borderTop: "1px solid #1a1a1a", paddingTop: "10px" }}>
            {match.kickoffDisplay} · {match.venue}
          </div>

          {/* CTA */}
          <div
            style={{
              background: isResolved ? "#1DB954" : "#F0B90B",
              color: "#0a0a0a",
              fontWeight: 800,
              fontSize: "0.82rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              padding: "12px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            {isResolved ? "VIEW RESULTS" : "FUND THIS MATCH →"}
          </div>
        </div>
      </div>
    </Link>
  )
}
