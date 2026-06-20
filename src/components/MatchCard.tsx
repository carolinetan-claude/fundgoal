"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Match, MatchStatus } from "@/lib/matches"

const MATCH_DURATION_MS = 90 * 60 * 1000

function useCountdown(kickoff: string) {
  const endTime = new Date(kickoff).getTime() + MATCH_DURATION_MS

  const [timeLeft, setTimeLeft] = useState(() => {
    return Math.max(0, Math.floor((endTime - Date.now()) / 1000))
  })

  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft(Math.max(0, Math.floor((endTime - Date.now()) / 1000)))
    }, 1000)
    return () => clearInterval(timer)
  }, [endTime, timeLeft])

  const days = Math.floor(timeLeft / 86400)
  const hours = Math.floor((timeLeft % 86400) / 3600)
  const minutes = Math.floor((timeLeft % 3600) / 60)
  const seconds = timeLeft % 60

  return { days, hours, minutes, seconds, expired: timeLeft <= 0 }
}

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

const SOL_USD_PRICE = 178

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ textAlign: "center", minWidth: "44px" }}>
      <div
        style={{
          fontFamily: "monospace",
          fontSize: "1.3rem",
          fontWeight: 900,
          color: "#0a0a0a",
          background: "#F0B90B",
          borderRadius: "6px",
          padding: "4px 8px",
          lineHeight: 1.2,
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <div style={{ fontSize: "0.5rem", color: "#F0B90B", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "4px", fontWeight: 700 }}>
        {label}
      </div>
    </div>
  )
}

export function MatchCard({ match }: { match: Match }) {
  const totalSol = match.totalSol || 0
  const backers = match.backers || 0
  const isResolved = match.status === "resolved"
  const countdown = useCountdown(match.kickoff)

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
            gap: "14px",
          }}
        >
          {/* Countdown timer */}
          {!isResolved && !countdown.expired && (
            <div>
              <div style={{ fontSize: "0.6rem", color: "#F0B90B", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "8px", textAlign: "center" }}>
                ⏱ Funding closes at full time
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                {countdown.days > 0 && <CountdownUnit value={countdown.days} label="Days" />}
                <CountdownUnit value={countdown.hours} label="Hrs" />
                <CountdownUnit value={countdown.minutes} label="Min" />
                <CountdownUnit value={countdown.seconds} label="Sec" />
              </div>
            </div>
          )}

          {/* Venue + time — prominent */}
          <div
            style={{
              background: "#141414",
              borderRadius: "8px",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div style={{ fontSize: "1.2rem" }}>📍</div>
            <div>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#FFFFFF" }}>
                {match.venue}
              </div>
              <div style={{ fontSize: "0.72rem", color: "#F0B90B", fontWeight: 600 }}>
                {match.kickoffDisplay}
              </div>
            </div>
          </div>

          {/* Total Pool + Backers — centered */}
          <div style={{ display: "flex", justifyContent: "center", gap: "32px", alignItems: "center", padding: "8px 0" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.6rem", color: "#F0B90B", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px", fontWeight: 700 }}>
                Total Pool
              </div>
              <div style={{ fontFamily: "monospace", fontWeight: 900, color: "#FFFFFF", fontSize: "1.4rem" }}>
                {totalSol.toFixed(2)} <span style={{ color: "#F0B90B" }}>SOL</span>
              </div>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1DB954", marginTop: "4px" }}>
                ${Math.round(totalSol * SOL_USD_PRICE).toLocaleString()} USD
              </div>
            </div>
            <div style={{ width: "1px", height: "36px", background: "#2a2a2a" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.6rem", color: "#F0B90B", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px", fontWeight: 700 }}>
                Backers
              </div>
              <div style={{ fontFamily: "monospace", fontWeight: 900, color: "#FFFFFF", fontSize: "1.4rem" }}>
                {backers}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            style={{
              background: isResolved ? "#1DB954" : "#F0B90B",
              color: "#0a0a0a",
              fontWeight: 800,
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              padding: "14px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            {isResolved ? "VIEW RESULTS" : "PICK THIS MATCH TO FUND →"}
          </div>
        </div>
      </div>
    </Link>
  )
}
