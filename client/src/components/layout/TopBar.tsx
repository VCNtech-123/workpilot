import { Menu, Sun, Moon } from "lucide-react";

const Topbar = () => {
  return (
    <header
      className="
        h-16 
        flex 
        items-center 
        justify-between 
        px-4 
        md:px-6 
        bg-card 
        border-b 
        border-app
      "
    >
 
      <div className="flex items-center gap-3">
        {/* Optional future sidebar toggle */}
        <button className="md:hidden">
          <Menu size={20} />
        </button>

        <h1 className="text-base md:text-lg font-semibold">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          onClick={() => {
            document.documentElement.classList.toggle("dark");
          }}
        >
          <Sun size={18} className="hidden dark:block" />
          <Moon size={18} className="block dark:hidden" />
        </button>

        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold">
          N
        </div>
      </div>
    </header>
  );
};

export default Topbar;