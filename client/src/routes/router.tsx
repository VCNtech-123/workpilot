
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

const Dashboard = () => <div>Dashboard</div>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};