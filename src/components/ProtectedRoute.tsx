import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkRole = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setIsAuthorized(false);

      try {
        const res = await fetch("http://localhost:8000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!res.ok) return setIsAuthorized(false);

        const user = await res.json();

        setIsAuthorized(allowedRoles.includes(user.role));
      } catch (err) {
        console.error("Error checking role", err);
        setIsAuthorized(false);
      }
    };

    checkRole();
  }, [allowedRoles]);

  if (isAuthorized === null) return <div className="text-center mt-10">Loading...</div>;

  return isAuthorized ? <>{children}</> : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
