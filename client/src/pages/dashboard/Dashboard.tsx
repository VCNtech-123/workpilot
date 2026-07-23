import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";

const Dashboard = () => {
  const stats = {
    totalClients: 12,
    totalProjects: 8,
    activeProjects: 5,
    totalTasks: 24,
    overdueTasks: 3,
  };

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-2xl font-semibold">
          Dashboard Overview
        </h1>
        <p className="text-sm opacity-70 mt-1">
          Summary of your workspace activity.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">

        <Card className="flex flex-col justify-between">
          <div className="space-y-2">
            <p className="text-sm opacity-70">Clients</p>
            <h2 className="text-3xl font-bold">
              {stats.totalClients}
            </h2>
          </div>
        </Card>

        <Card className="flex flex-col justify-between">
          <div className="space-y-2">
            <p className="text-sm opacity-70">Projects</p>
            <h2 className="text-3xl font-bold">
              {stats.totalProjects}
            </h2>
            <Badge variant="success">
              {stats.activeProjects} Active
            </Badge>
          </div>
        </Card>

        <Card className="flex flex-col justify-between">
          <div className="space-y-2">
            <p className="text-sm opacity-70">Tasks</p>
            <h2 className="text-3xl font-bold">
              {stats.totalTasks}
            </h2>
          </div>
        </Card>

        <Card className="flex flex-col justify-between">
          <div className="space-y-2">
            <p className="text-sm opacity-70">Overdue</p>
            <h2 className="text-3xl font-bold text-(--color-danger)">
              {stats.overdueTasks}
            </h2>
          </div>
        </Card>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <Card className="flex flex-col justify-between">
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

        <Card className="flex flex-col justify-between">
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

    </div>
  );
};

export default Dashboard;