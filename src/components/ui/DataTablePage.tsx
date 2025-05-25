import React, {JSX, useEffect, useState, useMemo} from 'react';
import {LoadingSpinner} from './LoadingSpinner';

// Column configuration interface
export interface ColumnConfig<T = any> {
    field: string;
    header: string;
    id: string;
    index: number;
    sortable?: boolean;
    resizeable: boolean;
    reorderable: boolean;
    style?: any;
    checked: boolean;
    body?: (rowData: T) => JSX.Element | string | number;
}

// Generic data table props interface
interface DataTablePage<T> {
    title: string;
    data: T[];
    columns: ColumnConfig<T>[];
    loading: boolean;
    error: string | null;
    onRefresh: () => void;
    getUniqueId: (item: T) => string;
    getStatsData?: (data: T[]) => Array<{ label: string; value: number }>;
    onAdd?: () => void;
    onExport?: () => void;
    onDeleteSelected?: (selected: T[]) => void;
}

export const DataTablePage = <T,>({
                                      title,
                                      data,
                                      columns,
                                      loading,
                                      error,
                                      onRefresh,
                                      getUniqueId,
                                      getStatsData,
                                      onAdd,
                                      onExport,
                                      onDeleteSelected
                                  }: DataTablePage<T>) => {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [selectedRows, setSelectedRows] = useState<T[]>([]);
    const [sortField, setSortField] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // Handle pagination
    const handlePaginationChange = (event: { first: number; rows: number }) => {
        setPageIndex(Math.floor(event.first / event.rows));
        setPageSize(event.rows);
    };

    // Handle selection
    const handleCheckBoxChange = (rows: T[]) => {
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

    // Sort data
    const sortedData = useMemo(() => {
        if (!sortField) return data;

        return [...data].sort((a, b) => {
            const aValue = (a as any)[sortField] || '';
            const bValue = (b as any)[sortField] || '';

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    }, [data, sortField, sortOrder]);

    // Paginated data
    const paginatedData = useMemo(() => {
        const startIndex = pageIndex * pageSize;
        return sortedData.slice(startIndex, startIndex + pageSize);
    }, [sortedData, pageIndex, pageSize]);

    // Get stats data
    const statsData = useMemo(() => {
        const defaultStats = [
            { label: 'Total Items', value: data.length },
            { label: 'Selected', value: selectedRows.length }
        ];

        if (getStatsData) {
            const customStats = getStatsData(data);
            return [defaultStats[0], ...customStats, defaultStats[1]];
        }

        return defaultStats;
    }, [data, selectedRows, getStatsData]);

    // Reset selection when data changes
    useEffect(() => {
        setSelectedRows([]);
    }, [data]);

    if (loading) {
        return <LoadingSpinner text={`Loading ${title.toLowerCase()}...`} centered />;
    }

    if (error) {
        return (
            <div className="data-page">
                <div className="page-container">
                    <div className="error-container">
                        <div className="error-icon">⚠️</div>
                        <p className="error-message">{error}</p>
                        <button className="retry-btn" onClick={onRefresh}>
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
                    <div className="header-content-wrapper">
                        <h1 className="page-title">{title}</h1>
                        <div className="page-stats">
                            {statsData.map((stat, index) => (
                                <div key={index} className="stat-card">
                                    <div className="stat-number">{stat.value}</div>
                                    <div className="stat-label">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Table Wrapper */}
                <div className="table-wrapper">
                    {/* Table Controls */}
                    <div className="table-controls-section">
                        <div className="table-actions">
                            {onAdd && (
                                <button className="control-btn primary" onClick={onAdd}>
                                    <span>➕</span>
                                    Add New
                                </button>
                            )}
                            {onExport && (
                                <button className="control-btn secondary" onClick={onExport}>
                                    <span>📤</span>
                                    Export
                                </button>
                            )}
                            {selectedRows.length > 0 && onDeleteSelected && (
                                <button
                                    className="control-btn danger"
                                    onClick={() => onDeleteSelected(selectedRows)}
                                >
                                    <span>🗑️</span>
                                    Delete Selected ({selectedRows.length})
                                </button>
                            )}
                        </div>

                    </div>

                    {/* Data Table */}
                    <div className="data-table-container">
                        <div className="table-responsive">
                            <table className={`data-table size-comfortable`}>
                                <thead>
                                <tr>
                                    <th className="checkbox-column">
                                        <input
                                            type="checkbox"
                                            className="table-checkbox"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedRows([...paginatedData]);
                                                } else {
                                                    setSelectedRows([]);
                                                }
                                            }}
                                            checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
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
                                {paginatedData.map((item, index) => (
                                    <tr key={getUniqueId(item) || index} className="table-row">
                                        <td className="table-cell checkbox-column">
                                            <input
                                                type="checkbox"
                                                className="table-checkbox"
                                                checked={selectedRows.some(row => getUniqueId(row) === getUniqueId(item))}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedRows([...selectedRows, item]);
                                                    } else {
                                                        setSelectedRows(selectedRows.filter(row => getUniqueId(row) !== getUniqueId(item)));
                                                    }
                                                }}
                                            />
                                        </td>
                                        {columns.filter(col => col.checked).map(column => (
                                            <td key={column.id} className="table-cell">
                                                {column.body ? column.body(item) : (item as any)[column.field]}
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
                            Showing {pageIndex * pageSize + 1} to {Math.min((pageIndex + 1) * pageSize, data.length)} of {data.length} entries
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
                                Page {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
                            </span>
                            <button
                                className="pagination-btn"
                                disabled={pageIndex >= Math.ceil(data.length / pageSize) - 1}
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