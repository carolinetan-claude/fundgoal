export type MatchStatus = "upcoming" | "live" | "resolved"

export interface Project {
  name: string
  description: string
  country: string
  flag: string
  worldVisionUrl: string
}

export interface Match {
  id: string
  teamA: {
    name: string
    flag: string
    code: string
    project: Project
  }
  teamB: {
    name: string
    flag: string
    code: string
    project: Project
  }
  kickoff: string       // ISO string UTC
  kickoffDisplay: string // Human readable ET
  group: string
  venue: string
  status: MatchStatus
  winner?: "A" | "B"
  totalSol?: number
  solscanTx?: string
  poolAddress?: string
}

export const CHARITY_URL = "https://thegivingblock.com/donate/world-vision/"
export const CHARITY_NAME = "World Vision"
export const CHARITY_EIN = "95-1922279"

export const MATCHES: Match[] = [
  {
    id: "ger-civ",
    teamA: {
      name: "Germany",
      flag: "🇩🇪",
      code: "GER",
      project: {
        name: "Youth Football Academy, Cologne",
        description: "Giving underprivileged kids in Cologne access to structured football training, mentorship, and a pathway out of poverty through the sport they love.",
        country: "Germany",
        flag: "🇩🇪",
        worldVisionUrl: CHARITY_URL,
      },
    },
    teamB: {
      name: "Ivory Coast",
      flag: "🇨🇮",
      code: "CIV",
      project: {
        name: "Dream Pitch Academy, Abidjan",
        description: "In the neighbourhoods of Abidjan, football is everything. This programme gives young players a real pitch, real coaching, and the belief that the World Cup stage is within reach.",
        country: "Ivory Coast",
        flag: "🇨🇮",
        worldVisionUrl: CHARITY_URL,
      },
    },
    kickoff: "2026-06-20T20:00:00Z",
    kickoffDisplay: "Jun 20 · 4:00 PM ET",
    group: "Group E",
    venue: "BMO Field, Toronto",
    status: "upcoming",
  },
  {
    id: "ecu-curacao",
    teamA: {
      name: "Ecuador",
      flag: "🇪🇨",
      code: "ECU",
      project: {
        name: "Indigenous Youth Sport, Guayaquil",
        description: "Football is the common language in Ecuador's underserved coastal communities. This project provides equipment, coaching, and safe spaces for indigenous youth to play and grow.",
        country: "Ecuador",
        flag: "🇪🇨",
        worldVisionUrl: CHARITY_URL,
      },
    },
    teamB: {
      name: "Curaçao",
      flag: "🇨🇼",
      code: "CUW",
      project: {
        name: "Caribbean Youth Development, Willemstad",
        description: "Curaçao — a tiny island of 150,000 people — just made their World Cup debut. This project funds the next generation of dreamers on the island, proving small nations can chase big dreams.",
        country: "Curaçao",
        flag: "🇨🇼",
        worldVisionUrl: CHARITY_URL,
      },
    },
    kickoff: "2026-06-21T00:00:00Z",
    kickoffDisplay: "Jun 20 · 8:00 PM ET",
    group: "Group F",
    venue: "Arrowhead Stadium, Kansas City",
    status: "upcoming",
  },
  {
    id: "tun-jpn",
    teamA: {
      name: "Tunisia",
      flag: "🇹🇳",
      code: "TUN",
      project: {
        name: "Community Football + Education, Tunis",
        description: "In Tunisia, football and education go hand in hand. This programme uses the beautiful game to keep kids in school, off the streets, and dreaming of the future.",
        country: "Tunisia",
        flag: "🇹🇳",
        worldVisionUrl: CHARITY_URL,
      },
    },
    teamB: {
      name: "Japan",
      flag: "🇯🇵",
      code: "JPN",
      project: {
        name: "Girls' Grassroots Football, Rural Japan",
        description: "One generation ago, Japan was not a football nation. Today they're at the World Cup. This project funds girls in rural Japan who are writing the next chapter of that story.",
        country: "Japan",
        flag: "🇯🇵",
        worldVisionUrl: CHARITY_URL,
      },
    },
    kickoff: "2026-06-21T04:00:00Z",
    kickoffDisplay: "Jun 21 · 12:00 AM ET",
    group: "Group K",
    venue: "Estadio BBVA, Monterrey",
    status: "upcoming",
  },
  {
    id: "uru-cpv",
    teamA: {
      name: "Uruguay",
      flag: "🇺🇾",
      code: "URU",
      project: {
        name: "Youth Development Programme, Montevideo",
        description: "Uruguay punches far above its weight on the world stage. This project gives the next generation of Uruguayan kids the same chance their heroes had — a ball, a pitch, and a dream.",
        country: "Uruguay",
        flag: "🇺🇾",
        worldVisionUrl: CHARITY_URL,
      },
    },
    teamB: {
      name: "Cape Verde",
      flag: "🇨🇻",
      code: "CPV",
      project: {
        name: "Island Youth Sport Programme, Praia",
        description: "Cape Verde — a nation of 600,000 people on a tiny Atlantic archipelago — is at the World Cup for the first time. This project funds the kids on those islands who watched and dared to dream.",
        country: "Cape Verde",
        flag: "🇨🇻",
        worldVisionUrl: CHARITY_URL,
      },
    },
    kickoff: "2026-06-21T22:00:00Z",
    kickoffDisplay: "Jun 21 · 6:00 PM ET",
    group: "Group I",
    venue: "Hard Rock Stadium, Miami",
    status: "upcoming",
  },
]

export function getMatch(id: string): Match | undefined {
  return MATCHES.find((m) => m.id === id)
}

export function getMatchStatus(match: Match): MatchStatus {
  return match.status
}

export function getWinningProject(match: Match): Project | undefined {
  if (match.status !== "resolved" || !match.winner) return undefined
  return match.winner === "A" ? match.teamA.project : match.teamB.project
}

export function getLosingProject(match: Match): Project | undefined {
  if (match.status !== "resolved" || !match.winner) return undefined
  return match.winner === "A" ? match.teamB.project : match.teamA.project
}

export function getWinningTeam(match: Match) {
  if (!match.winner) return undefined
  return match.winner === "A" ? match.teamA : match.teamB
}
