import Link from 'next/link'
import { players, getTeamById } from "@/data/mockData";
import { ArrowLeft } from "lucide-react";

export default async function PlayerProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const player = players.find(p => p.id === id);
  const team = player ? getTeamById(player.teamId) : undefined;

  if (!player || !team) {
    return <div className="container py-20 text-center text-muted-foreground">Player not found.</div>;
  }

  return (
    <div className="container py-12 max-w-3xl">
      <Link href={`/teams/${team.id}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to {team.name}
      </Link>

      <div className="glass-card rounded-xl p-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          <div className="w-28 h-28 rounded-full bg-secondary flex items-center justify-center font-display font-bold text-4xl" style={{ borderColor: team.color, borderWidth: 4 }}>
            #{player.jerseyNumber}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-display font-bold">{player.name}</h1>
            <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
              <span className="px-2 py-0.5 text-xs font-semibold rounded bg-primary/15 text-primary">{player.position}</span>
              <span className="text-sm text-muted-foreground">{player.height}</span>
            </div>
            <Link href={`/teams/${team.id}`} className="flex items-center gap-2 mt-2 justify-center sm:justify-start text-sm text-muted-foreground hover:text-primary transition-colors">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: team.color }} />
              {team.name}
            </Link>
          </div>
        </div>

        <p className="text-muted-foreground mb-8">{player.bio}</p>

        <h2 className="font-display text-xl font-bold mb-4">Season Stats</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Points Per Game", value: player.ppg },
            { label: "Rebounds Per Game", value: player.rpg },
            { label: "Assists Per Game", value: player.apg },
          ].map(stat => (
            <div key={stat.label} className="text-center p-4 rounded-lg bg-secondary/50">
              <p className="font-display text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
