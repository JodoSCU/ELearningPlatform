import React from 'react';
import { withAuthenticator, Button } from '@aws-amplify/ui-react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Quiz from './pages/Quiz'; // Correct import path for Quiz
import Results from './pages/Results';
import LearningPath from './pages/LearningPath';
import '@aws-amplify/ui-react/styles.css';
import { signOut } from 'aws-amplify/auth';
import './App.css';


function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Welcome to the E-learning Platform</h1>
      <p>Build your personalized learning path</p>
      <Button onClick={signOut}>Sign Out</Button>
      
      <Button onClick={() => navigate('/quiz')}>Python</Button>
    </div>
  );
}

const AppWithAuth = withAuthenticator(App);

function MainApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppWithAuth />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/learning-path" element={<LearningPath />} />
      </Routes>
    </Router>
  );
}

export default MainApp;
