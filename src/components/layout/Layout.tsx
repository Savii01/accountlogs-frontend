import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const sidebarWidth = sidebarCollapsed ? "w-20" : "w-64";
  const mainMargin = sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"; // Only for large screens

  // Sync theme state with the root element
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div
      className={`${
        theme === "dark" ? "bg-littBlack text-white" : "bg-gray-100 text-lilBlack"
      } min-h-screen transition-colors duration-300`}
    >
      <Topbar
        toggleSidebar={toggleSidebar}
        toggleTheme={toggleTheme}
        theme={theme}
        isSidebarOpen={sidebarOpen}
      />

      <div className="flex pt-16 relative">
        {/* Desktop Sidebar */}
        <div
          className={`hidden lg:block fixed top-16 left-0 z-40 transition-all duration-300 ${sidebarWidth}`}
        >
          <Sidebar
            theme={theme}
            isOpen={sidebarOpen}
            onCollapse={(collapsed) => setSidebarCollapsed(collapsed)}
            closeSidebar={() => setSidebarOpen(false)}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="absolute top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white dark:bg-littBlack">
              <Sidebar
                theme={theme}
                isOpen={sidebarOpen}
                onCollapse={(collapsed) => setSidebarCollapsed(collapsed)}
                closeSidebar={() => setSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Main content */}
        <main
          className={`flex-1 overflow-y-auto p-4 transition-all duration-300 ${mainMargin}`}
        >
          <div className="rounded-md p-6 min-h-[100vh] transition-all duration-300">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
