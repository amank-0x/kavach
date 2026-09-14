import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
//import ResultsPage from './pages/ResultsPage'
//import SharedReportPage from './pages/SharedReportPage'

function App() {
  return (
    <Router>
      <div className="w-full max-w-none">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          {/*<Route path="/results/:id" element={<ResultsPage />} />*/}
          {/*<Route path="/report/shared/:id" element={<SharedReportPage />} />*/}
        </Routes>
      </div>
    </Router>
  )
}

export default App
