import { MATCHES, CHARITY_NAME } from "@/lib/matches"
import { notFound } from "next/navigation"
import { solscanTxUrl } from "@/lib/solana"

export const dynamic = "force-dynamic"

async function getMatchState(matchId: string) {
  try {
    const fs = await import("fs")
    const path = await import("path")
    const statePath = path.join(process.cwd(), "public", "match-state.json")
    const raw = fs.readFileSync(statePath, "utf-8")
    const states = JSON.parse(raw)
    return states[matchId] || null
  } catch {
    return null
  }
}

function parseThankYouId(id: string) {
  // Format: walletAddress-matchId
  // Match IDs have dashes too, so we split carefully
  const knownMatchIds = MATCHES.map((m) => m.id)
  for (const mid of knownMatchIds) {
    if (id.endsWith(`-${mid}`)) {
      const wallet = id.slice(0, id.length - mid.length - 1)
      return { wallet, matchId: mid }
    }
  }
  return null
}

export default async function ThanksPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const parsed = parseThankYouId(id)
  if (!parsed) notFound()

  const match = MATCHES.find((m) => m.id === parsed.matchId)
  if (!match) notFound()

  const state = await getMatchState(parsed.matchId)
  const status = state?.status || match.status
  const winner = state?.winner || match.winner
  const totalSol = state?.totalSol || 0
  const solscanTx = state?.solscanTx || null

  // We don't know which team the giver backed from the URL alone
  // For the hackathon, show a generic thank-you that works for both
  const isResolved = status === "resolved"
  const winningTeam = winner === "A" ? match.teamA : winner === "B" ? match.teamB : null
  const losingTeam = winner === "A" ? match.teamB : winner === "B" ? match.teamA : null

  const shareText = isResolved && winningTeam
    ? `${winningTeam.project.name} in ${winningTeam.project.country} just got funded with ${totalSol.toFixed(2)} SOL during the World Cup! Verified on Solana. #FundGoal`
    : `I'm backing a dream during the World Cup with FundGoal. ${match.teamA.name} vs ${match.teamB.name} — 100% of SOL goes to a real project. #FundGoal`

  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`

  return (
    <div style={{ paddingTop: "48px", paddingBottom: "64px", maxWidth: "600px", margin: "0 auto" }}>
      {/* Card */}
      <div
        style={{
          background: "#141414",
          border: `2px solid ${isResolved ? "#1DB954" : "#F0B90B"}`,
          borderRadius: "16px",
          padding: "40px 32px",
          textAlign: "center",
        }}
      >
        {isResolved && winningTeam ? (
          /* RESOLVED STATE */
          <>
            <div style={{ fontSize: "4rem", marginBottom: "12px" }}>{winningTeam.flag}</div>
            <div style={{ fontSize: "0.7rem", color: "#1DB954", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "8px" }}>
              DREAM FUNDED
            </div>
            <div style={{ fontSize: "1.8rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: "12px" }}>
              {winningTeam.name} WINS!
            </div>
            <div style={{ fontSize: "1rem", color: "#ccc", marginBottom: "8px", lineHeight: 1.5 }}>
              <strong style={{ color: "#fff" }}>{winningTeam.project.name}</strong> in{" "}
              {winningTeam.project.country} just got funded.
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontWeight: 700,
                color: "#1DB954",
                fontSize: "2rem",
                margin: "20px 0",
              }}
              className="countup"
            >
              {totalSol.toFixed(2)} SOL
            </div>
            <div style={{ fontSize: "0.82rem", color: "#888", marginBottom: "8px" }}>
              Donated to {CHARITY_NAME} · Verified on Solana
            </div>
            {solscanTx && (
              <a
                href={solscanTxUrl(solscanTx)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#F0B90B", fontSize: "0.82rem", textDecoration: "none" }}
              >
                View on Solscan →
              </a>
            )}
          </>
        ) : (
          /* LIVE / UPCOMING STATE */
          <>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "16px" }}>
              <span style={{ fontSize: "3rem" }}>{match.teamA.flag}</span>
              <span style={{ fontSize: "3rem" }}>{match.teamB.flag}</span>
            </div>
            <div style={{ fontSize: "0.7rem", color: "#F0B90B", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "8px" }}>
              {status === "live" ? "MATCH LIVE" : "BACKING A DREAM"}
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", marginBottom: "12px" }}>
              {match.teamA.name} VS {match.teamB.name}
            </div>
            <div style={{ fontSize: "0.9rem", color: "#ccc", marginBottom: "8px", lineHeight: 1.6 }}>
              Two projects. Two dreams. One match decides which gets funded.
            </div>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "16px", marginBottom: "16px" }}>
              <div style={{ background: "#1a1a1a", borderRadius: "8px", padding: "10px 14px", flex: 1 }}>
                <div style={{ fontSize: "0.65rem", color: "#444", textTransform: "uppercase", letterSpacing: "0.08em" }}>{match.teamA.flag} If {match.teamA.name} wins</div>
                <div style={{ fontSize: "0.82rem", color: "#fff", fontWeight: 600, marginTop: "4px" }}>{match.teamA.project.name}</div>
              </div>
              <div style={{ background: "#1a1a1a", borderRadius: "8px", padding: "10px 14px", flex: 1 }}>
                <div style={{ fontSize: "0.65rem", color: "#444", textTransform: "uppercase", letterSpacing: "0.08em" }}>{match.teamB.flag} If {match.teamB.name} wins</div>
                <div style={{ fontSize: "0.82rem", color: "#fff", fontWeight: 600, marginTop: "4px" }}>{match.teamB.project.name}</div>
              </div>
            </div>
            {totalSol > 0 && (
              <div style={{ fontFamily: "monospace", fontWeight: 700, color: "#F0B90B", fontSize: "1.3rem", margin: "12px 0" }}>
                Pool: {totalSol.toFixed(2)} SOL and growing
              </div>
            )}
            <div style={{ fontSize: "0.78rem", color: "#888" }}>
              {match.kickoffDisplay} · {match.venue}
            </div>
          </>
        )}

        {/* Share + Join buttons */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "28px", flexWrap: "wrap" }}>
          {!isResolved && (
            <a
              href={`/match/${match.id}`}
              style={{
                background: "#F0B90B",
                color: "#0a0a0a",
                fontWeight: 800,
                fontSize: "0.82rem",
                textTransform: "uppercase",
                padding: "12px 24px",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              JOIN ME →
            </a>
          )}
          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: isResolved ? "#1DB954" : "transparent",
              color: isResolved ? "#0a0a0a" : "#fff",
              fontWeight: 700,
              fontSize: "0.82rem",
              textTransform: "uppercase",
              padding: "12px 24px",
              borderRadius: "8px",
              border: isResolved ? "none" : "1px solid #2a2a2a",
              textDecoration: "none",
            }}
          >
            SHARE ON X
          </a>
        </div>
      </div>

      {/* FundGoal attribution */}
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <div style={{ fontSize: "0.72rem", color: "#444" }}>
          FundGoal · 100% of stakes fund real projects · World Vision via{" "}
          <a href="https://thegivingblock.com/donate/world-vision/" target="_blank" rel="noopener noreferrer" style={{ color: "#F0B90B", textDecoration: "none" }}>
            The Giving Block
          </a>
        </div>
        <a href="/" style={{ fontSize: "0.82rem", color: "#888", textDecoration: "none", marginTop: "8px", display: "inline-block" }}>
          ← Back to FundGoal
        </a>
      </div>
    </div>
  )
}
