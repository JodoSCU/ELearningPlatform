import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { signOut } from 'aws-amplify/auth';
import { Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext.js';
import EmployeePage from './pages/EmployeePage.js';
import AdminPage from './pages/AdminPage.js';


function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <h1>Welcome to the E-learning Platform</h1>
          <p>Build your personalized learning path</p>
          <Button onClick={signOut}>Sign Out</Button>
          <Button>Python</Button>
          <Button>React</Button>
          <Button>AWS Services</Button>

          <Routes>
            <Route path="/employee" element={<EmployeePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/" element={<EmployeePage />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default withAuthenticator(App);
