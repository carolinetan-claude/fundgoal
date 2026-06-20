import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import "./globals.css"
import { WalletProvider } from "@/components/WalletProvider"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "GoalFund — Fund a Dream",
  description:
    "The World Cup is happening. Use prediction pools to fund real charity projects — 100% of stakes go to World Vision. Verified on Solana.",
  openGraph: {
    title: "GoalFund — Fund a Dream",
    description:
      "Pick a team. Back a dream. 100% of your SOL funds a real project during the 2026 World Cup.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ background: "#0a0a0a", color: "#FFFFFF" }}>
        <WalletProvider>
          {/* Fixed hero background image */}
          <div className="hero-bg" aria-hidden="true" />

          {/* Header — glass over the hero image */}
          <header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 50,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              padding: "14px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              maxWidth: "1200px",
              margin: "0 auto",
              width: "100%",
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <a
              href="/"
              style={{
                fontSize: "1.2rem",
                fontWeight: 900,
                color: "#FFFFFF",
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <img src="/icon.svg" alt="" width={28} height={28} style={{ borderRadius: "6px" }} />
              GOALFUND
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <a
                href="https://thegivingblock.com/donate/world-vision/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span style={{ color: "#F0B90B" }}>♥</span> World Vision
              </a>
            </div>
          </header>

          {/* Main — sits above the fixed background */}
          <main
            style={{
              flex: 1,
              maxWidth: "1200px",
              margin: "0 auto",
              width: "100%",
              padding: "0 24px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {children}
          </main>

          {/* Footer */}
          <footer
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              padding: "24px",
              textAlign: "center",
              maxWidth: "1200px",
              margin: "0 auto",
              width: "100%",
              position: "relative",
              zIndex: 1,
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
              GoalFund · 100% of stakes fund real projects · World Vision via{" "}
              <a
                href="https://thegivingblock.com/donate/world-vision/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#F0B90B", textDecoration: "underline" }}
              >
                The Giving Block
              </a>{" "}
              · EIN 95-1922279 · Built on Solana
            </div>
          </footer>
        </WalletProvider>
      </body>
    </html>
  )
}
