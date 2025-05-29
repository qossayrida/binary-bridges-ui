import React, {useEffect, useState} from 'react';
import { apiGetAllSales } from '../service/saleservice';
import type { SaleDTO } from "@binary-bridges/binary-bridges-axios-client-api/dist/com/binary-bridges/client/sdk/typescript/models";
import { DataTablePage, ColumnConfig } from '../components/ui/DataTablePage';
import {RowActions} from "../components/ui/RowActions.tsx";

export const SalesPage = () => {
    const [sales, setSales] = useState<SaleDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Define sales columns configuration
    const salesColumns: ColumnConfig<SaleDTO>[] = [
        {
            field: 'saleDate',
            header: 'Sale Date',
            id: 'saleDate',
            index: 0,
            sortable: true,
            resizeable: true,
            reorderable: true,
            checked: true,
            style: { width: '15rem' },
            body: (rowData: SaleDTO) => (
                <div className="entity-name-cell">
                    <div className="entity-avatar">
                        📅
                    </div>
                    <div className="entity-info">
                        <span className="entity-name">
                            {rowData.saleDate ? new Date(rowData.saleDate).toLocaleDateString() : 'Unknown Date'}
                        </span>
                        {rowData.uuid && (
                            <code className="entity-id">ID: {rowData.uuid.slice(0, 8)}...</code>
                        )}
                    </div>
                </div>
            )
        },
        {
            field: 'quantity',
            header: 'Quantity',
            id: 'quantity',
            index: 1,
            sortable: true,
            resizeable: true,
            reorderable: true,
            checked: true,
            style: { width: '10rem' },
            body: (rowData: SaleDTO) => (
                <span className="quantity-display">
                    <span className="quantity-number">{rowData.quantity || 0}</span>
                    <span className="quantity-unit">units</span>
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
            body: (rowData: SaleDTO) => (
                <RowActions
                    row={rowData}
                    onView={(sale) => console.log('View', sale)}
                    onEdit={(sale) => console.log('Edit', sale)}
                    onDelete={(sale) => console.log('Delete', sale)}
                />
            )
        }
    ];

    const fetchSales = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiGetAllSales();
            setSales(response.data || []);
        } catch (err) {
            setError("Failed to load sales.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSales();
    }, []);

    // Handler functions
    const handleAdd = () => {
        console.log('Add new sale');
        // Implement add sale logic - could open a modal or navigate to add sale page
    };

    const handleExport = () => {
        console.log('Export sales data');
        // Implement export logic - could export to CSV, Excel, PDF, etc.
    };

    const handleDeleteSelected = (selected: SaleDTO[]) => {
        console.log('Process selected sales:', selected);
        // For sales, might be better to have "Refund" or "Cancel" instead of delete
        // Or batch operations like "Mark as Shipped", "Generate Invoices", etc.
    };

    const getUniqueId = (sale: SaleDTO) => sale.uuid || '';

    return (
        <DataTablePage
            title="Sales Management"
            data={sales}
            columns={salesColumns}
            loading={loading}
            error={error}
            onRefresh={fetchSales}
            getUniqueId={getUniqueId}
            onAdd={handleAdd}
            onExport={handleExport}
            onDeleteSelected={handleDeleteSelected}
        />
    );
};

export default SalesPage;