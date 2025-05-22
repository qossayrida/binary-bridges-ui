import React, { useEffect, useState } from 'react';
import { apiGetAllAuthors } from '../service/authorService'; // adjust path as needed
import type {AuthorDTO} from "@binary-bridges/binary-bridges-axios-client-api/dist/com/binary-bridges/client/sdk/typescript/models";


export const AuthorsPage = () => {
    const [authors, setAuthors] = useState<AuthorDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await apiGetAllAuthors();
                setAuthors(response.data || []); // safely fallback to []
            } catch (err) {
                setError("Failed to load authors.");
            } finally {
                setLoading(false);
            }
        };

        fetchAuthors();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Authors</h1>

            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {authors.map((author) => (
                    <div key={author.uuid} className="bg-white rounded-lg shadow p-4">
                        <h2 className="text-xl font-semibold text-indigo-700">{author.name}</h2>
                        {/* Add more fields as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
};
