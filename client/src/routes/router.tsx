
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />
      }
    ]
  }
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};