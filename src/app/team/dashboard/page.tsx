'use client';

import { useState, useEffect, Key } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface Team {
  headCoach: ReactNode;
  _id: string;
  name: string;
  logo: string;
  managerName: string;
  phone: string;
  email: string;
  city: string;
}

interface Player {
  id: Key | null | undefined;
  _id: string;
  fullName: string;
  position: string;
  jerseyNumber: number;
  dob: string;
  contact: {
    phone?: string;
    email?: string;
  };
  profilePicture?: string;
  teamId: string;
}

export default function TeamDashboard() {
  const { data: session } = useSession();
  const [team, setTeam] = useState<Team | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Team>>({});
  const [addingPlayer, setAddingPlayer] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<string | null>(null);
  const [playerFormData, setPlayerFormData] = useState<Partial<Player>>({});

  useEffect(() => {
    if (session?.user?.teamId) {
      fetch(`/api/teams/${session.user.teamId}`, { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          setTeam(data);
          setFormData(data);
        });

      fetch('/api/players', { credentials: 'include' })
        .then(res => res.json())
        .then(data => setPlayers(data.filter((p: Player) => p.teamId === session.user.teamId)));
    }
  }, [session]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    if (!team) return;
    try {
      const response = await fetch(`/api/teams/${team._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const updatedTeam = await response.json();
        setTeam(updatedTeam);
        setEditing(false);
      }
    } catch (error) {
      console.error('Error updating team:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlayerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerFormData({ ...playerFormData, [e.target.name]: e.target.value });
  };

  const handleAddPlayer = async () => {
    if (!session?.user?.teamId) return;
    const data = { ...playerFormData, teamId: session.user.teamId };
    try {
      const response = await fetch('/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const newPlayer = await response.json();
        setPlayers([...players, newPlayer]);
        setAddingPlayer(false);
        setPlayerFormData({});
      }
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  const handleEditPlayer = (player: Player) => {
    setEditingPlayer(player._id);
    setPlayerFormData(player);
  };

  const handleSavePlayer = async () => {
    if (!editingPlayer) return;
    try {
      const response = await fetch(`/api/players/${editingPlayer}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerFormData),
      });
      if (response.ok) {
        const updatedPlayer = await response.json();
        setPlayers(players.map(p => p._id === editingPlayer ? updatedPlayer : p));
        setEditingPlayer(null);
        setPlayerFormData({});
      }
    } catch (error) {
      console.error('Error updating player:', error);
    }
  };

  const handleDeletePlayer = async (id: string) => {
    if (confirm('Are you sure you want to delete this player?')) {
      try {
        const response = await fetch(`/api/players/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setPlayers(players.filter(p => p._id !== id));
        }
      } catch (error) {
        console.error('Error deleting player:', error);
      }
    }
  };

  if (!session) {
    return <div>Please log in</div>;
  }

  if (session.user.role !== 'team-manager') {
    return <div>Access denied. Only team managers can access this page.</div>;
  }

  if (!team) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Team Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Team Information</h2>
        {editing ? (
          <div className="space-y-4">
            <input
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md p-2"
              placeholder="Team Name"
            />
            <input
              name="managerName"
              value={formData.managerName || ''}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md p-2"
              placeholder="Manager Name"
            />
            <input
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md p-2"
              placeholder="Phone"
            />
            <input
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md p-2"
              placeholder="Email"
            />
            <input
              name="city"
              value={formData.city || ''}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md p-2"
              placeholder="City"
            />
            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
            <button onClick={() => setEditing(false)} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        ) : (
          <div className="border border-gray-300 rounded-lg p-4">

            

            <Image src={team.logo || "/placeholder.png"} alt={team.name || "Team logo"} width={64} height={64} className="w-16 h-16 mb-2" />
            <p><strong>Name:</strong> {team.name}</p>
            <p><strong>Head Coach:</strong> {team.headCoach}</p>
            <p><strong>Manager:</strong> {team.managerName}</p>
            <p><strong>Phone:</strong> {team.phone}</p>
            <p><strong>Email:</strong> {team.email}</p>
            <p><strong>City:</strong> {team.city}</p>
            <button onClick={handleEdit} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Edit Team Info</button>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Players</h2>
        <button onClick={() => setAddingPlayer(true)} className="mb-4 bg-green-500 text-white px-4 py-2 rounded">Add New Player</button>
        {addingPlayer && (
          <div className="mb-4 border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">Add Player</h3>
            <input name="fullName" value={playerFormData.fullName || ''} onChange={handlePlayerChange} className="block w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Full Name" />
            <input name="position" value={playerFormData.position || ''} onChange={handlePlayerChange} className="block w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Position" />
            <input name="jerseyNumber" type="number" value={playerFormData.jerseyNumber || ''} onChange={handlePlayerChange} className="block w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Jersey Number" />
            <input name="dob" type="date" value={playerFormData.dob || ''} onChange={handlePlayerChange} className="block w-full border border-gray-300 rounded-md p-2 mb-2" />
            <input name="phone" value={playerFormData.contact?.phone || ''} onChange={(e) => setPlayerFormData({ ...playerFormData, contact: { ...playerFormData.contact, phone: e.target.value } })} className="block w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Phone" />
            <input name="email" value={playerFormData.contact?.email || ''} onChange={(e) => setPlayerFormData({ ...playerFormData, contact: { ...playerFormData.contact, email: e.target.value } })} className="block w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Email" />
            <button onClick={handleAddPlayer} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
            <button onClick={() => { setAddingPlayer(false); setPlayerFormData({}); }} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {players.map(player => (
            <div key={player._id} className="border border-gray-300 rounded-lg p-4">
              {editingPlayer === player._id ? (
                <div>
                  <input name="fullName" value={playerFormData.fullName || ''} onChange={handlePlayerChange} className="block w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Full Name" />
                  <input name="position" value={playerFormData.position || ''} onChange={handlePlayerChange} className="block w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Position" />
                  <input name="jerseyNumber" type="number" value={playerFormData.jerseyNumber || ''} onChange={handlePlayerChange} className="block w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Jersey Number" />
                  <input name="dob" type="date" value={playerFormData.dob || ''} onChange={handlePlayerChange} className="block w-full border border-gray-300 rounded-md p-2 mb-2" />
                  <input name="phone" value={playerFormData.contact?.phone || ''} onChange={(e) => setPlayerFormData({ ...playerFormData, contact: { ...playerFormData.contact, phone: e.target.value } })} className="block w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Phone" />
                  <input name="email" value={playerFormData.contact?.email || ''} onChange={(e) => setPlayerFormData({ ...playerFormData, contact: { ...playerFormData.contact, email: e.target.value } })} className="block w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Email" />
                  <button onClick={handleSavePlayer} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                  <button onClick={() => { setEditingPlayer(null); setPlayerFormData({}); }} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                </div>
              ) : (

                <div className="max-w-sm w-full bg-white rounded-2xl shadow-sm p-5 flex flex-col items-center text-center hover:shadow-md transition-all duration-300">
                  {player.profilePicture && (
                    <Image
                      src={player.profilePicture || "https://cdn.pixabay.com/photo/2017/11/10/05/46/group-2935521_1280.png"}
                      alt={player.fullName || "Player photo"}
                      width={130}
                      height={130}
                      className="w-20 h-20 rounded-full object-cover mb-3"
                    />
                  )}

                  <h3 className="text-lg font-semibold text-gray-800">{player.fullName}</h3>
                  <p className="text-sm text-gray-500">Position: {player.position}</p>
                  <p className="text-sm text-gray-500">Jersey: #{player.jerseyNumber}</p>
                  <p className="text-sm text-gray-500">
                    DOB: {new Date(player.dob).toLocaleDateString()}
                  </p>

                  {player.contact?.phone && (
                    <p className="text-sm text-gray-500 mt-1">📞 {player.contact.phone}</p>
                  )}
                  {player.contact?.email && (
                    <p className="text-sm text-gray-500 truncate w-full">
                      ✉️ {player.contact.email}
                    </p>
                  )}

                  <div className="flex justify-center gap-3 mt-4 w-full">
                    <button
                      onClick={() => handleEditPlayer(player)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-1.5 rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePlayer(player._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1.5 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>

              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
