import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import { getDashboard } from "../../api/dashboard.api";
import { useState, useEffect } from "react";
import { CardContent, CardHeader } from "../../components/ui/Card";
import Skeleton from "../../components/ui/Skeleton";

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
  <div className="space-y-10">

    {/* Header */}
    <div>
      <h1 className="text-2xl font-semibold text-app">
        Dashboard Overview
      </h1>
      <p className="text-sm opacity-70 mt-1">
        Summary of your workspace activity.
      </p>
    </div>

    {loading && (
      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <div className="space-y-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          </Card>
        ))}

      </div>
    )}

    {/* Error */}
    {error && (
      <Card variant="outline">
        <p className="text-(--color-danger) text-sm">
          {error}
        </p>
      </Card>
    )}

    {/* Stats */}
    {!loading && !error && (
      <>
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {/* Clients */}
          <Card hover className="cursor-pointer">
            <CardContent>
              <p className="text-sm opacity-70">Clients</p>
              <h2 className="text-3xl font-bold mt-2">
                {stats?.totalClients ?? 0}
              </h2>
            </CardContent>
          </Card>

          {/* Projects */}
          <Card hover className="cursor-pointer">
            <CardContent>
              <p className="text-sm opacity-70">Projects</p>
              <h2 className="text-3xl font-bold mt-2">
                {stats?.totalProjects ?? 0}
              </h2>
              <div className="mt-3">
                <Badge variant="success">
                  {stats?.activeProjects ?? 0} Active
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Tasks */}
          <Card hover className="cursor-pointer">
            <CardContent>
              <p className="text-sm opacity-70">Tasks</p>
              <h2 className="text-3xl font-bold mt-2">
                {stats?.totalTasks ?? 0}
              </h2>
            </CardContent>
          </Card>

          {/* Overdue */}
          <Card hover className="cursor-pointer">
            <CardContent>
              <p className="text-sm opacity-70">Overdue</p>
              <h2 className="text-3xl font-bold mt-2 text-(--color-danger)">
                {stats?.overdueTasks ?? 0}
              </h2>
            </CardContent>
          </Card>

        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* Active Projects */}
          <Card variant="elevated">
            <CardHeader>
              <h3 className="text-lg font-semibold">
                Active Projects
              </h3>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between items-center border-b border-app pb-2">
                <span>Website Redesign</span>
                <Badge variant="success">Active</Badge>
              </div>

              <div className="flex justify-between items-center border-b border-app pb-2">
                <span>Mobile App</span>
                <Badge variant="warning">Paused</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Recent Tasks */}
          <Card variant="elevated">
            <CardHeader>
              <h3 className="text-lg font-semibold">
                Recent Tasks
              </h3>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between items-center border-b border-app pb-2">
                <span>Design Landing Page</span>
                <Badge>Todo</Badge>
              </div>

              <div className="flex justify-between items-center border-b border-app pb-2">
                <span>API Integration</span>
                <Badge variant="success">Done</Badge>
              </div>
            </CardContent>
          </Card>

        </div>
      </>
    )}
  </div>
);
};

export default Dashboard;