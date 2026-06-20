import { MATCHES } from "@/lib/matches"
import { MatchCard } from "@/components/MatchCard"
import { FlagCloud } from "@/components/FlagCloud"
import { CharityMarquee } from "@/components/CharityMarquee"

export const dynamic = "force-dynamic"

async function getMatchStates() {
  try {
    const fs = await import("fs")
    const path = await import("path")
    const statePath = path.join(process.cwd(), "public", "match-state.json")
    const raw = fs.readFileSync(statePath, "utf-8")
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export default async function Home() {
  const states = await getMatchStates()

  const matchesWithState = MATCHES.map((m) => ({
    ...m,
    status: states[m.id]?.status || m.status,
    winner: states[m.id]?.winner || m.winner,
    totalSol: states[m.id]?.totalSol || m.totalSol || 0,
    backers: states[m.id]?.backers || m.backers || 0,
    solscanTx: states[m.id]?.solscanTx || m.solscanTx,
  }))

  return (
    <div style={{ paddingTop: "32px", paddingBottom: "64px" }}>
      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: "12px" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: "12px",
            color: "#FFFFFF",
          }}
        >
          EVERY <span className="shimmer-text">GOAL</span> STARTS WITH A DREAM,
          <br />
          THAT YOU HAVE THE POWER TO <span className="shimmer-text">FUND</span>.
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "1rem",
            maxWidth: "550px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          Pick a match. Back a team. 100% of your SOL funds a real project in that
          country — verified on Solana.
        </p>
      </div>

      {/* Flag Cloud */}
      <FlagCloud />

      {/* How it works */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "48px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {[
          { step: "01", title: "PICK A MATCH", desc: "Choose from live World Cup matches", accent: "#00BFA6", icon: "⚽" },
          { step: "02", title: "BACK A TEAM", desc: "Your SOL backs a project in that country", accent: "#FFD600", icon: "🎯" },
          { step: "03", title: "DREAM GETS FUNDED", desc: "100% goes to the winning project", accent: "#E91E63", icon: "🏆" },
        ].map((s) => (
          <a
            key={s.step}
            href="#matches"
            style={{
              background: "#FDF6E3",
              borderRadius: "12px",
              padding: "24px 20px",
              flex: "1",
              minWidth: "200px",
              maxWidth: "280px",
              borderTop: `4px solid ${s.accent}`,
              textDecoration: "none",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <div
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 900,
                  color: s.accent,
                  lineHeight: 1,
                }}
              >
                {s.step}
              </div>
              <div style={{ fontSize: "1.8rem", lineHeight: 1 }}>{s.icon}</div>
            </div>
            <div
              style={{
                fontSize: "0.9rem",
                fontWeight: 800,
                color: "#1a1a1a",
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                marginBottom: "6px",
              }}
            >
              {s.title}
            </div>
            <div style={{ fontSize: "0.8rem", color: "#5a5a5a" }}>{s.desc}</div>
          </a>
        ))}
      </div>

      {/* Match Grid */}
      <div id="matches" style={{ textAlign: "center", marginBottom: "24px", scrollMarginTop: "80px" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            color: "#FFFFFF",
          }}
        >
          PICK A MATCH
        </h2>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "20px",
          marginBottom: "48px",
        }}
      >
        {matchesWithState.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>

      {/* Charities marquee */}
      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        <div style={{ fontSize: "0.7rem", color: "#F0B90B", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700 }}>
          Charities you can fund
        </div>
      </div>
      <CharityMarquee />
    </div>
  )
}
