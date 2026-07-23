import { Outlet } from "react-router-dom";
import Logo from "../assets/logo.png";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-app text-app flex flex-col items-center justify-center px-4 transition-colors">

      <div className="flex flex-col items-center mb-10">
        <img
          src={Logo}
          alt="WorkPilot Logo"
          className="w-14 h-14 object-contain mb-3"
        />
        <h1 className="text-2xl font-semibold text-primary">
          WorkPilot
        </h1>
        <p className="text-sm opacity-70 mt-1">
          Freelancer productivity system
        </p>
      </div>

      <div className="w-full max-w-md">
        <Outlet />
      </div>

    </div>
  );
};

export default AuthLayout;