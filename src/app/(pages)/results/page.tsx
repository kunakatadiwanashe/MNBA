// 'use client';


// import { useState, useEffect } from "react";

// interface Match {
//   _id: string;
//   homeTeam: { name: string };
//   awayTeam: { name: string };
//   homeScore: number;
//   awayScore: number;
//   date: string;
//   venue: string;
// }

// interface TeamStats {
//   team: string;
//   played: number;
//   won: number;
//   lost: number;
//   points: number;
// }

// export default function ResultsPage() {
//   const [results, setResults] = useState<Match[]>([]);
//   const [leagueTable, setLeagueTable] = useState<TeamStats[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');



// useEffect(() => {
//   const fetchMatches = async () => {
//     try {
//       const response = await fetch('/api/matches');
//       if (response.ok) {
//         const data = await response.json();
//         setResults(data);
//         calculateStandings(data);
//       } else {
//         setError('Failed to fetch matches');
//       }
//     } catch (err) {
//       setError('Error fetching matches');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchMatches();
// }, []);


//   const calculateStandings = (matches: Match[]) => {
//     const stats: { [key: string]: TeamStats } = {};

//     matches.forEach((match) => {
//       const homeTeam = match.homeTeam.name;
//       const awayTeam = match.awayTeam.name;
//       const homeScore = match.homeScore;
//       const awayScore = match.awayScore;

//       // Initialize stats if not exists
//       if (!stats[homeTeam]) {
//         stats[homeTeam] = { team: homeTeam, played: 0, won: 0, lost: 0, points: 0 };
//       }
//       if (!stats[awayTeam]) {
//         stats[awayTeam] = { team: awayTeam, played: 0, won: 0, lost: 0, points: 0 };
//       }

//       // Update played
//       stats[homeTeam].played += 1;
//       stats[awayTeam].played += 1;

//       // Update wins, losses, points
//       if (homeScore > awayScore) {
//         stats[homeTeam].won += 1;
//         stats[awayTeam].lost += 1;
//         stats[homeTeam].points += 2;
//       } else if (awayScore > homeScore) {
//         stats[awayTeam].won += 1;
//         stats[homeTeam].lost += 1;
//         stats[awayTeam].points += 2;
//       } else {
//         // Draw - assuming no points for draw, but can adjust if needed
//         // For now, no points awarded for draw
//       }
//     });

//     // Convert to array and sort by points descending
//     const standings = Object.values(stats).sort((a, b) => b.points - a.points);
//     setLeagueTable(standings);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-4 sm:p-6 flex items-center justify-center">
//         <p className="text-gray-600">Loading results...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-4 sm:p-6 flex items-center justify-center">
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   return (

//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
//       {/* Header */}
//       <header className="text-center mb-6 sm:mb-8">
//         <p className="text-gray-600 text-base sm:text-lg mt-1">Match Results & League Table</p>
//       </header>

//       {/* Match Results */}
//       <section className="mb-8 sm:mb-10">
//         <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700">Recent Results</h2>
//         <div className="space-y-3 sm:space-y-4">
//           {results.map((match) => (
//             <div
//               key={match._id}
//               className="bg-white shadow-sm rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-center border border-gray-200"
//             >
//               <div className="text-center sm:text-left mb-2 sm:mb-0">
//                 <p className="text-gray-500 text-xs sm:text-sm">{new Date(match.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
//                 <p className="font-semibold text-gray-800 text-sm sm:text-base">{match.venue}</p>
//               </div>

//               <div className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-bold">
//                 <span className="text-gray-700 text-sm sm:text-base">{match.homeTeam.name}</span>
//                 <span className="text-blue-600">{match.homeScore} - {match.awayScore}</span>
//                 <span className="text-gray-700 text-sm sm:text-base">{match.awayTeam.name}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* League Table */}
//       <section>
//         <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700">League Table</h2>
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse bg-white shadow-sm rounded-2xl overflow-hidden border border-gray-200 min-w-[500px] sm:min-w-full">
//             <thead className="bg-blue-600 text-white">
//               <tr>
//                 <th className="p-2 sm:p-3 text-left text-sm sm:text-base">Team</th>
//                 <th className="p-2 sm:p-3 text-center text-sm sm:text-base">Played</th>
//                 <th className="p-2 sm:p-3 text-center text-sm sm:text-base">Won</th>
//                 <th className="p-2 sm:p-3 text-center text-sm sm:text-base">Lost</th>
//                 <th className="p-2 sm:p-3 text-center text-sm sm:text-base">Points</th>
//               </tr>
//             </thead>
//             <tbody>
//               {leagueTable.map((team, i) => (
//                 <tr key={i} className="border-t border-gray-200 hover:bg-gray-50 transition">
//                   <td className="p-2 sm:p-3 font-medium text-gray-800 text-sm sm:text-base">{team.team}</td>
//                   <td className="p-2 sm:p-3 text-center text-sm sm:text-base">{team.played}</td>
//                   <td className="p-2 sm:p-3 text-center text-green-600 font-semibold text-sm sm:text-base">{team.won}</td>
//                   <td className="p-2 sm:p-3 text-center text-red-600 font-semibold text-sm sm:text-base">{team.lost}</td>
//                   <td className="p-2 sm:p-3 text-center font-bold text-blue-600 text-sm sm:text-base">{team.points}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </section>


//     </div>

//   );
// }






'use client';

import { useState, useEffect } from "react";

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
  scored: number;   // Points scored (for)
  conceded: number; // Points conceded (against)
  diff: number;     // Points difference
}

export default function ResultsPage() {
  const [results, setResults] = useState<Match[]>([]);
  const [leagueTable, setLeagueTable] = useState<TeamStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMatches = async () => {
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
    };

    fetchMatches();
  }, []);

  const calculateStandings = (matches: Match[]) => {
    const stats: { [key: string]: TeamStats } = {};

    matches.forEach((match) => {
      const homeTeam = match.homeTeam.name;
      const awayTeam = match.awayTeam.name;
      const homeScore = match.homeScore;
      const awayScore = match.awayScore;

      // Initialize stats if not exists
      if (!stats[homeTeam]) {
        stats[homeTeam] = {
          team: homeTeam,
          played: 0,
          won: 0,
          lost: 0,
          points: 0,
          scored: 0,
          conceded: 0,
          diff: 0,
        };
      }
      if (!stats[awayTeam]) {
        stats[awayTeam] = {
          team: awayTeam,
          played: 0,
          won: 0,
          lost: 0,
          points: 0,
          scored: 0,
          conceded: 0,
          diff: 0,
        };
      }

      // Update games played
      stats[homeTeam].played += 1;
      stats[awayTeam].played += 1;

      // Update scores and conceded
      stats[homeTeam].scored += homeScore;
      stats[homeTeam].conceded += awayScore;
      stats[awayTeam].scored += awayScore;
      stats[awayTeam].conceded += homeScore;

      // Update wins, losses, and points
      if (homeScore > awayScore) {
        stats[homeTeam].won += 1;
        stats[awayTeam].lost += 1;
        stats[homeTeam].points += 2; // 2 points for win
      } else if (awayScore > homeScore) {
        stats[awayTeam].won += 1;
        stats[homeTeam].lost += 1;
        stats[awayTeam].points += 2; // 2 points for win
      }

      // Calculate current difference
      stats[homeTeam].diff = stats[homeTeam].scored - stats[homeTeam].conceded;
      stats[awayTeam].diff = stats[awayTeam].scored - stats[awayTeam].conceded;
    });

    // Sort standings: by points, then difference, then scored
    const standings = Object.values(stats).sort(
      (a, b) =>
        b.points - a.points ||
        b.diff - a.diff ||
        b.scored - a.scored
    );

    setLeagueTable(standings);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <p className="text-gray-600">Loading results...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
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
                <p className="text-gray-500 text-xs sm:text-sm">
                  {new Date(match.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="font-semibold text-gray-800 text-sm sm:text-base">{match.venue}</p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-bold">
                <span className="text-gray-700 text-sm sm:text-base">{match.homeTeam.name}</span>
                <span className="text-blue-600">
                  {match.homeScore} - {match.awayScore}
                </span>
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
          <table className="w-full border-collapse bg-white shadow-sm rounded-2xl overflow-hidden border border-gray-200 min-w-[700px] sm:min-w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-2 sm:p-3 text-left text-sm sm:text-base">Team</th>
                <th className="p-2 sm:p-3 text-center text-sm sm:text-base">P</th>
                <th className="p-2 sm:p-3 text-center text-sm sm:text-base">W</th>
                <th className="p-2 sm:p-3 text-center text-sm sm:text-base">L</th>
                <th className="p-2 sm:p-3 text-center text-sm sm:text-base">For</th>
                <th className="p-2 sm:p-3 text-center text-sm sm:text-base">Against</th>
                <th className="p-2 sm:p-3 text-center text-sm sm:text-base">Diff</th>
                <th className="p-2 sm:p-3 text-center text-sm sm:text-base">Pts</th>
              </tr>
            </thead>
            <tbody>
              {leagueTable.map((team, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="p-2 sm:p-3 font-medium text-gray-800 text-sm sm:text-base">
                    {team.team}
                  </td>
                  <td className="p-2 sm:p-3 text-center text-sm sm:text-base">{team.played}</td>
                  <td className="p-2 sm:p-3 text-center text-green-600 font-semibold text-sm sm:text-base">{team.won}</td>
                  <td className="p-2 sm:p-3 text-center text-red-600 font-semibold text-sm sm:text-base">{team.lost}</td>
                  <td className="p-2 sm:p-3 text-center text-sm sm:text-base">{team.scored}</td>
                  <td className="p-2 sm:p-3 text-center text-sm sm:text-base">{team.conceded}</td>
                  <td
                    className={`p-2 sm:p-3 text-center font-semibold text-sm sm:text-base ${
                      team.diff >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {team.diff}
                  </td>
                  <td className="p-2 sm:p-3 text-center font-bold text-blue-600 text-sm sm:text-base">
                    {team.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
