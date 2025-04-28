import { useEffect, useState } from "react";
import {
  FaBell,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
  FaSearch,
  FaArrowLeft,
} from "react-icons/fa";

const Topbar = ({
  toggleSidebar,
  toggleTheme,
  theme,
  isSidebarOpen,
}: {
  toggleSidebar: () => void;
  toggleTheme: () => void;
  theme: "light" | "dark";
  isSidebarOpen: boolean;
}) => {
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser({ email: parsed.email, role: parsed.role || "customer" });
    }
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 shadow px-4 lg:pl-8 lg:pr-20 py-4 flex items-center justify-between transition-colors duration-300
        ${theme === "dark" ? "bg-lilBlack text-white" : "bg-white text-lilBlack"}
      `}
    >
      {/* Left: Project name + Avatar + Hello (hidden when search is active) */}
      {!showSearch && (
        <div className="flex items-center gap-2 sm:gap-2">
          <span className="font-semibold text-sm sm:text-base whitespace-nowrap">
            AccountLogs
          </span>
          <img
            src="https://i.pravatar.cc/32"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm capitalize whitespace-nowrap sm:inline">
            {`Hello, ${user?.role || "Guest"}`}
          </span>
        </div>
      )}

      {/* Center: Search */}
      <div className="flex-1 flex justify-center">
        {showSearch ? (
          <div className="flex items-center w-full sm:w-96">
            <button
              onClick={() => setShowSearch(false)}
              className="mr-2 sm:hidden"
            >
              <FaArrowLeft size={20} />
            </button>
            <input
              type="text"
              placeholder="Search..."
              className={`px-3 py-1 text-sm w-full h-10 rounded-md border
                ${theme === "dark"
                  ? "border-gray-600 bg-littBlack text-white"
                  : "border-gray-300 bg-white text-gray-800"}
                focus:outline-none focus:ring-1 focus:ring-indigo-500
              `}
            />
          </div>
        ) : (
          <div className="hidden sm:block w-full max-w-md">
            <input
              type="text"
              placeholder="Search..."
              className={`px-3 py-1 text-sm w-full h-10 rounded-md border
                ${theme === "dark"
                  ? "border-gray-600 bg-littBlack text-white"
                  : "border-gray-300 bg-white text-gray-800"}
                focus:outline-none focus:ring-1 focus:ring-indigo-500
              `}
            />
          </div>
        )}
      </div>

      {/* Right: Icons (hidden when search is active) */}
      {!showSearch && (
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mobile Search Button */}
          <button
            className="sm:hidden"
            onClick={() => setShowSearch(true)}
          >
            <FaSearch size={20} />
          </button>

          {/* Notification */}
          <button
            className={`p-2 rounded-full transition ${
              theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
          >
            <FaBell size={20} />
          </button>

          {/* Theme Toggle */}
          <button onClick={toggleTheme}>
            {theme === "light" ? (
              <FaMoon size={20} className="text-lilBlack" />
            ) : (
              <FaSun size={20} className="text-gray-300" />
            )}
          </button>

          {/* Sidebar Toggle (mobile only) */}
          <button onClick={toggleSidebar} className="lg:hidden">
            {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      )}
    </header>
  );
};

export default Topbar;
