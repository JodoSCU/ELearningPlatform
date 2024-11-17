import React from 'react';
import { withAuthenticator, Button } from '@aws-amplify/ui-react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Quiz from './pages/Quiz'; 
import '@aws-amplify/ui-react/styles.css';
import { signOut } from 'aws-amplify/auth';
import './App.css';


function App() {
  const navigate = useNavigate();

  return (
    <>
      <div className="signout-container">
        <Button onClick={ signOut }>Sign Out</Button>
      </div>
      <div className="App">
        <h1>Welcome to the E-learning Platform!</h1>
        <p>Build your personalized learning path</p>
        <div>
          <Button onClick={() => navigate('/quiz')}>Get Started</Button>
        </div>  
      </div>
    </>
    
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
