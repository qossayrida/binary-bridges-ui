import React, { useEffect, useState } from 'react';
import { apiGetAllAuthors } from '../service/authorService'; // adjust path as needed
import type {AuthorDTO} from "@binary-bridges/binary-bridges-axios-client-api/dist/com/binary-bridges/client/sdk/typescript/models";

// Assuming page-styles.css is imported globally or in a parent component

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
        <div className="page-min-h-screen">
            <h1 className="page-text-3xl page-font-bold page-text-gray-800 page-mb-6 page-text-center">Authors</h1>

            {loading && <p className="page-text-center">Loading...</p>}
            {error && <p className="page-text-center page-text-red-500">{error}</p>}

            <div className="page-grid page-grid-cols-1 page-sm:grid-cols-2 page-md:grid-cols-3 page-gap-6">
                {authors.map((author) => (
                    <div key={author.uuid} className="page-bg-white page-rounded-lg page-shadow page-p-4">
                        <h2 className="page-text-xl page-font-semibold page-text-indigo-700">{author.name}</h2>
                        {/* Add more fields as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
};
