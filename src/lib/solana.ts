import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js"

export const NETWORK = "devnet"
export const RPC_ENDPOINT = process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com"
export const connection = new Connection(RPC_ENDPOINT, {
  commitment: "confirmed",
  confirmTransactionInitialTimeout: 60000,
})

export const PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_PROGRAM_ID || "11111111111111111111111111111111"
)

export const CHARITY_WALLET = new PublicKey(
  process.env.NEXT_PUBLIC_CHARITY_WALLET || "11111111111111111111111111111111"
)

export function lamportsToSol(lamports: number): number {
  return lamports / LAMPORTS_PER_SOL
}

export function solToLamports(sol: number): number {
  return Math.floor(sol * LAMPORTS_PER_SOL)
}

export function formatSol(sol: number): string {
  return sol.toFixed(2)
}

export function solscanTxUrl(sig: string): string {
  return `https://solscan.io/tx/${sig}?cluster=devnet`
}

export function solscanAddressUrl(address: string): string {
  return `https://solscan.io/account/${address}?cluster=devnet`
}

export async function getMatchPoolPDA(matchId: string): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("match_pool"), Buffer.from(matchId)],
    PROGRAM_ID
  )
}

export async function getStakePDA(matchId: string, giver: PublicKey): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("stake"), Buffer.from(matchId), giver.toBuffer()],
    PROGRAM_ID
  )
}
