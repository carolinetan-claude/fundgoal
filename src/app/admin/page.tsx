"use client"

import { useState, useEffect } from "react"
import { MATCHES } from "@/lib/matches"

interface MatchState {
  status: string
  winner: string | null
  totalSol: number
  solscanTx: string | null
}

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const [states, setStates] = useState<Record<string, MatchState>>({})
  const [loading, setLoading] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const fetchStates = async () => {
    const res = await fetch("/api/admin")
    const data = await res.json()
    setStates(data)
  }

  useEffect(() => {
    fetchStates()
  }, [])

  const doAction = async (matchId: string, action: string, extra: Record<string, unknown> = {}) => {
    setLoading(matchId + action)
    setMessage(null)
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, matchId, action, ...extra }),
      })
      const data = await res.json()
      if (data.error) {
        setMessage(`Error: ${data.error}`)
      } else {
        setMessage(`${matchId} → ${action} success`)
        await fetchStates()
      }
    } catch {
      setMessage("Request failed")
    } finally {
      setLoading(null)
    }
  }

  if (!authenticated) {
    return (
      <div style={{ paddingTop: "64px", maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: "1.5rem", fontWeight: 900, textTransform: "uppercase", marginBottom: "24px" }}>
          ADMIN PANEL
        </div>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setAuthenticated(true)}
          style={{
            width: "100%",
            padding: "14px 16px",
            background: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "1rem",
            outline: "none",
            marginBottom: "16px",
          }}
        />
        <button
          onClick={() => setAuthenticated(true)}
          style={{
            width: "100%",
            padding: "14px",
            background: "#F0B90B",
            color: "#0a0a0a",
            fontWeight: 800,
            fontSize: "0.9rem",
            textTransform: "uppercase",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ENTER
        </button>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: "32px", paddingBottom: "64px", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ fontSize: "1.5rem", fontWeight: 900, textTransform: "uppercase", marginBottom: "8px" }}>
        ADMIN PANEL
      </div>
      <div style={{ fontSize: "0.82rem", color: "#888", marginBottom: "32px" }}>
        Manage match states for the hackathon demo
      </div>

      {message && (
        <div style={{
          padding: "12px 16px",
          background: message.includes("Error") ? "#1a0000" : "#0d1f0d",
          border: `1px solid ${message.includes("Error") ? "#ff4444" : "#1DB954"}`,
          borderRadius: "8px",
          color: message.includes("Error") ? "#ff4444" : "#1DB954",
          fontSize: "0.85rem",
          marginBottom: "24px",
        }}>
          {message}
        </div>
      )}

      {MATCHES.map((match) => {
        const state = states[match.id] || { status: "upcoming", winner: null, totalSol: 0, solscanTx: null }
        const statusColor = state.status === "resolved" ? "#1DB954" : state.status === "live" ? "#F0B90B" : "#888"

        return (
          <div
            key={match.id}
            style={{
              background: "#141414",
              border: "1px solid #2a2a2a",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "16px",
            }}
          >
            {/* Match header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, textTransform: "uppercase" }}>
                  {match.teamA.flag} {match.teamA.name} vs {match.teamB.flag} {match.teamB.name}
                </div>
                <div style={{ fontSize: "0.78rem", color: "#888" }}>{match.id} · {match.group}</div>
              </div>
              <div style={{
                padding: "4px 12px",
                borderRadius: "4px",
                background: statusColor + "20",
                color: statusColor,
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}>
                {state.status}
              </div>
            </div>

            {/* State info */}
            {state.winner && (
              <div style={{ fontSize: "0.82rem", color: "#1DB954", marginBottom: "12px" }}>
                Winner: Team {state.winner} · Total: {state.totalSol} SOL
              </div>
            )}

            {/* Actions */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button
                onClick={() => doAction(match.id, "set-live")}
                disabled={loading === match.id + "set-live"}
                style={{
                  padding: "8px 16px",
                  background: "#F0B90B",
                  color: "#0a0a0a",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  opacity: state.status === "live" ? 0.4 : 1,
                }}
              >
                SET LIVE
              </button>
              <button
                onClick={() => doAction(match.id, "resolve", { winner: "A", totalSol: 5.0 })}
                disabled={loading === match.id + "resolve"}
                style={{
                  padding: "8px 16px",
                  background: "#1DB954",
                  color: "#0a0a0a",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                {match.teamA.flag} {match.teamA.code} WINS
              </button>
              <button
                onClick={() => doAction(match.id, "resolve", { winner: "B", totalSol: 5.0 })}
                disabled={loading === match.id + "resolve"}
                style={{
                  padding: "8px 16px",
                  background: "#1DB954",
                  color: "#0a0a0a",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                {match.teamB.flag} {match.teamB.code} WINS
              </button>
              <button
                onClick={() => doAction(match.id, "reset")}
                style={{
                  padding: "8px 16px",
                  background: "transparent",
                  color: "#888",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  border: "1px solid #2a2a2a",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                RESET
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
