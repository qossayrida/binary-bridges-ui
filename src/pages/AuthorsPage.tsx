import React, {JSX, useEffect, useState} from 'react';
import { apiGetAllAuthors } from '../service/authorservice';
import type { AuthorDTO } from "@binary-bridges/binary-bridges-axios-client-api/dist/com/binary-bridges/client/sdk/typescript/models";

// Column configuration for authors table
interface ColumnConfig {
    field: string;
    header: string;
    id: string;
    index: number;
    sortable?: boolean;
    resizeable: boolean;
    reorderable: boolean;
    style?: any;
    checked: boolean;
    body?: (rowData: any) => JSX.Element | string | number;
}

export const AuthorsPage = () => {
    const [authors, setAuthors] = useState<AuthorDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [selectedRows, setSelectedRows] = useState<AuthorDTO[]>([]);
    const [sortField, setSortField] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [tableSize, setTableSize] = useState<'compact' | 'comfortable' | 'spacious'>('comfortable');

    // Define columns configuration
    const columns: ColumnConfig[] = [
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
                <div className="entity-actions">
                    <button className="action-btn view" title="View Author">
                        👁️
                    </button>
                    <button className="action-btn edit" title="Edit Author">
                        ✏️
                    </button>
                    <button className="action-btn delete" title="Delete Author">
                        🗑️
                    </button>
                </div>
            )
        }
    ];

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await apiGetAllAuthors();
                setAuthors(response.data || []);
            } catch (err) {
                setError("Failed to load authors.");
            } finally {
                setLoading(false);
            }
        };

        fetchAuthors();
    }, []);

    // Handle pagination
    const handlePaginationChange = (event: { first: number; rows: number }) => {
        setPageIndex(Math.floor(event.first / event.rows));
        setPageSize(event.rows);
    };

    // Handle selection
    const handleCheckBoxChange = (rows: AuthorDTO[]) => {
        setSelectedRows(rows);
    };

    // Handle sorting
    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    // Sort authors data
    const sortedAuthors = React.useMemo(() => {
        if (!sortField) return authors;

        return [...authors].sort((a, b) => {
            const aValue = a[sortField as keyof AuthorDTO] || '';
            const bValue = b[sortField as keyof AuthorDTO] || '';

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    }, [authors, sortField, sortOrder]);

    // Paginated data
    const paginatedAuthors = React.useMemo(() => {
        const startIndex = pageIndex * pageSize;
        return sortedAuthors.slice(startIndex, startIndex + pageSize);
    }, [sortedAuthors, pageIndex, pageSize]);

    // Get unique countries count
    const uniqueCountries = React.useMemo(() => {
        return new Set(authors.map(author => author.country).filter(Boolean)).size;
    }, [authors]);

    if (loading) {
        return (
            <div className="data-page">
                <div className="page-container">
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Loading authors...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="data-page">
                <div className="page-container">
                    <div className="error-container">
                        <div className="error-icon">⚠️</div>
                        <p className="error-message">{error}</p>
                        <button
                            className="retry-btn"
                            onClick={() => window.location.reload()}
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="data-page">
            <div className="page-container">
                {/* Header Section */}
                <div className="page-header">
                    <div className="header-content">
                        <h1 className="page-title">Authors Management</h1>
                        <div className="page-stats">
                            <div className="stat-card">
                                <div className="stat-number">{authors.length}</div>
                                <div className="stat-label">Total Authors</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">{uniqueCountries}</div>
                                <div className="stat-label">Countries</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">{selectedRows.length}</div>
                                <div className="stat-label">Selected</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Wrapper */}
                <div className="table-wrapper">
                    {/* Table Controls */}
                    <div className="table-controls-section">
                        <div className="table-actions">
                            <button className="control-btn primary">
                                <span>➕</span>
                                Add Author
                            </button>
                            <button className="control-btn secondary">
                                <span>📤</span>
                                Export
                            </button>
                            {selectedRows.length > 0 && (
                                <button className="control-btn danger">
                                    <span>🗑️</span>
                                    Delete Selected ({selectedRows.length})
                                </button>
                            )}
                        </div>

                        <div className="table-size-controls">
                            <label className="size-label">Table Size:</label>
                            <select
                                className="size-selector"
                                value={tableSize}
                                onChange={(e) => setTableSize(e.target.value as 'compact' | 'comfortable' | 'spacious')}
                            >
                                <option value="compact">Compact</option>
                                <option value="comfortable">Comfortable</option>
                                <option value="spacious">Spacious</option>
                            </select>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="data-table-container">
                        <div className="table-responsive">
                            <table className={`data-table size-${tableSize}`}>
                                <thead>
                                <tr>
                                    <th className="checkbox-column">
                                        <input
                                            type="checkbox"
                                            className="table-checkbox"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedRows([...paginatedAuthors]);
                                                } else {
                                                    setSelectedRows([]);
                                                }
                                            }}
                                            checked={selectedRows.length === paginatedAuthors.length && paginatedAuthors.length > 0}
                                        />
                                    </th>
                                    {columns.filter(col => col.checked).map(column => (
                                        <th
                                            key={column.id}
                                            className={`table-header-cell ${column.sortable ? 'sortable' : ''}`}
                                            onClick={() => column.sortable && handleSort(column.field)}
                                        >
                                            <div className="header-content">
                                                <span>{column.header}</span>
                                                {column.sortable && (
                                                    <span className={`sort-indicator ${sortField === column.field ? `active ${sortOrder}` : ''}`}>
                                                            {sortField === column.field ? (sortOrder === 'asc' ? '↑' : '↓') : '↕️'}
                                                        </span>
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {paginatedAuthors.map((author, index) => (
                                    <tr key={author.uuid || index} className="table-row">
                                        <td className="table-cell checkbox-column">
                                            <input
                                                type="checkbox"
                                                className="table-checkbox"
                                                checked={selectedRows.some(row => row.uuid === author.uuid)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedRows([...selectedRows, author]);
                                                    } else {
                                                        setSelectedRows(selectedRows.filter(row => row.uuid !== author.uuid));
                                                    }
                                                }}
                                            />
                                        </td>
                                        {columns.filter(col => col.checked).map(column => (
                                            <td key={column.id} className="table-cell">
                                                {column.body ? column.body(author) : author[column.field as keyof AuthorDTO]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Table Footer */}
                    <div className="table-footer">
                        <div className="pagination-info">
                            Showing {pageIndex * pageSize + 1} to {Math.min((pageIndex + 1) * pageSize, authors.length)} of {authors.length} entries
                        </div>
                        <div className="pagination-controls">
                            <button
                                className="pagination-btn"
                                disabled={pageIndex === 0}
                                onClick={() => handlePaginationChange({ first: (pageIndex - 1) * pageSize, rows: pageSize })}
                            >
                                Previous
                            </button>
                            <span className="page-info">
                                Page {pageIndex + 1} of {Math.ceil(authors.length / pageSize)}
                            </span>
                            <button
                                className="pagination-btn"
                                disabled={pageIndex >= Math.ceil(authors.length / pageSize) - 1}
                                onClick={() => handlePaginationChange({ first: (pageIndex + 1) * pageSize, rows: pageSize })}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};