'use client';

import { useState, useEffect } from 'react';

interface Headline {
    _id: string;
    title: string;
    content: string;
    date: string;
}

export default function HeadlinesPage() {
    const [headlines, setHeadlines] = useState<Headline[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHeadlines = async () => {
            try {
                const response = await fetch('/api/headlines');
                const data = await response.json();
                setHeadlines(data);
            } catch (error) {
                console.error('Failed to fetch headlines:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHeadlines();
    }, []);

    if (loading) {
        return <div className="container mx-auto p-6">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Headlines</h1>

            {headlines.length === 0 ? (
                <p>No headlines available.</p>
            ) : (
                <div className="space-y-6">
                    {headlines.map(headline => (
                        <div key={headline._id} className="border border-gray-300 rounded-lg p-4">
                            <h2 className="text-2xl font-semibold mb-2">{headline.title}</h2>
                            <p className="text-gray-600 mb-2">{new Date(headline.date).toLocaleDateString()}</p>
                            <p>{headline.content}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
