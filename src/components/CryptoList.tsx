// src/components/CryptoList.tsx
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import cryptoStore from "../store/CryptoStore";
import Table from "./Table";
import { Link } from "react-router-dom";

const CryptoList: React.FC = observer(() => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    cryptoStore.fetchCryptoRates();
  }, []);

  // Define columns for the table
  const columns = React.useMemo(
    () => [
      {
        accessorFn: (row: any) => `${row.baseCurrency}/${row.quoteCurrency}`, // Custom accessor for combined currency
        id: "currencyPair",
        header: "Currency Pair",
        cell: ({ getValue }: any) => (
          <Link to={`/${getValue().toLowerCase()}`}>{getValue()}</Link>
        ),
      },
      {
        accessorKey: "rate",
        header: "Rate",
      },
      {
        accessorKey: "ask",
        header: "Ask",
      },
      {
        accessorKey: "bid",
        header: "Bid",
      },
      {
        accessorKey: "diff24h",
        header: "24h Diff",
      },
    ],
    []
  );

  const table = useReactTable({
    data: cryptoStore.cryptoRates,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination,
    },
    globalFilterFn: "includesString",
  });

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: Number(event.target.value),
      pageIndex: 0, // Reset to the first page on page size change
    }));
  };

  if (cryptoStore.loading) {
    return <div>Loading...</div>;
  }

  if (cryptoStore.error) {
    return <div>{cryptoStore.error}</div>;
  }

  return (
    <div className="container">
      <h1>Crypto Rates</h1>
      <div className="searchSector">
        <input
          type="text"
          placeholder="Search..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
        />
      </div>
      <Table
        headerGroups={table.getHeaderGroups()}
        rows={table.getRowModel().rows}
        columns={columns}
        total={null}
        createFooterRow={() => null}
      />
      <div className="tableFooter">
        <div>
          <label htmlFor="pageSize">Rows per page:</label>
          <select
            id="pageSize"
            value={pagination.pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="pagination">
          <button
            onClick={() => setPagination((prev) => ({ ...prev, pageIndex: 0 }))}
            disabled={pagination.pageIndex === 0}
          >
            {"<<"}
          </button>
          <button
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                pageIndex: prev.pageIndex - 1,
              }))
            }
            disabled={pagination.pageIndex === 0}
          >
            {"<"}
          </button>
          <span>
            Page {pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <button
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                pageIndex: prev.pageIndex + 1,
              }))
            }
            disabled={pagination.pageIndex >= table.getPageCount() - 1}
          >
            {">"}
          </button>
          <button
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                pageIndex: table.getPageCount() - 1,
              }))
            }
            disabled={pagination.pageIndex >= table.getPageCount() - 1}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
});

export default CryptoList;
