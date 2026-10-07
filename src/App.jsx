import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import TripsPage from "./pages/TripsPage";
import CustomersPage from "./pages/CustomersPage";
import PaymentsPage from "./pages/PaymentsPage";
import StatisticsPage from "./pages/StatisticsPage";
import Login from "./pages/Login";  
import Signup from "./pages/Signup";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Restore login if "Remember Me" was checked
  useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggedIn");
    if (savedLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // ✅ Handle login
  const handleLogin = (remember) => {
    setIsLoggedIn(true);
    if (remember) {
      localStorage.setItem("isLoggedIn", "true");
    }
  };

  
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <AppProvider>
      <AuthProvider>
      <Router>
        {isLoggedIn ? (
          <Layout onLogout={handleLogout}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/trips" element={<TripsPage />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/payments" element={<PaymentsPage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
            </Routes>
          </Layout>
        ) : (
          <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Login onLogin={handleLogin} />} />
         </Routes>  
        )}
      </Router>
      
    </AuthProvider>
    </AppProvider>

  );
};

export default App;