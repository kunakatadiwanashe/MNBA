'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Team {
    _id: string;
    name: string;
}

export default function InputResultsPage() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [formData, setFormData] = useState({
        homeTeam: '',
        awayTeam: '',
        homeScore: '',
        awayScore: '',
        date: '',
        venue: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try {
            const response = await fetch('/api/teams');
            if (response.ok) {
                const data = await response.json();
                setTeams(data);
            } else {
                setError('Failed to fetch teams');
            }
        } catch (err) {
            setError('Error fetching teams');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/matches', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    homeScore: parseInt(formData.homeScore),
                    awayScore: parseInt(formData.awayScore),
                }),
            });

            if (response.ok) {
                router.push('/admin/dashboard');
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to save match result');
            }
        } catch (err) {
            setError('Error saving match result');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-md mx-auto bg-white shadow-sm rounded-2xl p-6">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Input Match Result</h1>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="homeTeam" className="block text-sm font-medium text-gray-700 mb-1">Home Team</label>
                        <select
                            id="homeTeam"
                            name="homeTeam"
                            value={formData.homeTeam}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        >
                            <option value="">Select Home Team</option>
                            {teams.map((team) => (
                                <option key={team._id} value={team._id}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="awayTeam" className="block text-sm font-medium text-gray-700 mb-1">Away Team</label>
                        <select
                            id="awayTeam"
                            name="awayTeam"
                            value={formData.awayTeam}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        >
                            <option value="">Select Away Team</option>
                            {teams.map((team) => (
                                <option key={team._id} value={team._id}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="homeScore" className="block text-sm font-medium text-gray-700 mb-1">Home Score</label>
                            <input
                                id="homeScore"
                                type="number"
                                name="homeScore"
                                value={formData.homeScore}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                                min="0"
                            />
                        </div>
                        <div>
                            <label htmlFor="awayScore" className="block text-sm font-medium text-gray-700 mb-1">Away Score</label>
                            <input
                                id="awayScore"
                                type="number"
                                name="awayScore"
                                value={formData.awayScore}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                                min="0"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                            id="date"
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="venue" className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                        <input
                            id="venue"
                            type="text"
                            name="venue"
                            value={formData.venue}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Result'}
                    </button>
                </form>
            </div>
        </div>
    );
}
