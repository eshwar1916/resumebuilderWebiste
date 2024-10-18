import './App.css';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Homepage from './HomePage/Homepage.jsx';  // Correct import with case matching
import ResumeBuilder from './ResumeBuilder/ResumeBuilder.jsx';
import ResumeTemplates from './Resume_Templates/Resume_temp.jsx';

function App() {
  return (
    <div className="App">
      {/* <ReactParticles /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/build-resume" element={<ResumeBuilder />} />
          <Route path="/login" element={<Homepage />} />
        <Route path="/resume-templates" element={<ResumeTemplates />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
