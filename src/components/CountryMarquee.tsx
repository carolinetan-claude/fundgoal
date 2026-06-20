"use client"

import { Marquee } from "@/components/ui/marquee"

interface CountryPlaque {
  flag: string
  name: string
  project: string
  dream: string
}

const countries: CountryPlaque[] = [
  {
    flag: "🇩🇪",
    name: "GERMANY",
    project: "Youth Football Academy, Cologne",
    dream: "Where the next generation finds their first pitch",
  },
  {
    flag: "🇨🇮",
    name: "IVORY COAST",
    project: "Dream Pitch Academy, Abidjan",
    dream: "From dirt pitches to the World Cup stage",
  },
  {
    flag: "🇪🇨",
    name: "ECUADOR",
    project: "Indigenous Youth Sport, Guayaquil",
    dream: "Football as a common language for every community",
  },
  {
    flag: "🇨🇼",
    name: "CURAÇAO",
    project: "Caribbean Youth Dev, Willemstad",
    dream: "150,000 people. One island. One impossible dream.",
  },
  {
    flag: "🇹🇳",
    name: "TUNISIA",
    project: "Football + Education, Tunis",
    dream: "The beautiful game keeps kids in school",
  },
  {
    flag: "🇯🇵",
    name: "JAPAN",
    project: "Girls' Grassroots Football",
    dream: "One generation from unknown to unstoppable",
  },
  {
    flag: "🇺🇾",
    name: "URUGUAY",
    project: "Youth Development, Montevideo",
    dream: "A tiny nation that punches above its weight",
  },
  {
    flag: "🇨🇻",
    name: "CAPE VERDE",
    project: "Island Youth Sport, Praia",
    dream: "600,000 people. First ever World Cup. Dream alive.",
  },
]

const dreamQuotes = [
  { flag: "⚽", text: "Every kid with a ball has a dream" },
  { flag: "🇨🇮", text: "Abidjan to the world stage — one goal at a time" },
  { flag: "🌍", text: "100% of your SOL funds a real project" },
  { flag: "🇨🇼", text: "Curaçao: proof that small islands dream big" },
  { flag: "🇨🇻", text: "Cape Verde's first World Cup — history in the making" },
  { flag: "🇯🇵", text: "Japan went from nothing to everything in football" },
  { flag: "⚡", text: "Verified on Solana. No middleman. No trust required." },
  { flag: "🇪🇨", text: "From the Andes to the pitch — Ecuador dreams" },
]

function CountryCard({ country }: { country: CountryPlaque }) {
  return (
    <div
      style={{
        background: "#0a0a0a",
        borderRadius: "12px",
        padding: "16px 20px",
        width: "280px",
        flexShrink: 0,
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
        <span style={{ fontSize: "2rem" }}>{country.flag}</span>
        <div>
          <div
            style={{
              fontSize: "0.85rem",
              fontWeight: 900,
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
            }}
          >
            {country.name}
          </div>
          <div style={{ fontSize: "0.7rem", color: "#F0B90B", fontWeight: 600 }}>
            {country.project}
          </div>
        </div>
      </div>
      <div style={{ fontSize: "0.78rem", color: "#888", fontStyle: "italic", lineHeight: 1.4 }}>
        &ldquo;{country.dream}&rdquo;
      </div>
    </div>
  )
}

function DreamCard({ flag, text }: { flag: string; text: string }) {
  return (
    <div
      style={{
        background: "#0a0a0a",
        borderRadius: "10px",
        padding: "12px 18px",
        width: "320px",
        flexShrink: 0,
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "default",
      }}
    >
      <span style={{ fontSize: "1.3rem" }}>{flag}</span>
      <span style={{ fontSize: "0.82rem", color: "#ccc", fontWeight: 500 }}>{text}</span>
    </div>
  )
}

export function CountryMarquee() {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        overflow: "hidden",
        padding: "24px 0",
      }}
    >
      {/* Row 1 — Country plaques scrolling left */}
      <Marquee pauseOnHover className="[--duration:35s] mb-4">
        {countries.map((c) => (
          <CountryCard key={c.name} country={c} />
        ))}
      </Marquee>

      {/* Row 2 — Dream quotes scrolling right */}
      <Marquee reverse pauseOnHover className="[--duration:30s]">
        {dreamQuotes.map((q, i) => (
          <DreamCard key={i} flag={q.flag} text={q.text} />
        ))}
      </Marquee>

      {/* Fade edges — gold gradient to match yellow bg */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "80px",
          background: "linear-gradient(to right, #F0B90B, transparent)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "80px",
          background: "linear-gradient(to left, #F0B90B, transparent)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    </div>
  )
}
