import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import SkipLink from './components/SkipLink'
import HomePage from './pages/HomePage'
import WorkPage from './pages/WorkPage'
import ProjectsPage from './pages/ProjectsPage'
import ContactPage from './pages/ContactPage'
import EducationPage from './pages/EducationPage'
import InstructionsPage from './pages/InstructionsPage' // Import the new page

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-renaissance-cream">
        <SkipLink />
        <Navigation />
        <main id="main-content" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/instructions" element={<InstructionsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
