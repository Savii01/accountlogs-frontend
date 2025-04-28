import { useState, useEffect } from "react";
import AdminOverview from "../../components/dashboard/AdminOverview";
import AdminQuickActions from "../../components/dashboard/AdminQuickActions";
import Layout from "../../components/layout/Layout";

const AdminDashboard = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <AdminOverview theme={theme}, toggleTheme={toggleTheme} />
      <AdminQuickActions theme={theme} />
      
    </Layout>
  );
};

export default AdminDashboard;
