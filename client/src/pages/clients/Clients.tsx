import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import DataTable from "../../components/ui/table/DataTable";
import type { Column } from "../../components/ui/table/DataTable";
import TableSkeleton from "../../components/ui/table/TableSkeleton";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Pagination from "../../components/ui/table/Pagination";
import { getClients } from "../../api/client.api";


interface Client {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

const Clients = () => {

    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(1);

    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        
        const getClientsData = async () => {
            try {
                setLoading(true);
                const response = await getClients({ page: page, limit: limit})
                console.log(response.data);
                setClients(response.data);
                setTotalPages(response.pages)
            } catch (err: any) {
                console.log(err?.message || "failed to fetch data")
            } finally {
                setLoading(false)
            }
        }
        
        getClientsData();
    }, [page, limit])

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
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">
            Clients
          </h1>
          <p className="text-sm opacity-70 mt-1">
            Manage your workspace clients.
          </p>
        </div>

        <Button
          className="w-full sm:w-auto"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={16} />
          Add Client
        </Button>

      </div>

      {/* Table */}
      {loading ? (
        <TableSkeleton columns={5} />
      ) : (
        <>
          <div className="overflow-x-auto">
            <DataTable
              data={clients}
              columns={columns}
              keyField="_id"
              emptyMessage="No clients found. Add your first client."
            />
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

    </div>
  );
};

export default Clients;