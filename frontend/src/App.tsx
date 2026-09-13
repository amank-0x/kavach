import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
//import ResultsPage from './pages/ResultsPage'
//import SharedReportPage from './pages/SharedReportPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        {/*<Route path="/results/:id" element={<ResultsPage />} />*/}
        {/*<Route path="/report/shared/:id" element={<SharedReportPage />} />*/}
      </Routes>
    </Router>
  )
}

export default App
