"use client"

import { useState } from "react"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { SystemProgram, Transaction, LAMPORTS_PER_SOL } from "@solana/web3.js"
import { getMatchPoolPDA, CHARITY_WALLET } from "@/lib/solana"

interface FundFormProps {
  matchId: string
  teamChoice: number
  teamName: string
  projectName: string
  onSuccess: (txSig: string) => void
}

export function FundForm({ matchId, teamChoice, teamName, projectName, onSuccess }: FundFormProps) {
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFund = async () => {
    if (!publicKey || !amount) return

    const solAmount = parseFloat(amount)
    if (isNaN(solAmount) || solAmount < 0.01) {
      setError("Minimum 0.01 SOL")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const lamports = Math.floor(solAmount * LAMPORTS_PER_SOL)
      const [poolPDA] = await getMatchPoolPDA(matchId)

      // For hackathon: send SOL directly to the pool PDA (simulated)
      // In production this would call the Anchor program deposit instruction
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: poolPDA,
          lamports,
        })
      )

      const sig = await sendTransaction(tx, connection)
      await connection.confirmTransaction(sig, "confirmed")

      onSuccess(sig)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Transaction failed"
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const presets = [0.1, 0.5, 1.0, 2.0]

  return (
    <div>
      {/* Amount */}
      <div style={{ marginBottom: "16px" }}>
        <div style={{ fontSize: "0.65rem", color: "#444", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px", fontWeight: 600 }}>
          How much SOL to fund?
        </div>

        {/* Presets */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setAmount(p.toString())}
              style={{
                flex: 1,
                padding: "10px",
                background: amount === p.toString() ? "#1a1500" : "#1a1a1a",
                border: `1px solid ${amount === p.toString() ? "#F0B90B" : "#2a2a2a"}`,
                borderRadius: "8px",
                color: amount === p.toString() ? "#F0B90B" : "#888",
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Custom input */}
        <div style={{ position: "relative" }}>
          <input
            type="number"
            step="0.01"
            min="0.01"
            placeholder="Enter SOL amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 60px 14px 16px",
              background: "#1a1a1a",
              border: "1px solid #2a2a2a",
              borderRadius: "8px",
              color: "#fff",
              fontFamily: "monospace",
              fontSize: "1rem",
              outline: "none",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#F0B90B")}
            onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
          />
          <span style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#888",
            fontSize: "0.85rem",
            fontWeight: 600,
          }}>
            SOL
          </span>
        </div>
      </div>

      {/* Summary */}
      {amount && parseFloat(amount) > 0 && (
        <div style={{
          background: "#1a1a1a",
          borderRadius: "8px",
          padding: "14px",
          marginBottom: "16px",
          fontSize: "0.82rem",
          color: "#888",
        }}>
          <div style={{ marginBottom: "4px" }}>
            Backing: <span style={{ color: "#fff", fontWeight: 700 }}>{teamName}</span>
          </div>
          <div style={{ marginBottom: "4px" }}>
            Project: <span style={{ color: "#fff" }}>{projectName}</span>
          </div>
          <div>
            <span style={{ color: "#F0B90B" }}>♥ {parseFloat(amount).toFixed(2)} SOL</span> funds {projectName} if {teamName} wins
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{ color: "#ff4444", fontSize: "0.82rem", marginBottom: "12px", padding: "8px 12px", background: "#1a0000", borderRadius: "6px" }}>
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleFund}
        disabled={!amount || parseFloat(amount) <= 0 || loading}
        style={{
          width: "100%",
          padding: "16px",
          background: loading ? "#7a5c05" : "#F0B90B",
          color: "#0a0a0a",
          fontWeight: 900,
          fontSize: "1rem",
          textTransform: "uppercase",
          letterSpacing: "0.02em",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "wait" : "pointer",
          opacity: !amount || parseFloat(amount) <= 0 ? 0.4 : 1,
          transition: "opacity 0.2s, background 0.2s",
        }}
      >
        {loading ? "CONFIRMING..." : "FUND THIS MATCH"}
      </button>

      <div style={{ textAlign: "center", marginTop: "12px", fontSize: "0.72rem", color: "#444" }}>
        100% of your SOL goes to the winning project. No fees. Verified on Solana.
      </div>
    </div>
  )
}
