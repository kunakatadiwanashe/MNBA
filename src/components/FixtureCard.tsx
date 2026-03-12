import Link from 'next/link';
import Image from 'next/image';
import { Fixture, getTeamById } from "@/data/mockData";
import { MapPin, Calendar } from "lucide-react";

export default function FixtureCard({ fixture }: { fixture: Fixture }) {
  const home = getTeamById(fixture.homeTeamId);
  const away = getTeamById(fixture.awayTeamId);
  if (!home || !away) return null;

  const isCompleted = fixture.status === "completed";
  const date = new Date(fixture.matchDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  return (
    <div className="glass-card rounded-lg p-5 hover:border-primary/30 transition-all">
      {/* Date and Status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{date} · {fixture.matchTime}</span>
        </div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
          isCompleted ? "bg-muted text-muted-foreground" : "bg-primary/15 text-primary animate-pulse-glow"
        }`}>
          {isCompleted ? "Final" : "Upcoming"}
        </span>
      </div>

      {/* Teams & Score */}
      <div className="flex items-center justify-between gap-3">
        {/* Home Team */}
        <Link href={`/teams/${home.id}`} className="flex-1 text-center group">
          <div className="relative w-10 h-10 rounded-full mx-auto mb-2 overflow-hidden" style={{ backgroundColor: home.color }}>
            <Image
              src={home.logo}
              alt={home.name}
              fill
              className="object-contain"
            />
          </div>
        </Link>

        {/* Score / VS */}
        {isCompleted ? (
          <div className="flex items-center gap-3">
            <span className={`score-display text-3xl md:text-4xl ${fixture.homeScore! > fixture.awayScore! ? "text-foreground" : "text-muted-foreground"}`}>{fixture.homeScore}</span>
            <span className="text-muted-foreground font-display text-lg">-</span>
            <span className={`score-display text-3xl md:text-4xl ${fixture.awayScore! > fixture.homeScore! ? "text-foreground" : "text-muted-foreground"}`}>{fixture.awayScore}</span>
          </div>
        ) : (
          <span className="font-display text-2xl text-muted-foreground">VS</span>
        )}

        {/* Away Team */}
        <Link href={`/teams/${away.id}`} className="flex-1 text-center group">
          <div className="relative w-10 h-10 rounded-full mx-auto mb-2 overflow-hidden" style={{ backgroundColor: away.color }}>
            <Image
              src={away.logo}
              alt={away.name}
              fill
              className="object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Venue */}
      <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-muted-foreground">
        <MapPin className="h-3 w-3" />
        <span>{fixture.venue}</span>
      </div>
    </div>
  );
}