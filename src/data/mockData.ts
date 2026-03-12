import Image from "next/image";

export interface Team {
  id: string;
  name: string;
  logo: string;
  coach: string;
  homeCourt: string;
  color: string;
  description: string;
}

export interface Player {
  id: string;
  name: string;
  teamId: string;
  jerseyNumber: number;
  position: string;
  height: string;
  bio: string;
  ppg: number;
  rpg: number;
  apg: number;
}

export interface Fixture {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  venue: string;
  matchDate: string;
  matchTime: string;
  status: "upcoming" | "live" | "completed";
  homeScore?: number;
  awayScore?: number;
}

export interface Standing {
  teamId: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  pointDiff: number;
  leaguePoints: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
}

export const teams: Team[] = [
  { id: "1", name: "Victoria Falls Panthers",logo: "/logos/panthers.png", coach: "Tadiwanashe Kunaka", homeCourt: "Chamabondo Primary Arena", color: "#e74c3c", description: "The Vipers are known for their aggressive defense and fast-paced offensive style." },
  { id: "2", name: "Victoria Falls Suns", logo: "/logos/suns.jpg", coach: "Tapiwa", homeCourt: "Vic Falls Sports Club", color: "#3498db", description: "A disciplined team with exceptional ball movement and three-point shooting." },
  { id: "3", name: "Hwange Basketbal Club",logo: "/logos/hbc.jpeg", coach: "David Williams", homeCourt: "Hwange Main Training Center", color: "#f39c12", description: "Known for their dominant paint presence and rebounding prowess." },
  { id: "4", name: "Zol", logo: "/logos/zou.png", coach: "Lisa Park", homeCourt: "Hwange Main Training Center", color: "#2ecc71", description: "A young and athletic team that thrives in transition offense." },
  { id: "5", name: "Central Lions", logo: "/logos/panthers.png", coach: "James Brown", homeCourt: "Lions Court", color: "#9b59b6", description: "Veteran-led team with championship experience and clutch performers." },
 
];

export const players: Player[] = [
  { id: "1", name: "Jamal Thompson", teamId: "1", jerseyNumber: 23, position: "SG", height: "6'4\"", bio: "A prolific scorer with elite shooting range.", ppg: 24.5, rpg: 5.2, apg: 4.1 },
  { id: "2", name: "Chris Williams", teamId: "1", jerseyNumber: 11, position: "PG", height: "6'1\"", bio: "Floor general with exceptional court vision.", ppg: 12.3, rpg: 3.1, apg: 8.7 },
  { id: "3", name: "Derek Malone", teamId: "1", jerseyNumber: 34, position: "PF", height: "6'8\"", bio: "Physical two-way player.", ppg: 16.1, rpg: 9.4, apg: 2.3 },
  { id: "4", name: "Ryan Foster", teamId: "2", jerseyNumber: 7, position: "SF", height: "6'6\"", bio: "Versatile wing with a complete offensive game.", ppg: 21.8, rpg: 6.3, apg: 3.5 },
  { id: "5", name: "Mike Torres", teamId: "2", jerseyNumber: 15, position: "C", height: "6'10\"", bio: "Dominant rim protector.", ppg: 14.2, rpg: 11.1, apg: 1.8 },
  { id: "6", name: "Andre Davis", teamId: "3", jerseyNumber: 1, position: "PG", height: "6'2\"", bio: "Explosive point guard with elite speed.", ppg: 19.7, rpg: 3.8, apg: 7.2 },
  { id: "7", name: "Kevin Grant", teamId: "3", jerseyNumber: 44, position: "C", height: "6'11\"", bio: "A powerful center with a soft touch.", ppg: 17.4, rpg: 10.5, apg: 2.1 },
  { id: "8", name: "Tyler Brooks", teamId: "4", jerseyNumber: 3, position: "SG", height: "6'5\"", bio: "Sharpshooter from beyond the arc.", ppg: 20.1, rpg: 4.2, apg: 3.0 },
  { id: "9", name: "Marcus Lee", teamId: "4", jerseyNumber: 21, position: "PF", height: "6'9\"", bio: "Athletic forward who excels in transition.", ppg: 15.6, rpg: 8.3, apg: 2.8 },
  { id: "10", name: "Jason Park", teamId: "5", jerseyNumber: 10, position: "PG", height: "6'0\"", bio: "Veteran leader with championship pedigree.", ppg: 16.9, rpg: 3.5, apg: 9.1 },
  { id: "11", name: "Carlos Rivera", teamId: "5", jerseyNumber: 25, position: "SF", height: "6'7\"", bio: "Two-way wing with lockdown defense.", ppg: 18.3, rpg: 7.1, apg: 3.4 },
  { id: "12", name: "Damon Wright", teamId: "6", jerseyNumber: 5, position: "SG", height: "6'3\"", bio: "Scoring machine with unlimited range.", ppg: 26.2, rpg: 4.8, apg: 5.0 },
  { id: "13", name: "Isaiah Coleman", teamId: "6", jerseyNumber: 32, position: "C", height: "7'0\"", bio: "Towering presence in the paint.", ppg: 13.5, rpg: 12.2, apg: 1.5 },
  { id: "14", name: "Nathan Reed", teamId: "2", jerseyNumber: 22, position: "PG", height: "6'1\"", bio: "Quick hands and elite passing.", ppg: 11.8, rpg: 2.9, apg: 8.3 },
  { id: "15", name: "Omar Hassan", teamId: "3", jerseyNumber: 9, position: "SF", height: "6'6\"", bio: "Tough defender with a growing offensive game.", ppg: 13.2, rpg: 5.7, apg: 2.6 },
];



export const fixtures: Fixture[] = [
  { id: "1", homeTeamId: "1", awayTeamId: "2", venue: "Chamabondo Arena", matchDate: "2026-03-15", matchTime: "19:00", status: "upcoming" },
  { id: "2", homeTeamId: "3", awayTeamId: "4", venue: "Hwange Sports Center", matchDate: "2026-03-15", matchTime: "21:00", status: "upcoming" },
  { id: "3", homeTeamId: "5", awayTeamId: "1", venue: "Lions Court", matchDate: "2026-03-16", matchTime: "18:00", status: "upcoming" },
  { id: "4", homeTeamId: "2", awayTeamId: "3", venue: "Vic Falls Sports Club", matchDate: "2026-03-18", matchTime: "19:30", status: "upcoming" },
  { id: "5", homeTeamId: "4", awayTeamId: "5", venue: "Hwange Arena", matchDate: "2026-03-20", matchTime: "20:00", status: "upcoming" },

  { id: "6", homeTeamId: "1", awayTeamId: "3", venue: "Chamabondo Arena", matchDate: "2026-03-08", matchTime: "19:00", status: "completed", homeScore: 98, awayScore: 87 },
  { id: "7", homeTeamId: "4", awayTeamId: "2", venue: "Hwange Arena", matchDate: "2026-03-08", matchTime: "21:00", status: "completed", homeScore: 105, awayScore: 110 },
  { id: "8", homeTeamId: "5", awayTeamId: "3", venue: "Lions Court", matchDate: "2026-03-09", matchTime: "18:00", status: "completed", homeScore: 101, awayScore: 96 },
  { id: "9", homeTeamId: "2", awayTeamId: "1", venue: "Vic Falls Sports Club", matchDate: "2026-03-05", matchTime: "19:00", status: "completed", homeScore: 95, awayScore: 92 },
  { id: "10", homeTeamId: "3", awayTeamId: "4", venue: "Hwange Sports Center", matchDate: "2026-03-05", matchTime: "20:30", status: "completed", homeScore: 88, awayScore: 94 },
];

export const standings: Standing[] = [
  { teamId: "1", gamesPlayed: 8, wins: 6, losses: 2, pointsFor: 780, pointsAgainst: 720, pointDiff: 60, leaguePoints: 14 },
  { teamId: "2", gamesPlayed: 8, wins: 5, losses: 3, pointsFor: 760, pointsAgainst: 735, pointDiff: 25, leaguePoints: 13 },
  { teamId: "3", gamesPlayed: 8, wins: 4, losses: 4, pointsFor: 740, pointsAgainst: 750, pointDiff: -10, leaguePoints: 12 },
  { teamId: "5", gamesPlayed: 8, wins: 3, losses: 5, pointsFor: 710, pointsAgainst: 760, pointDiff: -50, leaguePoints: 11 },
  { teamId: "4", gamesPlayed: 8, wins: 2, losses: 6, pointsFor: 690, pointsAgainst: 760, pointDiff: -70, leaguePoints: 10 },
];

export const news: NewsArticle[] = [
  { id: "1", title: "Blazers Continue Hot Streak with Fifth Straight Win", excerpt: "The Metro Blazers extended their winning streak with a dominant 112-101 victory over the Central Lions.", content: "", date: "2026-03-10", author: "MBA Staff" },
  { id: "2", title: "Thompson Drops 38 Points in Vipers Victory", excerpt: "Jamal Thompson put on a scoring clinic, leading the Northside Vipers past the Southside Thunder.", content: "", date: "2026-03-09", author: "MBA Staff" },
  { id: "3", title: "Hawks' Foster Named Player of the Week", excerpt: "Ryan Foster earned Player of the Week honors after averaging 28.5 PPG in two Hawks victories.", content: "", date: "2026-03-08", author: "MBA Staff" },
  { id: "4", title: "MBA All-Star Weekend Dates Announced", excerpt: "The league has announced the dates for this season's All-Star Weekend festivities.", content: "", date: "2026-03-07", author: "MBA Staff" },
];

export function getTeamById(id: string): Team | undefined {
  return teams.find(t => t.id === id);
}

export function getPlayersByTeam(teamId: string): Player[] {
  return players.filter(p => p.teamId === teamId);
}

export function getFixturesByTeam(teamId: string): Fixture[] {
  return fixtures.filter(f => f.homeTeamId === teamId || f.awayTeamId === teamId);
}
