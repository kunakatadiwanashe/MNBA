import Link from 'next/link'
import { teams } from "@/data/mockData";
import { MapPin, User } from "lucide-react";
import Image from 'next/image';

export default function Teams() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-display font-bold mb-2">Teams</h1>
      <p className="text-muted-foreground mb-8">Meet the teams competing in the 2026 MBA season.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map(team => (
          <Link key={team.id} href={`/teams/${team.id}`} className="glass-card rounded-lg p-6 hover:border-primary/30 transition-all group">
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-18 h-18 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
                style={{ backgroundColor: team.color }}
              >
                <Image
                  src={team.logo}
                  alt={team.name}
                  width={60}
                  height={50}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold group-hover:text-primary transition-colors">{team.name}</h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <User className="h-3 w-3" /> {team.coach}
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{team.description}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> {team.homeCourt}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
