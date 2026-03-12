import Link from "next/link";
import { standings, getTeamById } from "@/data/mockData";
import Image from "next/image";

interface Props {
  compact?: boolean;
}

export default function StandingsTable({ compact }: Props) {
  const data = compact ? standings.slice(0, 4) : standings;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="text-left py-3 px-3 font-medium">#</th>
            <th className="text-left py-3 px-3 font-medium">Team</th>
            <th className="text-center py-3 px-3 font-medium">GP</th>
            <th className="text-center py-3 px-3 font-medium">W</th>
            <th className="text-center py-3 px-3 font-medium">L</th>
            {!compact && (
              <>
                <th className="text-center py-3 px-3 font-medium hidden md:table-cell">PF</th>
                <th className="text-center py-3 px-3 font-medium hidden md:table-cell">PA</th>
                <th className="text-center py-3 px-3 font-medium hidden md:table-cell">DIFF</th>
              </>
            )}
            <th className="text-center py-3 px-3 font-medium">PTS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((s, i) => {
            const team = getTeamById(s.teamId);
            if (!team) return null;
            return (
              <tr key={s.teamId} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                <td className="py-3 px-3 font-display font-bold text-muted-foreground">{i + 1}</td>
                <td className="py-3 px-3">



                  <Link
                    href={`/teams/${team.id}`}
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    {compact ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={team.logo}
                          alt={team.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <>
                        <div
                          className="w-6 h-6 rounded-full flex-shrink-0"
                          style={{ backgroundColor: team.color }}
                        />
                        <span className="font-medium">{team.name}</span>
                      </>
                    )}
                  </Link>




                </td>
                <td className="text-center py-3 px-3">{s.gamesPlayed}</td>
                <td className="text-center py-3 px-3 text-sport-green font-semibold">{s.wins}</td>
                <td className="text-center py-3 px-3 text-sport-red font-semibold">{s.losses}</td>
                {!compact && (
                  <>
                    <td className="text-center py-3 px-3 hidden md:table-cell">{s.pointsFor}</td>
                    <td className="text-center py-3 px-3 hidden md:table-cell">{s.pointsAgainst}</td>
                    <td className={`text-center py-3 px-3 hidden md:table-cell font-semibold ${s.pointDiff > 0 ? "text-sport-green" : "text-sport-red"}`}>
                      {s.pointDiff > 0 ? "+" : ""}{s.pointDiff}
                    </td>
                  </>
                )}
                <td className="text-center py-3 px-3 font-display font-bold text-primary">{s.leaguePoints}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
