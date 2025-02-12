import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthGuard } from './components/AuthGuard';
import { DashboardLayout } from './components/layouts/DashboardLayout';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Brokers from './pages/Brokers';
import Analytics from './pages/Analytics';
import Trading from './pages/Trading';
import Backtesting from './pages/Backtesting';
import Journal from './pages/Journal';
import Goals from './pages/Goals';
import Psychology from './pages/Psychology';
import Risk from './pages/Risk';
import AiChat from './pages/AiChat';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/brokers" element={<Brokers />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<AuthGuard><DashboardLayout /></AuthGuard>}>
          <Route index element={<Navigate to="/dashboard/analytics" replace />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="trading" element={<Trading />} />
          <Route path="backtesting" element={<Backtesting />} />
          <Route path="journal" element={<Journal />} />
          <Route path="goals" element={<Goals />} />
          <Route path="psychology" element={<Psychology />} />
          <Route path="risk" element={<Risk />} />
          <Route path="ai-chat" element={<AiChat />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;