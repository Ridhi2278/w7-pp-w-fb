import { useState } from "react";

const useSignup = (url) => {
  const [error, setError] = useState(null);

  const signup = async (object) => {
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Signup failed");
        return null;
      }

      localStorage.setItem("user", JSON.stringify(data)); // { email, token }
      return data;
    } catch (err) {
      setError("Something went wrong");
      return null;
    }
  };

  return { signup, error };
};

export default useSignup;