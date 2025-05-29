import React, {JSX, useEffect, useState} from 'react';
import { apiGetAllAuthors } from '../service/authorservice';
import type { AuthorDTO } from "@binary-bridges/binary-bridges-axios-client-api/dist/com/binary-bridges/client/sdk/typescript/models";
import { DataTablePage, ColumnConfig } from '../components/ui/DataTablePage';
import { RowActions } from '../components/ui/RowActions'; // adjust the path as needed
import {useNavigate} from "react-router-dom";

export const AuthorsPage = () => {
    const [authors, setAuthors] = useState<AuthorDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Define authors columns configuration
    const authorsColumns: ColumnConfig<AuthorDTO>[] = [
        {
            field: 'name',
            header: 'Author Name',
            id: 'name',
            index: 0,
            sortable: true,
            resizeable: true,
            reorderable: true,
            checked: true,
            style: { width: '20rem' },
            body: (rowData: AuthorDTO) => (
                <div className="entity-name-cell">
                    <div className="entity-avatar">
                        {rowData.name?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <div className="entity-info">
                        <span className="entity-name">{rowData.name}</span>
                        {rowData.uuid && (
                            <code className="entity-id">ID: {rowData.uuid.slice(0, 8)}...</code>
                        )}
                    </div>
                </div>
            )
        },
        {
            field: 'country',
            header: 'Country',
            id: 'country',
            index: 1,
            sortable: true,
            resizeable: true,
            reorderable: true,
            checked: true,
            style: { width: '15rem' },
            body: (rowData: AuthorDTO) => (
                <span className="country-badge">
                    {rowData.country || 'Unknown'}
                </span>
            )
        },
        {
            field: 'actions',
            header: 'Actions',
            id: 'actions',
            index: 2,
            sortable: false,
            resizeable: false,
            reorderable: false,
            checked: true,
            style: { width: '8rem' },
            body: (rowData: AuthorDTO) => (
                <RowActions
                    row={rowData}
                    onView={(author) => console.log('View', author)}
                    onEdit={(author) => console.log('Edit', author)}
                    onDelete={(author) => console.log('Delete', author)}
                />
            )
        }

    ];

    const fetchAuthors = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiGetAllAuthors();
            setAuthors(response.data || []);
        } catch (err) {
            setError("Failed to load authors.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAuthors();
    }, []);

    // Handler functions
    const handleAdd = () => {
        console.log('Add new author');
        navigate('/author/add'); // Navigate to the add author page
    };

    const handleExport = () => {
        console.log('Export authors');
        // Implement export logic
    };

    const handleDeleteSelected = (selected: AuthorDTO[]) => {
        console.log('Delete selected authors:', selected);
        // Implement delete logic
    };

    const getUniqueId = (author: AuthorDTO) => author.uuid || '';

    return (
        <DataTablePage
            title="Authors Management"
            data={authors}
            columns={authorsColumns}
            loading={loading}
            error={error}
            onRefresh={fetchAuthors}
            getUniqueId={getUniqueId}
            onAdd={handleAdd}
            onExport={handleExport}
            onDeleteSelected={handleDeleteSelected}
        />
    );
};

export default AuthorsPage;