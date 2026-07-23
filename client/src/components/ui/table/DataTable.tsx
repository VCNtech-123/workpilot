import clsx from "clsx";
import type { ReactNode } from "react";

export interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyField: keyof T;
  loading?: boolean;
  emptyMessage?: string;
}

function DataTable<T>({
  data,
  columns,
  keyField,
  loading = false,
  emptyMessage = "No data available.",
}: DataTableProps<T>) {
  return (
    <div className="bg-card border border-app rounded-xl overflow-hidden">

      <table className="w-full text-sm">

        {/* Header */}
        <thead className="bg-app border-b border-app">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="text-left px-6 py-4 font-medium opacity-70"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {!loading && data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-10 opacity-60"
              >
                {emptyMessage}
              </td>
            </tr>
          )}

          {!loading &&
            data.map((row) => (
              <tr
                key={String(row[keyField])}
                className="border-b border-app last:border-none hover:bg-app transition-colors"
              >
                {columns.map((col, index) => (
                  <td
                    key={index}
                    className={clsx(
                      "px-6 py-4",
                      col.className
                    )}
                  >
                    {col.render
                      ? col.render(row)
                      : String(row[col.accessor] ?? "-")}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>

      </table>
    </div>
  );
}

export default DataTable;