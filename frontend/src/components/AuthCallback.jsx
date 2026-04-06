import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get token from URL query params (set by backend redirect)
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userId = params.get("userId");

    if (!token) {
      if (window.location.search.length === 0) {
        return;
      }
      console.error("No token received from Google auth");
      navigate("/?error=auth_failed");
      return;
    }

    // Save your own JWT in localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("userId", userId);

    navigate("/account");
  }, [navigate, location.pathname]);

  return <div>Signing you in...</div>;
}