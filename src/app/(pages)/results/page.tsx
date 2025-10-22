'use client';


import { useState, useEffect, useCallback } from "react";

interface Match {
  _id: string;
  homeTeam: { name: string };
  awayTeam: { name: string };
  homeScore: number;
  awayScore: number;
  date: string;
  venue: string;
}

interface TeamStats {
  team: string;
  played: number;
  won: number;
  lost: number;
  points: number;
}

export default function ResultsPage() {
  const [results, setResults] = useState<Match[]>([]);
  const [leagueTable, setLeagueTable] = useState<TeamStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // useEffect(() => {
  //   fetchMatches();
  // }, []);

  // const fetchMatches = async () => {
  //   try {
  //     const response = await fetch('/api/matches');
  //     if (response.ok) {
  //       const data = await response.json();
  //       setResults(data);
  //       calculateStandings(data);
  //     } else {
  //       setError('Failed to fetch matches');
  //     }
  //   } catch (err) {
  //     setError('Error fetching matches');
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchMatches = useCallback(async () => {
  try {
    const response = await fetch('/api/matches');
    if (response.ok) {
      const data = await response.json();
      setResults(data);
      calculateStandings(data);
    } else {
      setError('Failed to fetch matches');
    }
  } catch (err) {
    setError('Error fetching matches');
    console.error(err);
  } finally {
    setLoading(false);
  }
}, []); // 👈 stable reference

useEffect(() => {
  fetchMatches();
}, [fetchMatches]);

  const calculateStandings = (matches: Match[]) => {
    const stats: { [key: string]: TeamStats } = {};

    matches.forEach((match) => {
      const homeTeam = match.homeTeam.name;
      const awayTeam = match.awayTeam.name;
      const homeScore = match.homeScore;
      const awayScore = match.awayScore;

      // Initialize stats if not exists
      if (!stats[homeTeam]) {
        stats[homeTeam] = { team: homeTeam, played: 0, won: 0, lost: 0, points: 0 };
      }
      if (!stats[awayTeam]) {
        stats[awayTeam] = { team: awayTeam, played: 0, won: 0, lost: 0, points: 0 };
      }

      // Update played
      stats[homeTeam].played += 1;
      stats[awayTeam].played += 1;

      // Update wins, losses, points
      if (homeScore > awayScore) {
        stats[homeTeam].won += 1;
        stats[awayTeam].lost += 1;
        stats[homeTeam].points += 2;
      } else if (awayScore > homeScore) {
        stats[awayTeam].won += 1;
        stats[homeTeam].lost += 1;
        stats[awayTeam].points += 2;
      } else {
        // Draw - assuming no points for draw, but can adjust if needed
        // For now, no points awarded for draw
      }
    });

    // Convert to array and sort by points descending
    const standings = Object.values(stats).sort((a, b) => b.points - a.points);
    setLeagueTable(standings);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 flex items-center justify-center">
        <p className="text-gray-600">Loading results...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Header */}
      <header className="text-center mb-6 sm:mb-8">
        <p className="text-gray-600 text-base sm:text-lg mt-1">Match Results & League Table</p>
      </header>

      {/* Match Results */}
      <section className="mb-8 sm:mb-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700">Recent Results</h2>
        <div className="space-y-3 sm:space-y-4">
          {results.map((match) => (
            <div
              key={match._id}
              className="bg-white shadow-sm rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-center border border-gray-200"
            >
              <div className="text-center sm:text-left mb-2 sm:mb-0">
                <p className="text-gray-500 text-xs sm:text-sm">{new Date(match.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="font-semibold text-gray-800 text-sm sm:text-base">{match.venue}</p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-bold">
                <span className="text-gray-700 text-sm sm:text-base">{match.homeTeam.name}</span>
                <span className="text-blue-600">{match.homeScore} - {match.awayScore}</span>
                <span className="text-gray-700 text-sm sm:text-base">{match.awayTeam.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* League Table */}
      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700">League Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-sm rounded-2xl overflow-hidden border border-gray-200 min-w-[500px] sm:min-w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-2 sm:p-3 text-left text-sm sm:text-base">Team</th>
                <th className="p-2 sm:p-3 text-center text-sm sm:text-base">Played</th>
                <th className="p-2 sm:p-3 text-center text-sm sm:text-base">Won</th>
                <th className="p-2 sm:p-3 text-center text-sm sm:text-base">Lost</th>
                <th className="p-2 sm:p-3 text-center text-sm sm:text-base">Points</th>
              </tr>
            </thead>
            <tbody>
              {leagueTable.map((team, i) => (
                <tr key={i} className="border-t border-gray-200 hover:bg-gray-50 transition">
                  <td className="p-2 sm:p-3 font-medium text-gray-800 text-sm sm:text-base">{team.team}</td>
                  <td className="p-2 sm:p-3 text-center text-sm sm:text-base">{team.played}</td>
                  <td className="p-2 sm:p-3 text-center text-green-600 font-semibold text-sm sm:text-base">{team.won}</td>
                  <td className="p-2 sm:p-3 text-center text-red-600 font-semibold text-sm sm:text-base">{team.lost}</td>
                  <td className="p-2 sm:p-3 text-center font-bold text-blue-600 text-sm sm:text-base">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>


    </div>

  );
}
