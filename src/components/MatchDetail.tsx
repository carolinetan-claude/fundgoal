"use client"

import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Match } from "@/lib/matches"
import { solscanTxUrl } from "@/lib/solana"
import { FundForm } from "./FundForm"
import { PlayerSilhouette, isLightColor } from "./PlayerSilhouettes"

export function MatchDetail({ match, charityUrl }: { match: Match; charityUrl: string }) {
  const { publicKey } = useWallet()
  const [selectedTeam, setSelectedTeam] = useState<"A" | "B" | null>(null)
  const [funded, setFunded] = useState(false)
  const [txSig, setTxSig] = useState<string | null>(null)

  const isResolved = match.status === "resolved"
  const winningTeam = match.winner === "A" ? match.teamA : match.winner === "B" ? match.teamB : null

  const colorA = match.teamA.jerseyColor
  const colorB = match.teamB.jerseyColor
  const textA = isLightColor(colorA) ? "#0a0a0a" : "#FFFFFF"
  const textB = isLightColor(colorB) ? "#0a0a0a" : "#FFFFFF"

  return (
    <div style={{ paddingTop: "32px", paddingBottom: "64px", maxWidth: "800px", margin: "0 auto" }}>
      {/* Back link */}
      <a href="/" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", textDecoration: "none", marginBottom: "24px", display: "inline-block" }}>
        ← Back to matches
      </a>

      {/* =================== PVP Match Header =================== */}
      <div
        style={{
          borderRadius: "20px",
          overflow: "hidden",
          marginBottom: "24px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* PVP Arena — split diagonal (larger than card version) */}
        <div style={{ position: "relative", height: "280px", overflow: "hidden" }}>
          {/* Team A half — left */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: colorA,
              clipPath: "polygon(0 0, 55% 0, 45% 100%, 0 100%)",
            }}
          />

          {/* Team B half — right */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: colorB,
              clipPath: "polygon(55% 0, 100% 0, 100% 100%, 45% 100%)",
            }}
          />

          {/* Dark diagonal slash */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "#0a0a0a",
              clipPath: "polygon(48% 0, 52% 0, 48% 100%, 44% 100%)",
              zIndex: 2,
            }}
          />

          {/* Team A — left side */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "45%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 3,
            }}
          >
            <div style={{ opacity: 0.2, marginBottom: "6px" }}>
              <PlayerSilhouette
                position={match.teamA.position}
                facing="right"
                color={textA}
                size={120}
              />
            </div>
            <div style={{ fontSize: "2.5rem", marginBottom: "4px" }}>{match.teamA.flag}</div>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                color: textA,
              }}
            >
              {match.teamA.name}
            </div>
          </div>

          {/* Team B — right side */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "45%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 3,
            }}
          >
            <div style={{ opacity: 0.2, marginBottom: "6px" }}>
              <PlayerSilhouette
                position={match.teamB.position}
                facing="left"
                color={textB}
                size={120}
              />
            </div>
            <div style={{ fontSize: "2.5rem", marginBottom: "4px" }}>{match.teamB.flag}</div>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                color: textB,
              }}
            >
              {match.teamB.name}
            </div>
          </div>

          {/* VS badge — center */}
          <div
            className="vs-badge"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
              background: "#F0B90B",
              color: "#0a0a0a",
              fontWeight: 900,
              fontSize: "1.3rem",
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 30px rgba(240,185,11,0.5), 0 0 60px rgba(240,185,11,0.2)",
              border: "3px solid rgba(0,0,0,0.2)",
            }}
          >
            VS
          </div>
        </div>

        {/* Match info bar below the arena */}
        <div style={{ background: "#0a0a0a", padding: "16px 24px" }}>
          <div style={{ fontSize: "0.72rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, textAlign: "center", marginBottom: "16px" }}>
            {match.group} · {match.kickoffDisplay} · {match.venue}
          </div>

          {/* Pool stats */}
          <div style={{ display: "flex", gap: "16px" }}>
            <div style={{ flex: 1, background: "#141414", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
              <div style={{ fontSize: "0.6rem", color: "#444", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>Total Pool</div>
              <div style={{ fontFamily: "monospace", fontWeight: 700, color: isResolved ? "#1DB954" : "#F0B90B", fontSize: "1.3rem" }} className="countup">
                {(match.totalSol || 0).toFixed(2)} SOL
              </div>
            </div>
            <div style={{ flex: 1, background: "#141414", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
              <div style={{ fontSize: "0.6rem", color: "#444", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>♥ World Vision</div>
              <div style={{ fontFamily: "monospace", fontWeight: 700, color: isResolved ? "#1DB954" : "#F0B90B", fontSize: "1.3rem" }}>
                {(match.totalSol || 0).toFixed(2)} SOL
              </div>
            </div>
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

      {/* =================== Project selection with hero images =================== */}
      {!isResolved && !funded && (
        <>
          <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: "16px", textAlign: "center" }}>
            Which dream do you want to fund?
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>
            {/* Team A project card */}
            <div
              onClick={() => setSelectedTeam("A")}
              style={{
                background: "#0a0a0a",
                border: selectedTeam === "A" ? "3px solid #F0B90B" : "3px solid rgba(255,255,255,0.06)",
                borderRadius: "16px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "border-color 0.2s, transform 0.2s",
                boxShadow: selectedTeam === "A"
                  ? "0 0 20px rgba(240,185,11,0.15)"
                  : "0 4px 24px rgba(0,0,0,0.3)",
              }}
            >
              {/* Hero image */}
              <div style={{ position: "relative", height: "160px", overflow: "hidden" }}>
                <img
                  src={match.teamA.project.imageUrl}
                  alt={match.teamA.project.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                {/* Dark gradient overlay at the bottom for text readability */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "60px",
                    background: "linear-gradient(transparent, rgba(10,10,10,0.8))",
                  }}
                />
                {/* Selected overlay */}
                {selectedTeam === "A" && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(240,185,11,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        background: "#F0B90B",
                        color: "#0a0a0a",
                        fontWeight: 800,
                        fontSize: "0.7rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        padding: "6px 14px",
                        borderRadius: "6px",
                      }}
                    >
                      ✓ SELECTED
                    </span>
                  </div>
                )}
              </div>
              {/* Content */}
              <div style={{ padding: "16px" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "4px" }}>{match.teamA.flag}</div>
                <div style={{ fontSize: "0.6rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
                  If {match.teamA.name} wins →
                </div>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
                  {match.teamA.project.name}
                </div>
                <div style={{ fontSize: "0.78rem", color: "#888", lineHeight: 1.5 }}>
                  {match.teamA.project.description}
                </div>
              </div>
            </div>

            {/* Team B project card */}
            <div
              onClick={() => setSelectedTeam("B")}
              style={{
                background: "#0a0a0a",
                border: selectedTeam === "B" ? "3px solid #F0B90B" : "3px solid rgba(255,255,255,0.06)",
                borderRadius: "16px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "border-color 0.2s, transform 0.2s",
                boxShadow: selectedTeam === "B"
                  ? "0 0 20px rgba(240,185,11,0.15)"
                  : "0 4px 24px rgba(0,0,0,0.3)",
              }}
            >
              {/* Hero image */}
              <div style={{ position: "relative", height: "160px", overflow: "hidden" }}>
                <img
                  src={match.teamB.project.imageUrl}
                  alt={match.teamB.project.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "60px",
                    background: "linear-gradient(transparent, rgba(10,10,10,0.8))",
                  }}
                />
                {selectedTeam === "B" && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(240,185,11,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        background: "#F0B90B",
                        color: "#0a0a0a",
                        fontWeight: 800,
                        fontSize: "0.7rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        padding: "6px 14px",
                        borderRadius: "6px",
                      }}
                    >
                      ✓ SELECTED
                    </span>
                  </div>
                )}
              </div>
              {/* Content */}
              <div style={{ padding: "16px" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "4px" }}>{match.teamB.flag}</div>
                <div style={{ fontSize: "0.6rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
                  If {match.teamB.name} wins →
                </div>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
                  {match.teamB.project.name}
                </div>
                <div style={{ fontSize: "0.78rem", color: "#888", lineHeight: 1.5 }}>
                  {match.teamB.project.description}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* =================== Fund form =================== */}
      {!isResolved && !funded && selectedTeam && (
        <div style={{ maxWidth: "420px", margin: "0 auto", background: "#0a0a0a", borderRadius: "14px", padding: "24px", boxShadow: "0 4px 24px rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}>
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

      {/* =================== Success state =================== */}
      {funded && txSig && (
        <div style={{ background: "#0a0a0a", border: "2px solid #1DB954", borderRadius: "14px", padding: "24px", textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}>
          <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🎉</div>
          <div style={{ fontSize: "1.2rem", fontWeight: 900, textTransform: "uppercase", color: "#1DB954", marginBottom: "8px" }}>
            YOU&apos;RE BACKING {selectedTeam === "A" ? match.teamA.name.toUpperCase() : match.teamB.name.toUpperCase()}!
          </div>
          <div style={{ fontSize: "0.9rem", color: "#ccc", marginBottom: "16px" }}>
            If they win, {selectedTeam === "A" ? match.teamA.project.name : match.teamB.project.name} gets funded.
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
                `I'm backing ${selectedTeam === "A" ? match.teamA.name : match.teamB.name} to fund ${selectedTeam === "A" ? match.teamA.project.name : match.teamB.project.name} during the World Cup 🌍⚽ #GoalFund`
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

      {/* =================== Charity info =================== */}
      <div style={{ marginTop: "24px", padding: "16px 20px", background: "rgba(10,10,10,0.85)", borderRadius: "12px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 4px 24px rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}>
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
