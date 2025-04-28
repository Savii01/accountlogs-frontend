// src/components/sidebar/Sidebar.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import * as MdIcons from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import linksData from "../../data.json"; // Assuming your links are here!

// Types
type RoleType = "admin" | "customer" | null;
type LinkType = {
  name: string;
  path: string;
  icon: string;
};

const Sidebar = ({
  isOpen,
  onCollapse,
  theme,
  closeSidebar,
}: {
  theme: "light" | "dark";
  isOpen: boolean;
  onCollapse: (collapsed: boolean) => void;
  closeSidebar: () => void;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [role, setRole] = useState<RoleType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Handle getting role from localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("mockUser") || "{}");
    if (savedUser && savedUser.role) {
      setRole(savedUser.role);
    }
    setIsLoading(false);
  }, []);

  // Handle screen resize for mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onCollapse(newState);
  };

  const links: LinkType[] = role && Array.isArray(linksData[role]) ? linksData[role] : [];

  return (
    <div
      className={`h-[calc(100vh-4rem)] transition-all duration-300 font-semibold
        ${isMobile 
          ? `fixed bottom-0 left-0 w-full rounded-t-lg z-40 ${isOpen ? "translate-y-0" : "translate-y-full"}`
          : `w-full`}
        ${theme === "dark" 
          ? "bg-lilBlack text-white border-r border-gray-700"
          : "bg-white text-lilBlack"}
      `}
    >
      {/* Collapse Button for Desktop */}
      {!isMobile && (
        <button
          onClick={toggleCollapse}
          className={`absolute top-4 right-[-14px] rounded-full p-2 shadow transition
          ${theme === "dark" ? "bg-littBlack text-white border border-gray-500" : "bg-white text-gray-800 shadow-md"}`}
        >
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      )}

      {/* Navigation Links */}
      <nav className="flex flex-col gap-3 p-4 mt-6">
        {/* Loading Spinner */}
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          links.map((link) => {
            const Icon = MdIcons[link.icon as keyof typeof MdIcons];
            const isActive = location.pathname === link.path;

            const hoverClass = theme === "dark"
              ? "hover:bg-gray-700 hover:text-white"
              : "hover:bg-gray-200 hover:text-black";

            const activeClass = isActive
              ? theme === "dark"
                ? "bg-gray-300 text-lilBlack"
                : "bg-lilBlack text-white"
              : "";

            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => {
                  if (isMobile) closeSidebar();
                }}
                className={`flex items-center rounded-md transition-colors duration-200
                  ${isCollapsed ? "justify-center p-3" : "gap-3 px-4 py-2"}
                  ${hoverClass} ${activeClass}`}
              >
                {Icon && <Icon size={isCollapsed ? 28 : 24} />}
                {!isCollapsed && <span>{link.name}</span>}
              </Link>
            );
          })
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
