import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import CustomizePage from "./pages/CustomizePage";
import AnalyzePage from "./pages/AnalyzePage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/customize" element={<CustomizePage />} />
            <Route path="/analyze" element={<AnalyzePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
