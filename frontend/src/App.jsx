import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./AuthContext.jsx";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import MainLayout from "./pages/MainLayout";
import Protected from "./components/Protected";
import UserProfile from "./pages/UserProfile";
import Home from "./pages/Home";
import AddBookForm from "./components/AddBookForm.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<Protected />}>
        <Route path="/user-profile" element={<UserProfile />} />
      </Route>
      <Route path="*" element={<h1>Page not found</h1>} />
    </Route>
  )
);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
