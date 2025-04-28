// // 
// import { useEffect } from "react";
// import axios from "./api/axios";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AdminDashboard from "./pages/dashboard/AdminDashboard";
// import CustomerDashboard from "./pages/dashboard/CustomerDashboard";
// import Login from "./pages/auth/login";
// import Register from "./pages/auth/register";
// import ProtectedRoute from "./components/ProtectedRoute";
// import './App.css'
// import Unauthorized from "./pages/Unauthorized";

// function AppRoutes() {
//   useEffect(() => {
//     const checkConnection = async () => {
//       try {
//         const response = await axios.get("/ping"); // Make sure your backend has a /api/ping route
//         console.log("✅ Connected to backend:", response.data?.message || response.data);
//       } catch (error) {
//         console.error("❌ Failed to connect to backend:", error);
//       }
//     };

//     checkConnection();
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         <Route
//           path="/dashboard/admin"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/dashboard/customer"
//           element={
//             <ProtectedRoute allowedRoles={["customer"]}>
//               <CustomerDashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route path="/unauthorized" element={<Unauthorized />} />
//         <Route path="*" element={<div>404 Not Found</div>} />
//       </Routes>
//     </Router>
//   );
// }

// export default AppRoutes;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import CustomerDashboard from "./pages/dashboard/CustomerDashboard";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import './App.css';
import Unauthorized from "./pages/Unauthorized";

function AppRoutes() {
  return (
    <div className="font-schibstedgrotesk ">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/customer" element={<CustomerDashboard />} />

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default AppRoutes;
