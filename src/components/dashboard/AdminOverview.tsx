import { useState, useEffect } from "react";
import { getOverviewData } from "../../utils/adminOverviewUtils";
import {
  MdGroup,
  MdShoppingCart,
  MdAccountCircle,
  MdAttachMoney,
} from "react-icons/md";
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
import { ReactNode } from "react";

// Types
interface OverviewItem {
  title: string;
  value: number | string;
  icon: ReactNode;
  bgColor: string;
}

interface CardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  bgColor: string;
}

const AdminOverview = ({ theme }: { theme: "light" | "dark" }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Fetch overview data
  const {
    totalUsers,
    totalAccounts,
    totalOrders,
    totalRevenue,
    categoryCounts,
  } = getOverviewData();

  const overviewItems: OverviewItem[] = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: <MdGroup size={28} />,
      bgColor: "bg-blue-50 dark:bg-blue-800",
    },
    {
      title: "Total Accounts",
      value: totalAccounts,
      icon: <MdAccountCircle size={28} />,
      bgColor: "bg-green-50 dark:bg-green-800",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <MdShoppingCart size={28} />,
      bgColor: "bg-yellow-50 dark:bg-yellow-800",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue}`,
      icon: <MdAttachMoney size={28} />,
      bgColor: "bg-purple-50 dark:bg-purple-800",
    },
  ];

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "facebook":
        return <FaFacebook size={24} />;
      case "instagram":
        return <FaInstagram size={24} />;
      case "twitter":
        return <FaTwitter size={24} />;
      case "tiktok":
        return <FaTiktok size={24} />;
      default:
        return <MdAccountCircle size={24} />;
    }
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {isLoading
        ? Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
            ></div>
          ))
        : overviewItems.map((item, idx) => (
            <Card
              key={idx}
              title={item.title}
              value={item.value}
              icon={item.icon}
              bgColor={item.bgColor}
              theme={theme}
            />
          ))}

      {/* Accounts by Category */}
      <div className="sm:col-span-2 lg:col-span-4">
        <h2 className="text-lg font-semibold mt-8 mb-4">Accounts by Category</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
                ></div>
              ))
            : categoryCounts?.map((cat, idx) => (
                <Card
                  key={idx}
                  title={cat.category}
                  value={cat.count}
                  icon={getCategoryIcon(cat.category)}
                  bgColor="bg-gray-50 dark:bg-gray-800"
                  theme={theme}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

const Card = ({
  title,
  value,
  icon,
  bgColor,
  theme,
}: CardProps & { theme: "light" | "dark" }) => (
  <div
    className={`${
      theme === "dark" ? "bg-littBlack text-white" : "bg-white text-lilBlack"
    } border border-gray-100 dark:border-gray-200 p-5 rounded-lg flex items-center gap-4 transition-all duration-300`}
  >
    <div className={`p-3 rounded-full ${bgColor}`}>{icon}</div>
    <div>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default AdminOverview;
