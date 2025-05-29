import React from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

export interface RowActionsProps<T> {
    row: T;
    onView?: (row: T) => void;
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
}

export function RowActions<T>({ row, onView, onEdit, onDelete }: RowActionsProps<T>) {
    return (
        <div className="entity-actions flex gap-2 items-center">
            <button
                className="p-1 rounded hover:bg-blue-100"
                title="View"
                onClick={() => onView?.(row)}
            >
                <FaEye size={18} className="text-blue-600" />
            </button>
            <button
                className="p-1 rounded hover:bg-green-100"
                title="Edit"
                onClick={() => onEdit?.(row)}
            >
                <FaEdit size={18} className="text-green-600" />
            </button>
            <button
                className="p-1 rounded hover:bg-red-100"
                title="Delete"
                onClick={() => onDelete?.(row)}
            >
                <FaTrash size={18} className="text-red-600" />
            </button>
        </div>
    );
}
