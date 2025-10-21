// 'use client';

// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';

// interface Team {
//   _id: string;
//   name: string;
//   logo: string;
//   managerName: string;
//   phone: string;
//   email: string;
//   city: string;
// }

// interface Player {
//   _id: string;
//   fullName: string;
//   position: string;
//   jerseyNumber: number;
//   teamId: string;
// }

// export default function AdminDashboard() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   const [teams, setTeams] = useState<Team[]>([]);
//   const [players, setPlayers] = useState<Player[]>([]);

//   useEffect(() => {
//     if (status === 'loading') return;

//     if (!session || session.user.role !== 'admin') {
//       router.push('/');
//       return;
//     }

//     fetch('/api/teams')
//       .then(res => res.json())
//       .then(data => setTeams(data));

//     fetch('/api/players')
//       .then(res => res.json())
//       .then(data => setPlayers(data));
//   }, [session, status, router]);

//   const getPlayersForTeam = (teamId: string) => {
//     return players.filter(player => player.teamId === teamId);
//   };

//   if (status === 'loading') {
//     return <div className="container mx-auto p-6">Loading...</div>;
//   }

// if (!session || session.user?.role !== 'admin') {
//   return <div className="container mx-auto p-6">Access Denied. You must be an admin to view this page.</div>;
// }


//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

//       <div className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Registered Teams</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {teams.map(team => (
//             <div key={team._id} className="border border-gray-300 rounded-lg p-4">
//               <Image src={team.logo} alt={team.name} className="w-16 h-16 mb-2" />
//               <h3 className="text-xl font-bold">{team.name}</h3>
//               <p>Manager: {team.managerName}</p>
//               <p>Phone: {team.phone}</p>
//               <p>Email: {team.email}</p>
//               <p>City: {team.city}</p>
//               <div className="mt-4">
//                 <h4 className="font-semibold">Players:</h4>
//                 <ul>
//                   {getPlayersForTeam(team._id).map(player => (
//                     <li key={player._id}>
//                       {player.fullName} - {player.position} - #{player.jerseyNumber}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div>
//         <h2 className="text-2xl font-semibold mb-4">All Players</h2>
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr>
//               <th className="border border-gray-300 p-2">Name</th>
//               <th className="border border-gray-300 p-2">Position</th>
//               <th className="border border-gray-300 p-2">Jersey #</th>
//               <th className="border border-gray-300 p-2">Team</th>
//             </tr>
//           </thead>
//           <tbody>
//             {players.map(player => {
//               const team = teams.find(t => t._id === player.teamId);
//               return (
//                 <tr key={player._id}>
//                   <td className="border border-gray-300 p-2">{player.fullName}</td>
//                   <td className="border border-gray-300 p-2">{player.position}</td>
//                   <td className="border border-gray-300 p-2">{player.jerseyNumber}</td>
//                   <td className="border border-gray-300 p-2">{team?.name || 'Unknown'}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Team {
  _id: string;
  name: string;
  logo: string;
  managerName: string;
  phone: string;
  email: string;
  city: string;
}

interface Player {
  _id: string;
  fullName: string;
  position: string;
  jerseyNumber: number;
  teamId: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  // Redirect non-admins early
  useEffect(() => {
    if (status === 'loading') return;

    if (!session?.user?.role || session.user.role !== 'admin') {
      router.push('/');
    }
  }, [session, status, router]);

  // Fetch teams and players after session is ready
  useEffect(() => {
    if (!session || session.user.role !== 'admin') return;

    const fetchData = async () => {
      try {
        const [teamsRes, playersRes] = await Promise.all([
          fetch('/api/teams'),
          fetch('/api/players'),
        ]);

        const [teamsData, playersData]: [Team[], Player[]] = await Promise.all([
          teamsRes.json(),
          playersRes.json(),
        ]);

        setTeams(teamsData);
        setPlayers(playersData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]);

  const getPlayersForTeam = (teamId: string) => players.filter(p => p.teamId === teamId);

  if (status === 'loading' || loading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  if (!session?.user?.role || session.user.role !== 'admin') {
    return <div className="container mx-auto p-6">Access Denied. You must be an admin to view this page.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Registered Teams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map(team => (
            <div key={team._id} className="border border-gray-300 rounded-lg p-4">
              <Image src={team.logo} alt={team.name} width={64} height={64} className="mb-2" />
              <h3 className="text-xl font-bold">{team.name}</h3>
              <p>Manager: {team.managerName}</p>
              <p>Phone: {team.phone}</p>
              <p>Email: {team.email}</p>
              <p>City: {team.city}</p>

              <div className="mt-4">
                <h4 className="font-semibold">Players:</h4>
                <ul>
                  {getPlayersForTeam(team._id).map(player => (
                    <li key={player._id}>
                      {player.fullName} - {player.position} - #{player.jerseyNumber}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">All Players</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Position</th>
              <th className="border border-gray-300 p-2">Jersey #</th>
              <th className="border border-gray-300 p-2">Team</th>
            </tr>
          </thead>
          <tbody>
            {players.map(player => {
              const team = teams.find(t => t._id === player.teamId);
              return (
                <tr key={player._id}>
                  <td className="border border-gray-300 p-2">{player.fullName}</td>
                  <td className="border border-gray-300 p-2">{player.position}</td>
                  <td className="border border-gray-300 p-2">{player.jerseyNumber}</td>
                  <td className="border border-gray-300 p-2">{team?.name || 'Unknown'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
