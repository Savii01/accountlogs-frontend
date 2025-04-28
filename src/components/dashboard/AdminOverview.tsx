// --- AdminOverview.tsx ---

import { useState, useEffect } from "react";
import { getOverviewData } from "../../utils/adminOverviewUtils";
import { ReactNode } from "react";

// Icons
import { MdGroup, MdShoppingCart, MdAccountCircle, MdAttachMoney } from "react-icons/md";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { FaMessage, FaShield } from "react-icons/fa6";
import { 
  RiFacebookFill, 
  RiTiktokFill, 
  RiNetflixFill, 
  RiRedditFill, 
  RiShieldFill, 
  RiMessage2Fill 
} from "react-icons/ri";

// --- TYPES ---

interface OverviewItem {
  title: string;
  value: number | string;
  icon: ReactNode;
  lightBg: string;
  darkBg: string;
}

interface CardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  lightBg: string;
  darkBg: string;
  theme: "light" | "dark";
}

// --- MAIN COMPONENT ---

const AdminOverview = ({ theme }: { theme: "light" | "dark" }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Fetch overview data
  const { totalUsers, totalAccounts, totalOrders, totalRevenue, categoryCounts } = getOverviewData();

  // --- Define the static overview cards ---
  const overviewItems: OverviewItem[] = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: <MdGroup size={28} />,
      lightBg: "bg-blue-100",
      darkBg: "bg-blue-700",
    },
    {
      title: "Total Accounts",
      value: totalAccounts,
      icon: <MdAccountCircle size={28} />,
      lightBg: "bg-green-100",
      darkBg: "bg-green-700",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <MdShoppingCart size={28} />,
      lightBg: "bg-yellow-100",
      darkBg: "bg-yellow-700",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue}`,
      icon: <MdAttachMoney size={28} />,
      lightBg: "bg-purple-100",
      darkBg: "bg-purple-700",
    },
  ];

  // --- Simulate API loading delay ---
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // --- Select dynamic icons based on category name ---
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "facebook": return <RiFacebookFill size={24} />;
      case "instagram": return <FaInstagram size={24} />;
      case "twitter": return <FaTwitter size={24} />;
      case "tiktok": return <RiTiktokFill size={24} />;
      case "netflix": return <RiNetflixFill size={24} />;
      case "reddit": return <RiRedditFill size={24} />;
      case "vpn logs": return <RiShieldFill size={24} />;
      case "texting logs": return <RiMessage2Fill size={24} />;
      default: return <MdAccountCircle size={24} />;
    }
  };

  // --- RENDER ---

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      
      {/* Top Overview Cards */}
      {isLoading 
        ? Array.from({ length: 4 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))
        : overviewItems.map((item, idx) => (
            <Card 
              key={idx}
              title={item.title}
              value={item.value}
              icon={item.icon}
              lightBg={item.lightBg}
              darkBg={item.darkBg}
              theme={theme}
            />
          ))
      }

      {/* Accounts by Category */}
      <div className="sm:col-span-2 lg:col-span-4">
        <h2 className="text-lg font-semibold mt-8 mb-4">Accounts by Category</h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isLoading 
            ? Array.from({ length: 8 }).map((_, idx) => (
                <SkeletonCard key={idx} />
              ))
            : categoryCounts?.map((cat, idx) => (
                <Card 
                  key={idx}
                  title={cat.category}
                  value={cat.count}
                  icon={getCategoryIcon(cat.category)}
                  lightBg="bg-gray-100"
                  darkBg="bg-gray-700"
                  theme={theme}
                />
              ))
          }
        </div>
      </div>

    </div>
  );
};

// --- CARD COMPONENT ---
// Displays each overview item or category item

const Card = ({
  title,
  value,
  icon,
  lightBg,
  darkBg,
  theme,
}: CardProps) => {
  const iconBgColor = theme === "dark" ? darkBg : lightBg;

  return (
    <div className={`
      p-5 rounded-lg flex items-center gap-4 transition-all duration-300
      ${theme === "dark" 
        ? "bg-gray-900 text-white border border-gray-700" 
        : "bg-white text-gray-900 border border-gray-200"}
    `}>
      {/* Icon Circle */}
      <div className={`p-3 rounded-full ${iconBgColor}`}>
        {icon}
      </div>

      {/* Title and Value */}
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

// --- SKELETON LOADING CARD ---
// Displayed while loading API data

const SkeletonCard = () => (
  <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
);

export default AdminOverview;
 