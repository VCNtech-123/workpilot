import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import { getDashboard } from "../../api/dashboard.api";
import { useState, useEffect } from "react";

interface DashboardStats {
  totalClients: number;
  totalProjects: number;
  activeProjects: number;
  totalTasks: number;
  overdueTasks: number;
}

const Dashboard = () => {
  
  const [ stats, setStats ] = useState<DashboardStats | null>(null);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await getDashboard();
        setStats(data)
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard page")
      } finally {
        setLoading(false)
      }
    };

    fetchDashboardData();
    
  }, []);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-app">
          Dashboard Overview
        </h1>
        <p className="text-sm opacity-70 mt-1">
          Summary of your workspace activity.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="h-28 animate-pulse bg-card" />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <Card>
          <p className="text-(--color-danger) text-sm">
            {error}
          </p>
        </Card>
      )}

      {/* Stats */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">

            <Card className="flex flex-col justify-between">
              <p className="text-sm opacity-70">Clients</p>
              <h2 className="text-3xl font-bold">
                {stats?.totalClients ?? 0}
              </h2>
            </Card>

            <Card className="flex flex-col justify-between">
              <p className="text-sm opacity-70">Projects</p>
              <h2 className="text-3xl font-bold">
                {stats?.totalProjects ?? 0}
              </h2>
              <Badge variant="success">
                {stats?.activeProjects ?? 0} Active
              </Badge>
            </Card>

            <Card className="flex flex-col justify-between">
              <p className="text-sm opacity-70">Tasks</p>
              <h2 className="text-3xl font-bold">
                {stats?.totalTasks ?? 0}
              </h2>
            </Card>

            <Card className="flex flex-col justify-between">
              <p className="text-sm opacity-70">Overdue</p>
              <h2 className="text-3xl font-bold text-(--color-danger)">
                {stats?.overdueTasks ?? 0}
              </h2>
            </Card>

          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            <Card>
              <h3 className="text-lg font-semibold mb-4">
                Active Projects
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-app pb-2">
                  <span>Website Redesign</span>
                  <Badge variant="success">Active</Badge>
                </div>

                <div className="flex justify-between items-center border-b border-app pb-2">
                  <span>Mobile App</span>
                  <Badge variant="warning">Paused</Badge>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">
                Recent Tasks
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-app pb-2">
                  <span>Design Landing Page</span>
                  <Badge>Todo</Badge>
                </div>

                <div className="flex justify-between items-center border-b border-app pb-2">
                  <span>API Integration</span>
                  <Badge variant="success">Done</Badge>
                </div>
              </div>
            </Card>

          </div>
        </>
      )}

    </div>
  );
};

export default Dashboard;