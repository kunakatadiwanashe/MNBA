'use client';

import { useState, useEffect, ReactNode } from 'react';
import Image from 'next/image';

interface Player {
  position: ReactNode;
  _id: string;
  fullName: string;
  jerseyNumber: number;
  profilePicture?: string;
  teamId: string;
}

interface Team {
  _id: string;
  name: string;
}

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [playersRes, teamsRes] = await Promise.all([
          fetch('/api/players'),
          fetch('/api/teams'),
        ]);

        const playersData: Player[] = await playersRes.json();
        const teamsData: Team[] = await teamsRes.json();

        setPlayers(playersData);
        setTeams(teamsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Players</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {players.map(player => {
          const team = teams.find(t => t._id === player.teamId);
          return (
            <div key={player._id} className="border border-gray-300 rounded-lg p-4 flex flex-col items-center">
              {player.profilePicture ? (
                <Image
                  src={player.profilePicture}
                  alt={player.fullName}
                  width={100}
                  height={100}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <h3 className="text-xl font-bold capitalize">{player.fullName}</h3>
              <p className="text-gray-600 capitalize">Team: {team?.name || 'Unknown'}</p>
              <p className="text-gray-600 ">Position: {player.position}</p>
              <p className="text-gray-600 ">Jersey Number: #<span className="font-bold text-lg" >{player.jerseyNumber}</span></p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
