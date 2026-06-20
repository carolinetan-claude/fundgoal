import { MATCHES, CHARITY_NAME } from "@/lib/matches"
import { MatchCard } from "@/components/MatchCard"

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
    solscanTx: states[m.id]?.solscanTx || m.solscanTx,
  }))

  return (
    <div style={{ paddingTop: "48px", paddingBottom: "64px" }}>
      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: "12px",
          }}
        >
          THE WORLD CUP IS HAPPENING.
          <br />
          <span style={{ color: "#F0B90B" }}>FUND A DREAM.</span>
        </h1>
        <p
          style={{
            color: "#888",
            fontSize: "1rem",
            maxWidth: "550px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          Pick a match. Back a team. 100% of your SOL funds a real project in that
          country — verified on Solana, powered by{" "}
          <a
            href="https://thegivingblock.com/donate/world-vision/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#F0B90B", textDecoration: "none" }}
          >
            {CHARITY_NAME}
          </a>
          .
        </p>
      </div>

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
          { step: "01", title: "PICK A MATCH", desc: "Choose from live World Cup matches" },
          { step: "02", title: "BACK A TEAM", desc: "Your SOL backs a project in that country" },
          { step: "03", title: "DREAM GETS FUNDED", desc: "100% goes to the winning project" },
        ].map((s) => (
          <div
            key={s.step}
            style={{
              background: "#141414",
              border: "1px solid #2a2a2a",
              borderRadius: "10px",
              padding: "16px 20px",
              flex: "1",
              minWidth: "200px",
              maxWidth: "280px",
            }}
          >
            <div
              style={{
                fontSize: "0.65rem",
                color: "#F0B90B",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "6px",
              }}
            >
              Step {s.step}
            </div>
            <div
              style={{
                fontSize: "0.9rem",
                fontWeight: 800,
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                marginBottom: "4px",
              }}
            >
              {s.title}
            </div>
            <div style={{ fontSize: "0.8rem", color: "#888" }}>{s.desc}</div>
          </div>
        ))}
      </div>

      {/* Match Grid */}
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

      {/* Charity banner */}
      <div
        style={{
          background: "#141414",
          border: "1px solid #2a2a2a",
          borderRadius: "12px",
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ fontSize: "2rem" }}>🌍</div>
        <div style={{ flex: 1, minWidth: "200px" }}>
          <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#fff", marginBottom: "2px" }}>
            {CHARITY_NAME} United States
          </div>
          <div style={{ fontSize: "0.78rem", color: "#888" }}>
            70+ years empowering children &amp; communities out of poverty · EIN: 95-1922279 · 501(c)(3)
          </div>
          <div style={{ fontSize: "0.72rem", color: "#666", marginTop: "2px" }}>
            Accepts SOL &amp; all major crypto via The Giving Block
          </div>
        </div>
        <a
          href="https://thegivingblock.com/donate/world-vision/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "0.7rem",
            padding: "6px 14px",
            borderRadius: "6px",
            background: "#1a2a1a",
            color: "#1DB954",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            textDecoration: "none",
            border: "1px solid #0d5c26",
          }}
        >
          ✓ VERIFIED
        </a>
      </div>
    </div>
  )
}
