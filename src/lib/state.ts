import { MatchStatus } from "./matches"
import fs from "fs"
import path from "path"

export interface MatchState {
  status: MatchStatus
  winner: "A" | "B" | null
  totalSol: number
  solscanTx: string | null
}

export interface AllMatchState {
  [matchId: string]: MatchState
}

const STATE_FILE = path.join(process.cwd(), "public", "match-state.json")

export function readMatchState(): AllMatchState {
  try {
    const raw = fs.readFileSync(STATE_FILE, "utf-8")
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export function writeMatchState(state: AllMatchState): void {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2))
}

export function getMatchState(matchId: string): MatchState {
  const all = readMatchState()
  return all[matchId] || { status: "upcoming", winner: null, totalSol: 0, solscanTx: null }
}

export function updateMatchState(matchId: string, update: Partial<MatchState>): void {
  const all = readMatchState()
  all[matchId] = { ...all[matchId], ...update }
  writeMatchState(all)
}
