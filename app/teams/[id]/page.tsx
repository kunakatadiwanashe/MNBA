import Link from 'next/link'
import Image from 'next/image'
import FixtureCard from "@/components/FixtureCard";
import { getTeamById, getPlayersByTeam, getFixturesByTeam, standings } from "@/data/mockData";
import { MapPin, User, ArrowLeft } from "lucide-react";

export default async function TeamDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const team = getTeamById(id);
  const players = getPlayersByTeam(id);
  const teamFixtures = getFixturesByTeam(id);
  const teamStanding = standings.find(s => s.teamId === id);

  if (!team) {
    return <div className="container py-20 text-center text-muted-foreground">Team not found.</div>;
  }

  return (
    <div className="container py-12">
      <Link href="/teams" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Teams
      </Link>

      {/* Header */}
      <div className="flex items-center gap-6 mb-10">
        <div className="w-48 h-48 rounded-full flex items-center justify-center font-display font-bold text-3xl flex-shrink-0" style={{ backgroundColor: team.color, color: "#fff" }}>
          <Image
            src={team.logo}
            alt={team.name}
            width={170}
            height={170}
            className="object-contain"
          />
        </div>
        <div>
          <h1 className="text-4xl font-display font-bold">{team.name}</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> Coach: {team.coach}</span>
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {team.homeCourt}</span>
          </div>
          <p className="text-muted-foreground mt-2 max-w-xl">{team.description}</p>
        </div>
      </div>

      {/* Stats */}
      {teamStanding && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-10">
          {[
            { label: "GP", value: teamStanding.gamesPlayed },
            { label: "Wins", value: teamStanding.wins },
            { label: "Losses", value: teamStanding.losses },
            { label: "PF", value: teamStanding.pointsFor },
            { label: "PA", value: teamStanding.pointsAgainst },
            { label: "DIFF", value: (teamStanding.pointDiff > 0 ? "+" : "") + teamStanding.pointDiff },
            { label: "PTS", value: teamStanding.leaguePoints },
          ].map(stat => (
            <div key={stat.label} className="glass-card rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground font-medium mb-1">{stat.label}</p>
              <p className="font-display text-2xl font-bold text-primary">{stat.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Roster */}
      <h2 className="text-2xl font-display font-bold mb-4">Roster</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {players.map(player => (
          <Link key={player.id} href={`/players/${player.id}`} className="glass-card rounded-lg p-4 hover:border-primary/30 transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-display font-bold text-lg">
                #{player.jerseyNumber}
              </div>
              <div>
                <p className="font-display font-semibold group-hover:text-primary transition-colors">{player.name}</p>
                <p className="text-xs text-muted-foreground">{player.position} · {player.height}</p>
              </div>
            </div>
            <div className="flex gap-4 mt-3 text-xs">
              <span><strong className="text-foreground">{player.ppg}</strong> <span className="text-muted-foreground">PPG</span></span>
              <span><strong className="text-foreground">{player.rpg}</strong> <span className="text-muted-foreground">RPG</span></span>
              <span><strong className="text-foreground">{player.apg}</strong> <span className="text-muted-foreground">APG</span></span>
            </div>
          </Link>
        ))}
      </div>

      {/* Fixtures */}
      <h2 className="text-2xl font-display font-bold mb-4">Schedule</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teamFixtures.map(f => <FixtureCard key={f.id} fixture={f} />)}
      </div>
    </div>
  );
}
