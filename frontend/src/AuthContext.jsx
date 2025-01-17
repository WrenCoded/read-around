import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode }from "jwt-decode";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [username, setUsername] = useState(""); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      setIsLoggedIn(true);
      setUserToken(storedToken);
      try {
        const decoded = jwtDecode(storedToken);
        setUsername(decoded.user.username); 
      } catch (error) {
        console.error("Token decoding error:", error);
        setUsername(""); 
      }
    }
    setIsLoading(false);
  }, []);

  function login(token) {
    setIsLoggedIn(true);
    setUserToken(token);
    const decoded = jwtDecode(token);
    setUsername(decoded.user.username); 
    console.log(username);
    localStorage.setItem("userToken", token);
  }

  function logout() {
    setIsLoggedIn(false);
    setUserToken(null);
    setUsername(""); // Reset username on logout
    localStorage.removeItem("userToken");
  }

  function getUserId(token) {
    if (!token) return null;
    const decoded = jwtDecode(token);
    return decoded.user._id;
  }

  const authValue = {
    isLoggedIn,
    username,
    isLoading,
    userToken,
    login,
    logout,
    getUserId,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
