import React, {useEffect, useState} from 'react';
import { apiGetAllBooks } from '../../service/bookservice.ts';
import type { BookDTO } from "@binary-bridges/binary-bridges-axios-client-api/dist/com/binary-bridges/client/sdk/typescript/models";
import { DataTablePage, ColumnConfig } from '../../components/ui/DataTablePage.tsx';
import {RowActions} from "../../components/ui/RowActions.tsx";


export const BooksPage = () => {
    const [books, setBooks] = useState<BookDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Define books columns configuration
    const booksColumns: ColumnConfig<BookDTO>[] = [
        {
            field: 'title',
            header: 'Book Title',
            id: 'title',
            index: 0,
            sortable: true,
            resizeable: true,
            reorderable: true,
            checked: true,
            style: { width: '25rem' },
            body: (rowData: BookDTO) => (
                <div className="entity-name-cell">
                    <div className="entity-avatar">
                        📖
                    </div>
                    <div className="entity-info">
                        <span className="entity-name">{rowData.title}</span>
                        {rowData.uuid && (
                            <code className="entity-id">ID: {rowData.uuid.slice(0, 8)}...</code>
                        )}
                    </div>
                </div>
            )
        },
        {
            field: 'price',
            header: 'Price',
            id: 'price',
            index: 1,
            sortable: true,
            resizeable: true,
            reorderable: true,
            checked: true,
            style: { width: '8rem' },
            body: (rowData: BookDTO) => (
                <span className="price-display">
                    {rowData.price ? `$${rowData.price.toFixed(2)}` : 'N/A'}
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
            body: (rowData: BookDTO) => (
                <RowActions
                    row={rowData}
                    onView={(book) => console.log('View', book)}
                    onEdit={(book) => console.log('Edit', book)}
                    onDelete={(book) => console.log('Delete', book)}
                />
            )
        }
    ];

    const fetchBooks = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiGetAllBooks();
            setBooks(response.data || []);
        } catch (err) {
            setError("Failed to load books.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    // Handler functions
    const handleAdd = () => {
        console.log('Add new book');
        // Implement add book logic
    };

    const handleExport = () => {
        console.log('Export books');
        // Implement export logic
    };

    const handleDeleteSelected = (selected: BookDTO[]) => {
        console.log('Delete selected books:', selected);
        // Implement delete logic
    };

    const getUniqueId = (book: BookDTO) => book.uuid || '';

    return (
        <DataTablePage
            title="Books Management"
            data={books}
            columns={booksColumns}
            loading={loading}
            error={error}
            onRefresh={fetchBooks}
            getUniqueId={getUniqueId}
            onAdd={handleAdd}
            onExport={handleExport}
            onDeleteSelected={handleDeleteSelected}
        />
    );
};

export default BooksPage;