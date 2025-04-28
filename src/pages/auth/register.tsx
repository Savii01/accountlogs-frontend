// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaCheckCircle, FaTimesCircle, FaEye, FaEyeSlash } from "react-icons/fa";
// import Logo from "../../assets/react.svg";
// import { motion } from "framer-motion";
// import axiosInstance from "../../api/axios.tsx"; // Import the Axios instance

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     agreedToTerms: false,
//   });

//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   // Password Validation
//   const isMinLengthValid = formData.password.length >= 8;
//   const hasNumber = /\d/.test(formData.password);

//   // submit function
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(""); // Reset error message

//     // Form validation
//     if (!formData.agreedToTerms) {
//       setError("You must agree to the terms and conditions.");
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     if (!isMinLengthValid || !hasNumber) {
//       setError("Password must be at least 8 characters long and contain a number.");
//       return;
//     }

//     // Making the API call
//     try {
//       // Make the POST request using Axios
//       const response = await axiosInstance.post('/auth/register', {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         password_confirmation: formData.confirmPassword,  // Make sure to match the backend expected field name
//         agreed_to_terms: formData.agreedToTerms,
//       });

//       // If the request was successful, handle the response
//       console.log("Registered:", response.data);
//       navigate("/login"); // Redirect to login page after successful registration
//     } catch (err) {
//       // Handling errors
//       if (err.response) {
//         // Server responded with an error (status code >= 400)
//         setError(err.response.data.message || "Registration failed.");
//       } else {
//         // Other errors (e.g., network issues)
//         setError("Something went wrong. Please try again.");
//       }
//     }
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0 }} 
//       animate={{ opacity: 1 }} 
//       transition={{ duration: 1 }}
//       className="w-screen h-full lg:h-screen flex flex-col md:flex-row items-center justify-center bg-white text-white overflow-x-hidden"
//     >
//       {/* LEFT: Promotional Section */}
//       <motion.div 
//         initial={{ x: -100, opacity: 0 }} 
//         animate={{ x: 0, opacity: 1 }} 
//         transition={{ duration: 1, delay: 0.2 }}
//         className="relative md:w-1/2 w-full bg-black h-screen flex-col items-center justify-center hidden lg:flex p-8"
//       >
//         <h2 className="absolute text-[40px] 2xl:text-5xl p-8 leading-[40px] font-semibold text-left max-w-[700px] top-10 text-white">
//           Unlock Premium Accounts – Fast, Secure & Verified!
//         </h2>
//       </motion.div>
      
//       {/* RIGHT: Registration Form */}
//       <motion.div 
//         initial={{ x: 100, opacity: 0 }} 
//         animate={{ x: 0, opacity: 1 }} 
//         transition={{ duration: 1, delay: 0.4 }}
//         className="lg:w-1/2 w-full text-black p-8 my-5 md:my-0 lg:px-32 2xl:px-72 flex flex-col gap-y-2 justify-center md:w-[700px] md:items-center items-start lg:items-start h-full lg:h-screen"
//       >
//         <motion.div 
//           initial={{ scale: 0.8, opacity: 0 }} 
//           animate={{ scale: 1, opacity: 1 }} 
//           transition={{ duration: 0.5, delay: 0.6 }}
//           className="mb-10 lg:mb-5 2xl:mb-20 flex gap-x-2"
//         >
//           <img src={Logo} alt="logo" />
//           <p className="font-semibold text-xl lg:text-lg 2xl:text-xl">AccountLogs</p>
//         </motion.div>
        
//         <motion.h2 
//           initial={{ opacity: 0, y: 20 }} 
//           animate={{ opacity: 1, y: 0 }} 
//           transition={{ duration: 0.5, delay: 0.8 }}
//           className="text-2xl lg:text-xl 2xl:text-2xl text-left font-semibold"
//         >
//           Get Instant Access – Sign Up Now 🚀
//         </motion.h2>
//         <motion.p 
//           initial={{ opacity: 0, y: 20 }} 
//           animate={{ opacity: 1, y: 0 }} 
//           transition={{ duration: 0.5, delay: 1.0 }}
//           className="text-sm md:text-md lg:text-sm leading-[16px] text-gray-600 md:w-96 md:text-center text-start lg:text-start"
//         >
//           Why pay full price? Get premium accounts at unbeatable prices. Secure your access in seconds!
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
//           className="mt-6 md:space-y-8 space-y-4 lg:space-y-3 2xl:space-y-4"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 1.4 }}
//         >
//           <motion.input 
//             type="text" 
//             name="name" 
//             placeholder="Full Name" 
//             value={formData.name} 
//             onChange={handleChange} 
//             className="w-full px-4 py-2 border rounded-lg" 
//             required
//           />
//           <motion.input 
//             type="email" 
//             name="email" 
//             placeholder="Email" 
//             value={formData.email} 
//             onChange={handleChange} 
//             className="w-full px-4 py-2 border rounded-lg" 
//             required
//             transition={{ duration: 0.5, delay: 1.6 }}
//           />
//           {/* Uncomment below if you want to include the Phone Number field */}
//           {/* 
//           <motion.input 
//             type="tel" 
//             name="phone" 
//             placeholder="Phone Number" 
//             value={formData.phone} 
//             onChange={handleChange} 
//             className="w-full px-4 py-2 border rounded-lg" 
//             required 
//             transition={{ duration: 0.5, delay: 1.8 }}
//           />
//           */}
//           <motion.div 
//             className="relative"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 2.0 }}
//           >
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

//           <motion.div 
//             className="relative"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 2.4 }}
//           >
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg pr-10"
//               required
//             />
//             <span
//               className="absolute top-3 right-3 cursor-pointer"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             >
//               {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </motion.div>

//           <motion.div 
//             className="flex items-center gap-2 text-sm"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 2.6 }}
//           >
//             <input 
//               type="checkbox" 
//               name="agreedToTerms" 
//               checked={formData.agreedToTerms} 
//               onChange={handleChange} 
//               className="w-4 h-4"
//             />
//             <label>
//               I agree to the <a href="/terms" className="text-gray-600 hover:text-blue-500">Terms and Conditions</a>
//             </label>
//           </motion.div>

//           <motion.button 
//             type="submit" 
//             className="w-full bg-black text-white py-2 rounded-lg hover:bg-black-800 transition"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 2.8 }}
//           >
//             Sign Me Up
//           </motion.button>
//         </motion.form>

//         <motion.p 
//           className="text-sm text-center mt-4"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 3.4 }}
//         >
//           Already have an account? <a href="/login" className="text-gray-600 hover:text-blue-500">Login</a>
//         </motion.p>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Register;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../../assets/react.svg";
import { motion } from "framer-motion";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const isMinLengthValid = formData.password.length >= 8;
  const hasNumber = /\d/.test(formData.password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.agreedToTerms) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!isMinLengthValid || !hasNumber) {
      setError("Password must be at least 8 characters long and contain a number.");
      return;
    }

    // Save mock user to local storage
    const mockUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      agreedToTerms: formData.agreedToTerms,
    };

    localStorage.setItem("mockUser", JSON.stringify(mockUser));
    alert("Registration successful!");
    navigate("/login");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
      className="w-screen h-full lg:h-screen flex flex-col md:flex-row items-center justify-center bg-white text-white overflow-x-hidden"
    >
      <motion.div 
        initial={{ x: -100, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ duration: 1, delay: 0.2 }}
        className="relative md:w-1/2 w-full bg-black h-screen flex-col items-center justify-center hidden lg:flex p-8"
      >
        <h2 className="absolute text-[40px] 2xl:text-5xl p-8 leading-[40px] font-semibold text-left max-w-[700px] top-10 text-white">
          Unlock Premium Accounts – Fast, Secure & Verified!
        </h2>
      </motion.div>

      <motion.div 
        initial={{ x: 100, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ duration: 1, delay: 0.4 }}
        className="lg:w-1/2 w-full text-black p-8 my-5 md:my-0 lg:px-32 2xl:px-72 flex flex-col gap-y-2 justify-center md:w-[700px] md:items-center items-start lg:items-start h-full lg:h-screen"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-10 lg:mb-5 2xl:mb-20 flex gap-x-2"
        >
          <img src={Logo} alt="logo" />
          <p className="font-semibold text-xl lg:text-lg 2xl:text-xl">AccountLogs</p>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-2xl lg:text-xl 2xl:text-2xl text-left font-semibold"
        >
          Get Instant Access – Sign Up Now 🚀
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 1.0 }}
          className="text-sm md:text-md lg:text-sm leading-[16px] text-gray-600 md:w-96 md:text-center text-start lg:text-start"
        >
          Why pay full price? Get premium accounts at unbeatable prices. Secure your access in seconds!
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
          className="mt-6 md:space-y-8 space-y-4 lg:space-y-3 2xl:space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <motion.input 
            type="text" 
            name="name" 
            placeholder="Full Name" 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full px-4 py-2 border rounded-lg" 
            required
          />
          <motion.input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full px-4 py-2 border rounded-lg" 
            required
            transition={{ duration: 0.5, delay: 1.6 }}
          />

          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.0 }}
          >
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

          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.4 }}
          >
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg pr-10"
              required
            />
            <span
              className="absolute top-3 right-3 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </motion.div>

          <motion.div 
            className="flex items-center gap-2 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.6 }}
          >
            <input 
              type="checkbox" 
              name="agreedToTerms" 
              checked={formData.agreedToTerms} 
              onChange={handleChange} 
              className="w-4 h-4"
            />
            <label>
              I agree to the <a href="/terms" className="text-gray-600 hover:text-blue-500">Terms and Conditions</a>
            </label>
          </motion.div>

          <motion.button 
            type="submit" 
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-black-800 transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.8 }}
          >
            Sign Me Up
          </motion.button>
        </motion.form>

        <motion.p 
          className="text-sm text-center mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 3.4 }}
        >
          Already have an account? <a href="/login" className="text-gray-600 hover:text-blue-500">Login</a>
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default Register;
