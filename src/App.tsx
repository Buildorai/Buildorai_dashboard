import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardOverview from "./pages/DashboardOverview";
import Projects from "./pages/Projects";
import Workflows from "./pages/Workflows";
import Team from "./pages/Team";
import Analytics from "./pages/Analytics";
import DataCore from "./pages/DataCore";
import Automations from "./pages/Automations";

import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Redirect root to dashboard overview */}
          <Route path="/" element={<Navigate to="/overview" replace />} />
          
          {/* Protected Dashboard Routes */}
          <Route element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="/overview" element={<DashboardOverview />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/workflows" element={<Workflows />} />
            <Route path="/team" element={<Team />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/data" element={<DataCore />} />
            <Route path="/automations" element={<Automations />} />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/overview" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
