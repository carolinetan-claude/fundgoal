"use client"

import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Match } from "@/lib/matches"
import { solscanTxUrl } from "@/lib/solana"
import { FundForm } from "./FundForm"

const SOL_USD_PRICE = 178

export function MatchDetail({ match, charityUrl }: { match: Match; charityUrl: string }) {
  const { publicKey } = useWallet()
  const [selectedTeam, setSelectedTeam] = useState<"A" | "B" | null>(null)
  const [funded, setFunded] = useState(false)
  const [txSig, setTxSig] = useState<string | null>(null)

  const isResolved = match.status === "resolved"
  const winningTeam = match.winner === "A" ? match.teamA : match.winner === "B" ? match.teamB : null
  const totalSol = match.totalSol || 0

  return (
    <div style={{ paddingTop: "32px", paddingBottom: "64px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Back link */}
      <a href="/" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", textDecoration: "none", marginBottom: "20px", display: "inline-block" }}>
        ← Back to matches
      </a>

      {/* =================== Compact match summary =================== */}
      <div
        style={{
          background: "#141414",
          borderRadius: "16px",
          padding: "20px 24px",
          marginBottom: "32px",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginBottom: "16px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", lineHeight: 1 }}>{match.teamA.flag}</div>
            <div style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", color: "#FFFFFF", marginTop: "6px" }}>
              {match.teamA.name}
            </div>
          </div>

          <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#F0B90B", textTransform: "uppercase" }}>VS</div>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", lineHeight: 1 }}>{match.teamB.flag}</div>
            <div style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", color: "#FFFFFF", marginTop: "6px" }}>
              {match.teamB.name}
            </div>
          </div>

          <div style={{ width: "1px", height: "40px", background: "#2a2a2a", margin: "0 8px" }} />

          <div style={{ textAlign: "left", fontSize: "0.78rem" }}>
            <div style={{ fontWeight: 700, color: "#FFFFFF" }}>{match.venue}</div>
            <div style={{ color: "#F0B90B", fontWeight: 600, fontSize: "0.72rem" }}>{match.group} · {match.kickoffDisplay}</div>
          </div>

          <div style={{ width: "1px", height: "40px", background: "#2a2a2a", margin: "0 8px" }} />

          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "monospace", fontWeight: 900, color: "#FFFFFF", fontSize: "1.1rem" }}>
              {totalSol.toFixed(2)} <span style={{ color: "#F0B90B" }}>SOL</span>
            </div>
            <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1DB954" }}>
              ${Math.round(totalSol * SOL_USD_PRICE).toLocaleString()}
            </div>
            <div style={{ fontSize: "0.55rem", color: "#888", marginTop: "2px" }}>{match.backers || 0} backers</div>
          </div>
        </div>
      </div>

      {/* =================== Resolved state =================== */}
      {isResolved && winningTeam && (
        <div style={{ background: "#0a0a0a", borderRadius: "14px", padding: "24px", textAlign: "center", marginBottom: "24px", boxShadow: "0 4px 24px rgba(0,0,0,0.3)", border: "2px solid #1DB954" }}>
          <div style={{ fontSize: "2rem", marginBottom: "8px" }}>{winningTeam.flag} 🎉</div>
          <div style={{ fontSize: "1.4rem", fontWeight: 900, textTransform: "uppercase", color: "#1DB954", marginBottom: "8px" }}>
            {winningTeam.name} WINS!
          </div>
          <div style={{ fontSize: "1rem", color: "#ccc", marginBottom: "4px" }}>
            {winningTeam.project.name} just got funded
          </div>
          <div style={{ fontFamily: "monospace", fontWeight: 700, color: "#1DB954", fontSize: "1.5rem", margin: "12px 0" }}>
            {totalSol.toFixed(2)} SOL → {winningTeam.project.country}
          </div>
        </div>
      )}

      {/* =================== Dream selection + checkout =================== */}
      {!isResolved && !funded && (
        <>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 900, textTransform: "uppercase", color: "#FFFFFF", marginBottom: "8px" }}>
              {selectedTeam ? "YOU'RE BACKING THIS " : "WHICH DREAM WILL YOU "}
              <span style={{ color: "#F0B90B" }}>{selectedTeam ? "DREAM" : "FUND"}</span>?
            </h2>
            {!selectedTeam && (
              <p style={{ fontSize: "0.85rem", color: "#888", maxWidth: "500px", margin: "0 auto" }}>
                Back a team. If they win, 100% of the pool goes directly to their project.
              </p>
            )}
          </div>

          {/* Dream cards — side by side when choosing, left+checkout when selected */}
          <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
            {/* Dream cards */}
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: selectedTeam ? "1fr" : "1fr 1fr", gap: "20px" }}>
              {[
                { key: "A" as const, team: match.teamA },
                { key: "B" as const, team: match.teamB },
              ]
                .filter(({ key }) => !selectedTeam || selectedTeam === key)
                .map(({ key, team }) => {
                  const p = team.project
                  return (
                    <div
                      key={key}
                      onClick={() => !selectedTeam && setSelectedTeam(key)}
                      style={{
                        background: "#FDF6E3",
                        border: selectedTeam ? "3px solid #F0B90B" : "3px solid transparent",
                        borderRadius: "16px",
                        cursor: selectedTeam ? "default" : "pointer",
                        boxShadow: selectedTeam ? "0 0 30px rgba(240,185,11,0.2)" : "0 4px 24px rgba(0,0,0,0.2)",
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column" as const,
                        gap: "12px",
                      }}
                    >
                      {/* Header */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <span style={{ fontSize: "2rem" }}>{team.flag}</span>
                          <div>
                            <div style={{ fontSize: "0.55rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
                              If {team.name} wins
                            </div>
                            <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.3 }}>
                              {p.name}
                            </div>
                          </div>
                        </div>
                        {selectedTeam && (
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedTeam(null) }}
                            style={{
                              background: "rgba(0,0,0,0.08)",
                              border: "none",
                              borderRadius: "6px",
                              padding: "6px 12px",
                              fontSize: "0.68rem",
                              color: "#666",
                              cursor: "pointer",
                              fontWeight: 600,
                            }}
                          >
                            Change
                          </button>
                        )}
                      </div>

                      {/* Subsections */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                        <div style={{ background: "rgba(0,0,0,0.04)", borderRadius: "8px", padding: "10px" }}>
                          <div style={{ fontSize: "0.5rem", color: "#996B00", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "4px" }}>
                            👥 Who is this for?
                          </div>
                          <div style={{ fontSize: "0.72rem", color: "#4a4a4a", lineHeight: 1.4 }}>{p.whoIsThisFor}</div>
                        </div>
                        <div style={{ background: "rgba(0,0,0,0.04)", borderRadius: "8px", padding: "10px" }}>
                          <div style={{ fontSize: "0.5rem", color: "#996B00", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "4px" }}>
                            💰 What funds are used for
                          </div>
                          <div style={{ fontSize: "0.72rem", color: "#4a4a4a", lineHeight: 1.4 }}>{p.whatFundsUsedFor}</div>
                        </div>
                        <div style={{ background: "rgba(0,0,0,0.04)", borderRadius: "8px", padding: "10px" }}>
                          <div style={{ fontSize: "0.5rem", color: "#996B00", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "4px" }}>
                            ✨ Why is this unique?
                          </div>
                          <div style={{ fontSize: "0.72rem", color: "#4a4a4a", lineHeight: 1.4 }}>{p.whyUnique}</div>
                        </div>
                      </div>

                      {/* CTA — only when not selected */}
                      {!selectedTeam && (
                        <div
                          style={{
                            background: "#F0B90B",
                            color: "#0a0a0a",
                            fontWeight: 800,
                            fontSize: "0.82rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            padding: "14px",
                            borderRadius: "10px",
                            textAlign: "center",
                          }}
                        >
                          BACK THIS TEAM →
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>

            {/* Checkout — right side, sticky */}
            {selectedTeam && (
              <div style={{ width: "380px", flexShrink: 0, position: "sticky" as const, top: "80px" }}>
                <div style={{ background: "#0a0a0a", borderRadius: "14px", padding: "24px", boxShadow: "0 4px 24px rgba(0,0,0,0.3)", border: "2px solid #F0B90B" }}>
                  <div style={{ fontSize: "0.6rem", color: "#F0B90B", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, marginBottom: "16px", textAlign: "center" }}>
                    Fund this dream
                  </div>
                  {!publicKey ? (
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "0.85rem", color: "#888", marginBottom: "16px" }}>
                        Connect your Phantom wallet to pledge SOL
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
              </div>
            )}
          </div>
        </>
      )}

      {/* =================== Success state =================== */}
      {funded && txSig && (
        <div style={{ background: "#0a0a0a", border: "2px solid #1DB954", borderRadius: "14px", padding: "24px", textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}>
          <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🎉</div>
          <div style={{ fontSize: "1.2rem", fontWeight: 900, textTransform: "uppercase", color: "#1DB954", marginBottom: "8px" }}>
            YOU&apos;RE FUNDING THE DREAM!
          </div>
          <div style={{ fontSize: "0.9rem", color: "#ccc", marginBottom: "16px" }}>
            If {selectedTeam === "A" ? match.teamA.name : match.teamB.name} wins, {selectedTeam === "A" ? match.teamA.project.name : match.teamB.project.name} gets funded.
          </div>
          <div style={{ marginBottom: "16px" }}>
            <a href={solscanTxUrl(txSig)} target="_blank" rel="noopener noreferrer" style={{ color: "#F0B90B", fontSize: "0.82rem", textDecoration: "none" }}>
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
                `I'm backing ${selectedTeam === "A" ? match.teamA.name : match.teamB.name} to fund ${selectedTeam === "A" ? match.teamA.project.name : match.teamB.project.name} during the World Cup 🌍⚽ #DreamFund`
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

      {/* =================== Bottom banner =================== */}
      <div style={{ marginTop: "24px", padding: "16px 20px", background: "linear-gradient(135deg, #F0B90B 0%, #D4A00A 100%)", borderRadius: "12px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 4px 20px rgba(240,185,11,0.3)" }}>
        <span style={{ fontSize: "1.5rem" }}>🌍</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "0.85rem", color: "#0a0a0a", fontWeight: 700 }}>100% of the pool funds a real charity project</div>
          <div style={{ fontSize: "0.72rem", color: "rgba(0,0,0,0.55)" }}>
            Verified on Solana · All donations are transparent and on-chain
          </div>
        </div>
      </div>
    </div>
  )
}
