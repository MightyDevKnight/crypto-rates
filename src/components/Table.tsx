// src/components/Table.tsx
import React from 'react';
import { flexRender } from '@tanstack/react-table';
import { FaSortDown, FaSortUp } from 'react-icons/fa';

interface TableProps {
  headerGroups: any[];
  rows: any[];
  columns: any[];
  total?: any; 
  createFooterRow?: () => React.ReactNode; 
}

const Table: React.FC<TableProps> = ({ headerGroups, rows, columns, total, createFooterRow }) => {
  return (
    <table className="custom-table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr key={headerGroup.id} className="header-row">
            {headerGroup.headers.map((header: any) => {
              return (
                <th key={header.id} className="header-cell" onClick={header.column.getToggleSortingHandler()}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                          asc: <FaSortUp />,
                          desc: <FaSortDown />,
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.length ? (
          rows.map((row) => (
            <tr key={row.id} className="data-row" data-state={row.getIsSelected() && 'selected'}>
              {row.getVisibleCells().map((cell: any) => (
                <td key={cell.id} className="data-cell">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="no-results">
              No results.
            </td>
          </tr>
        )}
      </tbody>
      <tfoot className="footer">
        {total && createFooterRow && createFooterRow()}
      </tfoot>
    </table>
  );
};

export default Table;
