"use client"

import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Match } from "@/lib/matches"
import { solscanTxUrl } from "@/lib/solana"
import { FundForm } from "./FundForm"

export function MatchDetail({ match, charityUrl }: { match: Match; charityUrl: string }) {
  const { publicKey } = useWallet()
  const [selectedTeam, setSelectedTeam] = useState<"A" | "B" | null>(null)
  const [funded, setFunded] = useState(false)
  const [txSig, setTxSig] = useState<string | null>(null)

  const isResolved = match.status === "resolved"
  const accentColor = isResolved ? "#1DB954" : "#F0B90B"
  const winningTeam = match.winner === "A" ? match.teamA : match.winner === "B" ? match.teamB : null

  return (
    <div style={{ paddingTop: "32px", paddingBottom: "64px", maxWidth: "800px", margin: "0 auto" }}>
      {/* Back link */}
      <a href="/" style={{ color: "#888", fontSize: "0.85rem", textDecoration: "none", marginBottom: "24px", display: "inline-block" }}>
        ← Back to matches
      </a>

      {/* Match header */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div style={{ fontSize: "0.7rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: "12px" }}>
          {match.group} · {match.kickoffDisplay}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", marginBottom: "8px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "4px" }}>{match.teamA.flag}</div>
            <div style={{ fontSize: "1.3rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em" }}>{match.teamA.name}</div>
          </div>
          <div style={{ color: "#444", fontSize: "1rem", fontWeight: 700, textTransform: "uppercase" }}>VS</div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "4px" }}>{match.teamB.flag}</div>
            <div style={{ fontSize: "1.3rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em" }}>{match.teamB.name}</div>
          </div>
        </div>

        <div style={{ fontSize: "0.78rem", color: "#666" }}>{match.venue}</div>
      </div>

      {/* Resolved state */}
      {isResolved && winningTeam && (
        <div style={{ background: "#0d1f0d", border: "1px solid #1DB954", borderRadius: "12px", padding: "24px", textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "2rem", marginBottom: "8px" }}>{winningTeam.flag} 🎉</div>
          <div style={{ fontSize: "1.4rem", fontWeight: 900, textTransform: "uppercase", color: "#1DB954", marginBottom: "8px" }}>
            {winningTeam.name} WINS!
          </div>
          <div style={{ fontSize: "1rem", color: "#ccc", marginBottom: "4px" }}>
            {winningTeam.project.name} just got funded
          </div>
          <div style={{ fontFamily: "monospace", fontWeight: 700, color: "#1DB954", fontSize: "1.5rem", margin: "12px 0" }}>
            {(match.totalSol || 0).toFixed(2)} SOL → {winningTeam.project.country}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#888" }}>
            ♥ Donated to World Vision ·{" "}
            {match.solscanTx && (
              <a href={solscanTxUrl(match.solscanTx)} target="_blank" rel="noopener noreferrer" style={{ color: "#F0B90B" }}>
                View on Solscan →
              </a>
            )}
          </div>
        </div>
      )}

      {/* Pool stats */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
        <div style={{ flex: 1, background: "#141414", border: "1px solid #2a2a2a", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
          <div style={{ fontSize: "0.65rem", color: "#444", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>Total Pool</div>
          <div style={{ fontFamily: "monospace", fontWeight: 700, color: accentColor, fontSize: "1.3rem" }} className="countup">
            {(match.totalSol || 0).toFixed(2)} SOL
          </div>
        </div>
        <div style={{ flex: 1, background: "#141414", border: "1px solid #2a2a2a", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
          <div style={{ fontSize: "0.65rem", color: "#444", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>♥ World Vision</div>
          <div style={{ fontFamily: "monospace", fontWeight: 700, color: accentColor, fontSize: "1.3rem" }}>
            {(match.totalSol || 0).toFixed(2)} SOL
          </div>
        </div>
      </div>

      {/* Project selection */}
      {!isResolved && !funded && (
        <>
          <div style={{ fontSize: "0.7rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: "16px", textAlign: "center" }}>
            Which dream do you want to fund?
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>
            {/* Team A project */}
            <div
              onClick={() => setSelectedTeam("A")}
              style={{
                background: selectedTeam === "A" ? "#1a1500" : "#141414",
                border: `2px solid ${selectedTeam === "A" ? "#F0B90B" : "#2a2a2a"}`,
                borderRadius: "12px",
                padding: "20px",
                cursor: "pointer",
                transition: "border-color 0.2s, background 0.2s",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "8px" }}>{match.teamA.flag}</div>
              <div style={{ fontSize: "0.65rem", color: "#444", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
                If {match.teamA.name} wins →
              </div>
              <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
                {match.teamA.project.name}
              </div>
              <div style={{ fontSize: "0.82rem", color: "#888", lineHeight: 1.5 }}>
                {match.teamA.project.description}
              </div>
              {selectedTeam === "A" && (
                <div style={{ marginTop: "12px", fontSize: "0.75rem", color: "#F0B90B", fontWeight: 700, textTransform: "uppercase" }}>
                  ✓ SELECTED
                </div>
              )}
            </div>

            {/* Team B project */}
            <div
              onClick={() => setSelectedTeam("B")}
              style={{
                background: selectedTeam === "B" ? "#1a1500" : "#141414",
                border: `2px solid ${selectedTeam === "B" ? "#F0B90B" : "#2a2a2a"}`,
                borderRadius: "12px",
                padding: "20px",
                cursor: "pointer",
                transition: "border-color 0.2s, background 0.2s",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "8px" }}>{match.teamB.flag}</div>
              <div style={{ fontSize: "0.65rem", color: "#444", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
                If {match.teamB.name} wins →
              </div>
              <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
                {match.teamB.project.name}
              </div>
              <div style={{ fontSize: "0.82rem", color: "#888", lineHeight: 1.5 }}>
                {match.teamB.project.description}
              </div>
              {selectedTeam === "B" && (
                <div style={{ marginTop: "12px", fontSize: "0.75rem", color: "#F0B90B", fontWeight: 700, textTransform: "uppercase" }}>
                  ✓ SELECTED
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Fund form */}
      {!isResolved && !funded && selectedTeam && (
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
          {!publicKey ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.85rem", color: "#888", marginBottom: "16px" }}>
                Connect your Phantom wallet to fund this match
              </div>
              <WalletMultiButton
                style={{
                  background: "#F0B90B",
                  color: "#0a0a0a",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  borderRadius: "8px",
                  padding: "14px 32px",
                  border: "none",
                  cursor: "pointer",
                  width: "100%",
                  justifyContent: "center",
                }}
              />
            </div>
          ) : (
            <FundForm
              matchId={match.id}
              teamChoice={selectedTeam === "A" ? 0 : 1}
              teamName={selectedTeam === "A" ? match.teamA.name : match.teamB.name}
              projectName={selectedTeam === "A" ? match.teamA.project.name : match.teamB.project.name}
              onSuccess={(sig) => {
                setTxSig(sig)
                setFunded(true)
              }}
            />
          )}
        </div>
      )}

      {/* Success state */}
      {funded && txSig && (
        <div style={{ background: "#0d1f0d", border: "1px solid #1DB954", borderRadius: "12px", padding: "24px", textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🎉</div>
          <div style={{ fontSize: "1.2rem", fontWeight: 900, textTransform: "uppercase", color: "#1DB954", marginBottom: "8px" }}>
            YOU&apos;RE BACKING {selectedTeam === "A" ? match.teamA.name.toUpperCase() : match.teamB.name.toUpperCase()}!
          </div>
          <div style={{ fontSize: "0.9rem", color: "#ccc", marginBottom: "16px" }}>
            If they win, {selectedTeam === "A" ? match.teamA.project.name : match.teamB.project.name} gets funded.
          </div>
          <div style={{ marginBottom: "16px" }}>
            <a
              href={solscanTxUrl(txSig)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#F0B90B", fontSize: "0.82rem", textDecoration: "none" }}
            >
              View transaction on Solscan →
            </a>
          </div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href={`/thanks/${publicKey?.toBase58()}-${match.id}`}
              style={{
                background: "#1DB954",
                color: "#0a0a0a",
                fontWeight: 800,
                fontSize: "0.8rem",
                textTransform: "uppercase",
                padding: "12px 24px",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              VIEW YOUR THANK YOU CARD →
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `I'm backing ${selectedTeam === "A" ? match.teamA.name : match.teamB.name} to fund ${selectedTeam === "A" ? match.teamA.project.name : match.teamB.project.name} during the World Cup 🌍⚽ #FundGoal`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "transparent",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.8rem",
                textTransform: "uppercase",
                padding: "12px 24px",
                borderRadius: "8px",
                border: "1px solid #2a2a2a",
                textDecoration: "none",
              }}
            >
              SHARE ON X
            </a>
          </div>
        </div>
      )}

      {/* Charity info */}
      <div style={{ marginTop: "32px", padding: "16px 20px", background: "#141414", borderRadius: "10px", border: "1px solid #2a2a2a", display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "1.5rem" }}>🌍</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "0.85rem", color: "#fff", fontWeight: 600 }}>100% goes to World Vision</div>
          <div style={{ fontSize: "0.72rem", color: "#888" }}>
            Verified via{" "}
            <a href={charityUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#F0B90B", textDecoration: "none" }}>
              The Giving Block
            </a>{" "}
            · EIN 95-1922279
          </div>
        </div>
      </div>
    </div>
  )
}
