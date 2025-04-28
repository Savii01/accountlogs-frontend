import { useState, useEffect } from "react";
import AdminOverview from "../../components/dashboard/AdminOverview";
import AdminQuickActions from "../../components/dashboard/AdminQuickActions";
import Layout from "../../components/layout/Layout";

const AdminDashboard = () => {
  // Define the theme manually
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <AdminOverview theme={theme} />
      <AdminQuickActions theme={theme} />
    </Layout>
  );
};

export default AdminDashboard;
