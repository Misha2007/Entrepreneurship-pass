import { useEffect } from "react";
import { supabase } from "../lib/supabase";

const { VITE_API_URL } = import.meta.env;

export default function AuthCallback() {
  useEffect(() => {
    const handleCallback = async () => {
      // Get the current session from Supabase
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
        return;
      }

      if (!data.session) {
        console.error("No session found");
        return;
      }

      const user = data.session.user;

      // Optionally, send user info to your backend
      const res = await fetch(`${VITE_API_URL}users/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          firstName: user.user_metadata.full_name?.split(" ")[0],
          lastName: user.user_metadata.full_name?.split(" ")[1],
          // birthday may be null
        }),
      });

      const json = await res.json();
      console.log("Backend response:", json);

      // Save your own JWT in localStorage or context
      localStorage.setItem("token", json.accessToken);

      // Redirect to dashboard
      window.location.href = "/account";
    };

    handleCallback();
  }, []);

  return <div>Signing you in...</div>;
}