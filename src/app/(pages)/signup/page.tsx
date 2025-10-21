


'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'team-manager'>('team-manager');
  const [teamId, setTeamId] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/users', {
        name,
        email,
        password,
        role,
        teamId: role === 'team-manager' ? teamId : undefined,
      });
      alert('Signup successful. Please sign in.');
      router.push('/signin');
    } catch (err) {
      console.error(err);
      alert('Signup failed');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        {/* Logo and Title */}
        <div className="flex items-center justify-between mb-8">
          <Image src="https://res.cloudinary.com/dyikkz1ur/image/upload/v1759488643/IMG-20251003-WA0007_u0gn8l.jpg" width={16} height={16}alt="Logo" className="w-16 h-16 mb-3" />
          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            Sign Up
          </h1>
          <Image src="https://res.cloudinary.com/dyikkz1ur/image/upload/v1739973643/blog/file_1739973642190.png" width={16} height={16} alt="Logo" className="w-21 h-16 mb-3" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
          <select
            value={role}
            onChange={e => setRole(e.target.value as 'admin' | 'team-manager')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="admin">Admin</option>
            <option value="team-manager">Team Manager</option>
          </select>
          {role === 'team-manager' && (
            <input
              type="text"
              placeholder="Team ID"
              value={teamId}
              onChange={e => setTeamId(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}
