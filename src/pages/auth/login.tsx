// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { signInWithGoogle } from "../../firebaseConfig";
// import { FcGoogle } from "react-icons/fc";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import Logo from "../../assets/react.svg";
// import { motion } from "framer-motion";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     rememberMe: false,
//   });

//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
//   };

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   setError("");

//   //   if (formData.password.length < 8 || !/\d/.test(formData.password)) {
//   //     setError("Password must be at least 8 characters long and contain a number.");
//   //     return;
//   //   }

//   //   try {
//   //     console.log("User Logged In:", formData);
//   //     navigate("/dashboard");
//   //   } catch (err) {
//   //     setError("Login failed. Please try again.");
//   //   }
//   // };

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   setError("");
  
//   //   try {
//   //     const response = await fetch("http://localhost:8000/api/auth/login", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Accept: "application/json",
//   //       },
//   //       body: JSON.stringify({
//   //         email: formData.email,
//   //         password: formData.password,
//   //       }),
//   //     });
  
//   //     const data = await response.json();
  
//   //     if (!response.ok) {
//   //       setError(data.message || "Login failed.");
//   //       return;
//   //     }
  
//   //     // Save token to localStorage (or cookies)
//   //     localStorage.setItem("token", data.token);
//   //     console.log("Logged in!", data);
  
//   //     navigate("/dashboard");
//   //   } catch (err) {
//   //     setError("Something went wrong. Please try again.");
//   //   }
//   // };
  
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
  
//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//         }),
//       });
  
//       const data = await response.json();
  
//       if (!response.ok) {
//         setError(data.message || "Login failed.");
//         return;
//       }
  
//       // ✅ Save token to localStorage
//       localStorage.setItem("token", data.token);
  
//       // ✅ Fetch user profile to get role
//       const profileRes = await fetch("http://127.0.0.1:8000/api/auth/profile", {
//         headers: {
//           Authorization: `Bearer ${data.token}`,
//           Accept: "application/json",
//         },
//       });
  
//       const user = await profileRes.json();
  
//       if (!profileRes.ok) {
//         setError("Failed to retrieve user profile.");
//         return;
//       }
  
//       // ✅ Redirect based on role
//       if (user.role === "admin") {
//         navigate("/dashboard/admin");
//       } else if (user.role === "customer") {
//         navigate("/dashboard/customer");
//       } else {
//         navigate("/unauthorized");
//       }
  
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     }
//   };
  

//   const handleGoogleLogin = async () => {
//     try {
//       const user = await signInWithGoogle();
//       console.log("Google Sign-In User:", user);
//       navigate("/dashboard");
//     } catch (error) {
//       setError("Google Sign-In failed. Please try again.");
//     }
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0 }} 
//       animate={{ opacity: 1 }} 
//       transition={{ duration: 1 }}
//       className="w-screen h-full lg:h-screen flex flex-col md:flex-row items-center justify-center bg-white text-white overflow-x-hidden"
//     >
//       {/* LEFT: Promo Section */}
//       <motion.div 
//         initial={{ x: -100, opacity: 0 }} 
//         animate={{ x: 0, opacity: 1 }} 
//         transition={{ duration: 1, delay: 0.2 }}
//         className="relative md:w-1/2 w-full bg-[url('/src/assets/images/Data_security_01.jpg')] bg-contain bg-[center_top_100px] h-screen flex-col items-center justify-center hidden lg:flex p-8"
//       >
//         <h2 className="absolute text-4xl 2xl:text-5xl p-8 font-semibold text-center max-w-[700px] top-10 text-white">
//           Secure & Instant Access to Premium Accounts!
//         </h2>
//       </motion.div>

//       {/* RIGHT: Login Form */}
//       <motion.div 
//         initial={{ x: 100, opacity: 0 }} 
//         animate={{ x: 0, opacity: 1 }} 
//         transition={{ duration: 1, delay: 0.4 }}
//         className="lg:w-1/2 w-full text-black p-8 my-5 md:my-0 lg:px-32 2xl:px-72 md:w-[700px] flex flex-col gap-y-2 justify-center  md:items-center items-start lg:items-start h-full lg:h-screen"
//       >
//         <motion.div 
//           initial={{ scale: 0.8, opacity: 0 }} 
//           animate={{ scale: 1, opacity: 1 }} 
//           transition={{ duration: 0.5, delay: 0.6 }}
//           className="mb-10 xl:mb-5 2xl:mb-20 flex gap-x-2"
//         >
//           <img src={Logo} alt="logo" />
//           <p className="font-semibold text-xl">AccountLogs</p>
//         </motion.div>
        
//         <motion.h2 
//           initial={{ opacity: 0, y: 20 }} 
//           animate={{ opacity: 1, y: 0 }} 
//           transition={{ duration: 0.5, delay: 0.8 }}
//           className="text-2xl lg:text-2xl text-left font-semibold"
//         >
//           Welcome Back! 🔑
//         </motion.h2>
//         <motion.p 
//           initial={{ opacity: 0, y: 20 }} 
//           animate={{ opacity: 1, y: 0 }} 
//           transition={{ duration: 0.5, delay: 1.0 }}
//           className="text-sm md:text-md lg:text-sm leading-[16px] md:w-96 md:text-center text-start lg:text-start"
//         >
//           Login to access your premium accounts instantly!
//         </motion.p>

//         {error && (
//           <motion.p 
//             initial={{ opacity: 0 }} 
//             animate={{ opacity: 1 }} 
//             transition={{ duration: 0.5, delay: 1.2 }}
//             className="text-red-500 text-sm mb-3"
//           >
//             {error}
//           </motion.p>
//         )}

//         <motion.form 
//           onSubmit={handleSubmit} 
//           className="mt-6 md:space-y-6 space-y-4 lg:space-y-4  w-full max-w-lg"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 1.4 }}
//         >
//           <motion.input 
//             type="email" 
//             name="email" 
//             placeholder="Email" 
//             value={formData.email} 
//             onChange={handleChange} 
//             className="w-full  px-4 py-2 border rounded-lg" 
//             required
//           />
          
//           <motion.div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg pr-10"
//               required
//             />
//             <span
//               className="absolute top-3 right-3 cursor-pointer"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </motion.div>

//           {/* Remember Me Checkbox */}
//           <motion.div className="flex items-center gap-2 text-sm">
//             <input 
//               type="checkbox" 
//               name="rememberMe" 
//               checked={formData.rememberMe} 
//               onChange={handleChange} 
//               className="w-4 h-4"
//             />
//             <label>Remember Me</label>
//           </motion.div>

//           <motion.button 
//             type="submit" 
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
//           >
//             Login
//           </motion.button>
//         </motion.form>

//         {/* Google Sign-In */}
//         <motion.div className="text-center mt-2">
//           <h1>OR sign in with Google 👇</h1>
//         </motion.div>

//         <motion.button 
//           onClick={handleGoogleLogin} 
//           className="flex justify-center items-center gap-x-2 w-full md:w-[520px] lg:w-full bg-white text-black py-2 rounded-lg hover:bg-gray-100 border border-gray-300 mt-2 mx-auto"
//         >
//           <FcGoogle /> Google Login
//         </motion.button>

//         <motion.p className="text-sm text-center mt-4">
//           Don't have an account? <Link to="/register" className="text-blue-500">Sign Up</Link>
//         </motion.p>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Login;


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../../assets/react.svg";
import { motion } from "framer-motion";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError("");

  //   const savedUser = JSON.parse(localStorage.getItem("mockUser") || "{}");

  //   if (
  //     formData.email === savedUser.email &&
  //     formData.password === savedUser.password
  //   ) {
  //     alert("Login successful!");
  //     navigate("/dashboard");
  //   } else {
  //     setError("Invalid email or password.");
  //   }
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    const { email, password } = formData;
  
    // Admin check
    if (email === "admin@email.com" && password === "admin123") {
      const adminUser = {
        email,
        role: "admin",
      };
      localStorage.setItem("mockUser", JSON.stringify(adminUser));
      navigate("/dashboard/admin");
      return;
    }
  
    // Basic password validation
    if (password.length < 8 || !/\d/.test(password)) {
      setError("Password must be at least 8 characters long and contain a number.");
      return;
    }
  
    // Default: treat as customer
    const customerUser = {
      email,
      role: "customer",
    };
  
    localStorage.setItem("mockUser", JSON.stringify(customerUser));
    navigate("/dashboard/customer");
  };
  

  const handleGoogleLogin = () => {
    alert("Mock Google login successful!");
    navigate("/dashboard");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
      className="w-screen h-full lg:h-screen flex flex-col md:flex-row items-center justify-center bg-white text-white overflow-x-hidden"
    >
      {/* LEFT: Promo Section */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ duration: 1, delay: 0.2 }}
        className="relative md:w-1/2 w-full bg-[url('/src/assets/images/Data_security_01.jpg')] bg-contain bg-[center_top_100px] h-screen flex-col items-center justify-center hidden lg:flex p-8"
      >
        <h2 className="absolute text-4xl 2xl:text-5xl p-8 font-semibold text-center max-w-[700px] top-10 text-white">
          Secure & Instant Access to Premium Accounts!
        </h2>
      </motion.div>

      {/* RIGHT: Login Form */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ duration: 1, delay: 0.4 }}
        className="lg:w-1/2 w-full text-black p-8 my-5 md:my-0 lg:px-32 2xl:px-72 md:w-[700px] flex flex-col gap-y-2 justify-center  md:items-center items-start lg:items-start h-full lg:h-screen"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-10 xl:mb-5 2xl:mb-20 flex gap-x-2"
        >
          <img src={Logo} alt="logo" />
          <p className="font-semibold text-xl">AccountLogs</p>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-2xl lg:text-2xl text-left font-semibold"
        >
          Welcome Back! 🔑
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 1.0 }}
          className="text-sm md:text-md lg:text-sm leading-[16px] md:w-96 md:text-center text-start lg:text-start"
        >
          Login to access your premium accounts instantly!
        </motion.p>

        {error && (
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5, delay: 1.2 }}
            className="text-red-500 text-sm mb-3"
          >
            {error}
          </motion.p>
        )}

        <motion.form 
          onSubmit={handleSubmit} 
          className="mt-6 md:space-y-6 space-y-4 lg:space-y-4  w-full max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <motion.input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full  px-4 py-2 border rounded-lg" 
            required
          />
          
          <motion.div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg pr-10"
              required
            />
            <span
              className="absolute top-3 right-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </motion.div>

          {/* Remember Me Checkbox */}
          <motion.div className="flex items-center gap-2 text-sm">
            <input 
              type="checkbox" 
              name="rememberMe" 
              checked={formData.rememberMe} 
              onChange={handleChange} 
              className="w-4 h-4"
            />
            <label>Remember Me</label>
          </motion.div>

          <motion.button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </motion.button>
        </motion.form>

        {/* Google Sign-In */}
        <motion.div className="text-center mt-2">
          <h1>OR sign in with Google 👇</h1>
        </motion.div>

        <motion.button 
          onClick={handleGoogleLogin} 
          className="flex justify-center items-center gap-x-2 w-full md:w-[520px] lg:w-full bg-white text-black py-2 rounded-lg hover:bg-gray-100 border border-gray-300 mt-2 mx-auto"
        >
          <FcGoogle /> Google Login
        </motion.button>

        <motion.p className="text-sm text-center mt-4">
          Don't have an account? <Link to="/register" className="text-blue-500">Sign Up</Link>
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default Login;
