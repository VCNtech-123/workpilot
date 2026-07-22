
const Topbar = () => {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-card border-b border-app">
      <h1 className="text-lg font-semibold">
        Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <button
          className="px-3 py-1 text-sm rounded-md border border-app hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          onClick={() => {
            document.documentElement.classList.toggle("dark");
          }}
        >
          Toggle Theme
        </button>

        <div className="w-8 h-8 rounded-full bg-color-primary" />
      </div>
    </header>
  );
};

export default Topbar;