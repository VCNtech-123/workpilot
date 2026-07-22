import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen p-6 bg-card border-r border-app">
      <h2 className="text-xl font-bold mb-8 text-primary">
        WorkPilot
      </h2>

      <nav className="space-y-2">
        <NavLink
          to="/dashboard"
          className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/clients"
          className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        >
          Clients
        </NavLink>

        <NavLink
          to="/projects"
          className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        >
          Projects
        </NavLink>

        <NavLink
          to="/tasks"
          className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        >
          Tasks
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;