export type MatchStatus = "upcoming" | "live" | "resolved"

export type PlayerPosition = "striker" | "winger" | "midfielder" | "goalkeeper"

export interface Project {
  name: string
  description: string
  whoIsThisFor: string
  whatFundsUsedFor: string
  whyUnique: string
  country: string
  flag: string
  worldVisionUrl: string
  imageUrl: string
}

export interface Team {
  name: string
  flag: string
  code: string
  jerseyColor: string   // Primary kit colour hex
  position: PlayerPosition // Iconic position for silhouette
  project: Project
}

export interface Match {
  id: string
  teamA: Team
  teamB: Team
  kickoff: string       // ISO string UTC
  kickoffDisplay: string // Human readable ET
  group: string
  venue: string
  status: MatchStatus
  winner?: "A" | "B"
  totalSol?: number
  backers?: number
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
      jerseyColor: "#FFFFFF",
      position: "striker",
      project: {
        name: "Youth Football Academy, Cologne",
        description: "Giving underprivileged kids in Cologne access to structured football training, mentorship, and a pathway out of poverty through the sport they love.",
        whoIsThisFor: "Underprivileged children aged 8–16 in Cologne's underserved neighbourhoods",
        whatFundsUsedFor: "Coaching staff, training equipment, pitch rental, and after-school mentorship programmes",
        whyUnique: "One of the only programmes in Germany that combines elite-level football training with academic support for kids who can't afford club fees",
        country: "Germany",
        flag: "🇩🇪",
        worldVisionUrl: CHARITY_URL,
        imageUrl: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&h=400&fit=crop",
      },
    },
    teamB: {
      name: "Ivory Coast",
      flag: "🇨🇮",
      code: "CIV",
      jerseyColor: "#FF6B00",
      position: "winger",
      project: {
        name: "Dream Pitch Academy, Abidjan",
        description: "In the neighbourhoods of Abidjan, football is everything. This programme gives young players a real pitch, real coaching, and the belief that the World Cup stage is within reach.",
        whoIsThisFor: "Young footballers aged 10–18 in Abidjan's low-income communities",
        whatFundsUsedFor: "Building safe pitches, hiring local coaches, providing boots and kits, and covering tournament travel",
        whyUnique: "Abidjan produced Didier Drogba — this academy finds the next generation in the same neighbourhoods, where talent is everywhere but opportunity is not",
        country: "Ivory Coast",
        flag: "🇨🇮",
        worldVisionUrl: CHARITY_URL,
        imageUrl: "https://images.unsplash.com/photo-1594735528379-2a1e8a840f73?w=600&h=400&fit=crop",
      },
    },
    kickoff: "2026-06-20T20:00:00Z",
    kickoffDisplay: "Jun 20 · 4:00 PM ET",
    group: "Group E",
    venue: "BMO Field, Toronto",
    status: "upcoming",
    totalSol: 12.85,
    backers: 47,
  },
  {
    id: "ecu-curacao",
    teamA: {
      name: "Ecuador",
      flag: "🇪🇨",
      code: "ECU",
      jerseyColor: "#FFD700",
      position: "midfielder",
      project: {
        name: "Indigenous Youth Sport, Guayaquil",
        description: "Football is the common language in Ecuador's underserved coastal communities. This project provides equipment, coaching, and safe spaces for indigenous youth to play and grow.",
        whoIsThisFor: "Indigenous youth aged 6–17 in Guayaquil's coastal communities",
        whatFundsUsedFor: "Equipment, safe playing fields, coaching programmes, and community sport events",
        whyUnique: "The only sports programme specifically serving Ecuador's indigenous coastal communities, where football bridges cultural divides",
        country: "Ecuador",
        flag: "🇪🇨",
        worldVisionUrl: CHARITY_URL,
        imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop",
      },
    },
    teamB: {
      name: "Curaçao",
      flag: "🇨🇼",
      code: "CUW",
      jerseyColor: "#003DA5",
      position: "goalkeeper",
      project: {
        name: "Caribbean Youth Development, Willemstad",
        description: "Curaçao — a tiny island of 150,000 people — just made their World Cup debut. This project funds the next generation of dreamers on the island, proving small nations can chase big dreams.",
        whoIsThisFor: "Children and teens on the island of Curaçao (population 150,000)",
        whatFundsUsedFor: "Youth leagues, coaching certifications, stadium-grade equipment, and inter-island tournament travel",
        whyUnique: "Curaçao just qualified for their first World Cup ever — this programme turns that once-impossible moment into a lasting movement",
        country: "Curaçao",
        flag: "🇨🇼",
        worldVisionUrl: CHARITY_URL,
        imageUrl: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=600&h=400&fit=crop",
      },
    },
    kickoff: "2026-06-21T00:00:00Z",
    kickoffDisplay: "Jun 20 · 8:00 PM ET",
    group: "Group F",
    venue: "Arrowhead Stadium, Kansas City",
    status: "upcoming",
    totalSol: 8.42,
    backers: 31,
  },
  {
    id: "tun-jpn",
    teamA: {
      name: "Tunisia",
      flag: "🇹🇳",
      code: "TUN",
      jerseyColor: "#CC0001",
      position: "winger",
      project: {
        name: "Community Football + Education, Tunis",
        description: "In Tunisia, football and education go hand in hand. This programme uses the beautiful game to keep kids in school, off the streets, and dreaming of the future.",
        whoIsThisFor: "At-risk youth aged 8–16 in Tunis and surrounding communities",
        whatFundsUsedFor: "After-school football leagues, tutoring, school supplies, and safe community spaces",
        whyUnique: "Combines football with education — kids must maintain grades to play, keeping dropout rates near zero in participating communities",
        country: "Tunisia",
        flag: "🇹🇳",
        worldVisionUrl: CHARITY_URL,
        imageUrl: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=600&h=400&fit=crop",
      },
    },
    teamB: {
      name: "Japan",
      flag: "🇯🇵",
      code: "JPN",
      jerseyColor: "#003087",
      position: "midfielder",
      project: {
        name: "Girls' Grassroots Football, Rural Japan",
        description: "One generation ago, Japan was not a football nation. Today they're at the World Cup. This project funds girls in rural Japan who are writing the next chapter of that story.",
        whoIsThisFor: "Girls aged 6–15 in rural Japanese prefectures with no access to football clubs",
        whatFundsUsedFor: "Girls-only coaching clinics, travel to regional tournaments, and grassroots club formation",
        whyUnique: "Japan's football revolution skipped rural girls — this is the first programme to bring structured women's football to communities that have never had it",
        country: "Japan",
        flag: "🇯🇵",
        worldVisionUrl: CHARITY_URL,
        imageUrl: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=400&fit=crop",
      },
    },
    kickoff: "2026-06-21T04:00:00Z",
    kickoffDisplay: "Jun 21 · 12:00 AM ET",
    group: "Group K",
    venue: "Estadio BBVA, Monterrey",
    status: "upcoming",
    totalSol: 5.17,
    backers: 19,
  },
  {
    id: "uru-cpv",
    teamA: {
      name: "Uruguay",
      flag: "🇺🇾",
      code: "URU",
      jerseyColor: "#75AADB",
      position: "striker",
      project: {
        name: "Youth Development Programme, Montevideo",
        description: "Uruguay punches far above its weight on the world stage. This project gives the next generation of Uruguayan kids the same chance their heroes had — a ball, a pitch, and a dream.",
        whoIsThisFor: "Children aged 5–14 in Montevideo's working-class barrios",
        whatFundsUsedFor: "Community pitches, professional coaching, nutrition programmes, and youth league organisation",
        whyUnique: "Uruguay is the smallest nation to ever win a World Cup — twice. This programme channels that giant-killer spirit into the next generation",
        country: "Uruguay",
        flag: "🇺🇾",
        worldVisionUrl: CHARITY_URL,
        imageUrl: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&h=400&fit=crop",
      },
    },
    teamB: {
      name: "Cape Verde",
      flag: "🇨🇻",
      code: "CPV",
      jerseyColor: "#003893",
      position: "goalkeeper",
      project: {
        name: "Island Youth Sport Programme, Praia",
        description: "Cape Verde — a nation of 600,000 people on a tiny Atlantic archipelago — is at the World Cup for the first time. This project funds the kids on those islands who watched and dared to dream.",
        whoIsThisFor: "Youth aged 8–18 across Cape Verde's ten islands",
        whatFundsUsedFor: "Inter-island travel for matches, coaching development, equipment, and the country's first youth football league",
        whyUnique: "Cape Verde is the smallest nation ever to qualify for the World Cup — this programme ensures the dream doesn't end when the tournament does",
        country: "Cape Verde",
        flag: "🇨🇻",
        worldVisionUrl: CHARITY_URL,
        imageUrl: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&h=400&fit=crop",
      },
    },
    kickoff: "2026-06-21T22:00:00Z",
    kickoffDisplay: "Jun 21 · 6:00 PM ET",
    group: "Group I",
    venue: "Hard Rock Stadium, Miami",
    status: "upcoming",
    totalSol: 3.60,
    backers: 14,
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
