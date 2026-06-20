import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import "./globals.css"
import { WalletProvider } from "@/components/WalletProvider"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "FundGoal — Fund a Dream",
  description:
    "The World Cup is happening. Use prediction pools to fund real charity projects — 100% of stakes go to World Vision. Verified on Solana.",
  openGraph: {
    title: "FundGoal — Fund a Dream",
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
      <body className="min-h-full flex flex-col" style={{ background: "#0a0a0a", color: "#fff" }}>
        <WalletProvider>
          {/* Header */}
          <header
            style={{
              borderBottom: "1px solid #2a2a2a",
              padding: "14px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              maxWidth: "1200px",
              margin: "0 auto",
              width: "100%",
            }}
          >
            <a
              href="/"
              style={{
                fontSize: "1.2rem",
                fontWeight: 800,
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                textDecoration: "none",
              }}
            >
              FUNDGOAL
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <a
                href="https://thegivingblock.com/donate/world-vision/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "0.72rem",
                  color: "#888",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span style={{ color: "#1DB954" }}>♥</span> World Vision
              </a>
            </div>
          </header>

          {/* Main */}
          <main
            style={{
              flex: 1,
              maxWidth: "1200px",
              margin: "0 auto",
              width: "100%",
              padding: "0 24px",
            }}
          >
            {children}
          </main>

          {/* Footer */}
          <footer
            style={{
              borderTop: "1px solid #1a1a1a",
              padding: "24px",
              textAlign: "center",
              maxWidth: "1200px",
              margin: "0 auto",
              width: "100%",
            }}
          >
            <div style={{ fontSize: "0.75rem", color: "#444" }}>
              FundGoal · 100% of stakes fund real projects · World Vision via{" "}
              <a
                href="https://thegivingblock.com/donate/world-vision/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#F0B90B", textDecoration: "none" }}
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
