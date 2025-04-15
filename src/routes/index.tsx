import { ChakraProvider } from "@chakra-ui/react";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Login from "../pages/authenticate/Login";
import Profile from "../pages/authenticate/profile/Profile";
import ResetPassword from "../pages/authenticate/ResetPassword";
import NewPassword from "../pages/authenticate/NewPassword";
import theme from "../components/ui/Theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { ProtectRoute } from "./protectRoute";
import { MultiStepForm } from "../pages/authenticate/stepsRegister/MultiStepForm";

function AppRoutes() {
  return (
    <Router>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={
                <ProtectRoute>
                  <Profile />
                </ProtectRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<MultiStepForm />} />
            <Route path="/request-password-reset" element={<ResetPassword />} />
            <Route path="/new-password/:token" element={<NewPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ChakraProvider>
      </AuthProvider>
    </Router>
  );
}

export default AppRoutes;
