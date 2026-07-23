import { useState } from "react";
import { Plus } from "lucide-react";
import DataTable from "../../components/ui/table/DataTable";
import type { Column } from "../../components/ui/table/DataTable";
import TableSkeleton from "../../components/ui/table/TableSkeleton";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

interface Client {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

const Clients = () => {
  // YOU handle fetching logic
  const [clients] = useState<Client[]>([]);
  const [loading] = useState(false);

  const columns: Column<Client>[] = [
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Created",
      accessor: "createdAt",
      render: (row) =>
        new Date(row.createdAt).toLocaleDateString(),
    },
    {
      header: "Status",
      accessor: "name",
      render: () => <Badge variant="success">Active</Badge>,
    },
    {
      header: "",
      accessor: "_id",
      render: () => (
        <Button variant="ghost" size="sm">
          View
        </Button>
      ),
      className: "text-right",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Clients
          </h1>
          <p className="text-sm opacity-70 mt-1">
            Manage your workspace clients.
          </p>
        </div>

        <Button>
          <Plus size={16} />
          Add Client
        </Button>
      </div>

      {/* Table */}
      {loading ? (
        <TableSkeleton columns={5} />
      ) : (
        <DataTable
          data={clients}
          columns={columns}
          keyField="_id"
          emptyMessage="No clients found. Add your first client."
        />
      )}

    </div>
  );
};

export default Clients;