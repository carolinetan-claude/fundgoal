"use client"

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

export function WalletButton() {
  return (
    <WalletMultiButton
      style={{
        background: "#F0B90B",
        color: "#0a0a0a",
        fontWeight: 700,
        fontSize: "0.75rem",
        textTransform: "uppercase",
        borderRadius: "8px",
        padding: "8px 16px",
        border: "none",
        cursor: "pointer",
        height: "auto",
        lineHeight: 1.4,
      }}
    />
  )
}
