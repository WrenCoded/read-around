import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      setIsLoggedIn(true);
      setUserToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  function login(token) {
    setIsLoggedIn(true);
    setUserToken(token);
    localStorage.setItem("userToken", token);
  }

  function logout() {
    setIsLoggedIn(false);
    setUserToken(null);
    localStorage.removeItem("userToken");
  }

  const authValue = {
    isLoggedIn,
    isLoading,
    userToken,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
