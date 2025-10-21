

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
  const [headlineTitle, setHeadlineTitle] = useState('');
  const [headlineContent, setHeadlineContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

  const handleHeadlineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('/api/headlines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: headlineTitle,
          content: headlineContent,
        }),
      });

      if (response.ok) {
        alert('Headline added successfully!');
        setHeadlineTitle('');
        setHeadlineContent('');
      } else {
        alert('Failed to add headline.');
      }
    } catch (error) {
      console.error('Error adding headline:', error);
      alert('Error adding headline.');
    } finally {
      setSubmitting(false);
    }
  };

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
        <h2 className="text-2xl font-semibold mb-4">Add Headline</h2>
        <form onSubmit={handleHeadlineSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              value={headlineTitle}
              onChange={(e) => setHeadlineTitle(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              id="content"
              value={headlineContent}
              onChange={(e) => setHeadlineContent(e.target.value)}
              required
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {submitting ? 'Adding...' : 'Add Headline'}
          </button>
        </form>
      </section>

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
