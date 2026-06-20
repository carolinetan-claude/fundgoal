import { MATCHES, CHARITY_URL } from "@/lib/matches"
import { notFound } from "next/navigation"
import { MatchDetail } from "@/components/MatchDetail"

export const dynamic = "force-dynamic"

async function getMatchState(id: string) {
  try {
    const fs = await import("fs")
    const path = await import("path")
    const statePath = path.join(process.cwd(), "public", "match-state.json")
    const raw = fs.readFileSync(statePath, "utf-8")
    const states = JSON.parse(raw)
    return states[id] || null
  } catch {
    return null
  }
}

export default async function MatchPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const match = MATCHES.find((m) => m.id === id)
  if (!match) notFound()

  const state = await getMatchState(id)

  const matchWithState = {
    ...match,
    status: state?.status || match.status,
    winner: state?.winner || match.winner,
    totalSol: state?.totalSol || match.totalSol || 0,
    solscanTx: state?.solscanTx || match.solscanTx,
  }

  return <MatchDetail match={matchWithState} charityUrl={CHARITY_URL} />
}
