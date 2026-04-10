import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardOverview from "./pages/DashboardOverview";
import Projects from "./pages/Projects";
import Workflows from "./pages/Workflows";
import Team from "./pages/Team";
import Analytics from "./pages/Analytics";
import DataCore from "./pages/DataCore";
import Automations from "./pages/Automations";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to dashboard overview */}
        <Route path="/" element={<Navigate to="/overview" replace />} />
        
        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
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
  );
}

export default App;
