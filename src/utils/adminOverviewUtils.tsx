// src/utils/adminOverviewUtils.ts
import data from "../data.json";

export const getOverviewData = () => {
  const totalUsers = data.users.length;
  const totalAccounts = data.accounts.length;
  const totalOrders = data.orders.length;
  const totalRevenue = data.orders.reduce((sum, order) => sum + order.total, 0);

  const categoryCounts = data.categories.map((cat) => {
    const count = data.accounts.filter((acc) => acc.categoryId === cat.id).length;
    return { category: cat.name, count };
  });

  return {
    totalUsers,
    totalAccounts,
    totalOrders,
    totalRevenue,
    categoryCounts,
  };
};
