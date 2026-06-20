import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const STATE_FILE = path.join(process.cwd(), "public", "match-state.json")
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "fundgoal2026"

function readState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, "utf-8"))
  } catch {
    return {}
  }
}

function writeState(state: Record<string, unknown>) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password, matchId, action, winner, totalSol, solscanTx } = body

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const state = readState()

    if (action === "set-live") {
      state[matchId] = {
        ...state[matchId],
        status: "live",
      }
    } else if (action === "resolve") {
      if (!winner || !["A", "B"].includes(winner)) {
        return NextResponse.json({ error: "Invalid winner" }, { status: 400 })
      }
      state[matchId] = {
        ...state[matchId],
        status: "resolved",
        winner,
        totalSol: totalSol || 0,
        solscanTx: solscanTx || `demo-${matchId}-${Date.now()}`,
      }
    } else if (action === "reset") {
      state[matchId] = {
        status: "upcoming",
        winner: null,
        totalSol: 0,
        solscanTx: null,
      }
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    writeState(state)
    return NextResponse.json({ success: true, state: state[matchId] })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function GET() {
  const state = readState()
  return NextResponse.json(state)
}
