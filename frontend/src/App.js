import React from 'react';
import { withAuthenticator, Button } from '@aws-amplify/ui-react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Quiz from './pages/Quiz'; // Correct import path for Quiz
import '@aws-amplify/ui-react/styles.css';
import { signOut } from 'aws-amplify/auth';

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Welcome to the E-learning Platform</h1>
      <p>Build your personalized learning path</p>
      <Button onClick={ signOut }>Sign Out</Button>
      
      <Button onClick={() => navigate('/quiz')}>Python</Button>
      <Button onClick={() => navigate('/react-quiz')}>React</Button>
      <Button onClick={() => navigate('/aws-quiz')}>AWS Services</Button>
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
      </Routes>
    </Router>
  );
}

export default MainApp;
