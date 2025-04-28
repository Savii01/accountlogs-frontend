import { MdAddCircle, MdCategory, MdGroup, MdShoppingCart } from "react-icons/md";

const quickActions = [
  {
    title: "Add New Account",
    icon: <MdAddCircle size={24} />,
    action: () => alert("Open Add Account Modal"), // for now just a placeholder
    bgColor: "bg-blue-100 dark:bg-blue-900",
  },
  {
    title: "View All Orders",
    icon: <MdShoppingCart size={24} />,
    action: () => alert("Navigate to Orders Page"),
    bgColor: "bg-green-100 dark:bg-green-900",
  },
  {
    title: "Manage Users",
    icon: <MdGroup size={24} />,
    action: () => alert("Navigate to Users Management"),
    bgColor: "bg-yellow-100 dark:bg-yellow-900",
  },
  {
    title: "Add New Category",
    icon: <MdCategory size={24} />,
    action: () => alert("Open Add Category Modal"),
    bgColor: "bg-purple-100 dark:bg-purple-900",
  },
];

const AdminQuickActions = ({ theme }: { theme: "light" | "dark" }) => {
  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action, idx) => (
          <div
            key={idx}
            onClick={action.action}
            className={`cursor-pointer p-4 rounded-lg shadow hover:shadow-lg flex flex-col items-center gap-3 transition-all duration-300
            ${theme === "dark" ? "bg-littBlack text-white" : "bg-white text-lilBlack"}`}
          >
            <div className={`p-4 rounded-full ${action.bgColor}`}>{action.icon}</div>
            <p className="text-center font-medium">{action.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminQuickActions;
