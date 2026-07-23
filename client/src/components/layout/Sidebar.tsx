import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";

const Sidebar = () => {
  return (
    <aside
      className="
        fixed 
        bottom-0 
        left-0 
        right-0 
        h-16 
        bg-card 
        border-t 
        border-app 
        flex 
        items-center 
        justify-around 
        px-4
        md:static 
        md:h-auto 
        md:w-64 
        md:min-h-screen 
        md:flex-col 
        md:items-start 
        md:justify-start 
        md:border-t-0 
        md:border-r 
        md:p-6
      "
    >
      <div className="hidden md:flex items-center mb-10">
        <img
          src={Logo}
          alt="WorkPilot Logo"
          className="w-13 h-13 object-contain"
        />
        <h2 className="text-lg font-semibold text-primary">
          WorkPilot
        </h2>
      </div>

      <nav
        className="
          flex 
          w-full 
          justify-around 
          md:flex-col 
          md:space-y-2 
          md:w-full
        "
      >
        <NavItem to="/" label="Dashboard" />
        <NavItem to="/clients" label="Clients" />
        <NavItem to="/projects" label="Projects" />
        <NavItem to="/tasks" label="Tasks" />
      </nav>
    </aside>
  );
};

interface NavItemProps {
  to: string;
  label: string;
}

const NavItem = ({ to, label }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        text-sm font-medium 
        px-3 py-2 
        rounded-lg 
        transition-all 
        duration-200
        ${
          isActive
            ? "bg-primary text-white"
            : "hover:bg-gray-200 dark:hover:bg-gray-800"
        }
        md:w-full
        text-center 
        md:text-left
        `
      }
    >
      {label}
    </NavLink>
  );
};

export default Sidebar;