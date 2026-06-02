import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Intro } from "./pages/Intro"
import { CalendarApp } from "./pages/CalendarApp"
import { Privacy } from "./pages/Privacy"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/app" element={<CalendarApp />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </Router>
  )
}

export default App
