import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import ScanPage from './pages/ScanPage'
import ReportPage from './pages/ReportPage'
import SessionHistoryPage from './pages/SessionHistoryPage'
import SettingsPage from './pages/SettingsPage'
import ForensicsPage from './pages/ForensicsPage'
import BatchProcessingPage from './pages/BatchProcessingPage'
import CompliancePage from './pages/CompliancePage'

function App() {
  return (
    <Router>
      <div className="w-full max-w-none">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/home" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/scan" element={<ScanPage />} />
          <Route path="/dashboard/batch" element={<BatchProcessingPage />} />
          <Route path="/dashboard/history" element={<SessionHistoryPage />} />
          <Route path="/dashboard/forensics" element={<ForensicsPage />} />
          <Route path="/dashboard/compliance" element={<CompliancePage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
          <Route path="/dashboard/report/:id" element={<ReportPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
