import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import EmployeePage from './pages/EmployeePage';
import AdminPage from './pages/AdminPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './pages/contexts/UserContext';  // Correct named import
import EmployeePage from './pages/EmployeePage.js';
import AdminPage from './pages/AdminPage.js';

function App({ signOut, user }) {
  return (
    <><UserProvider user={user}>
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
    </UserProvider><div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div></>
  );
}

export default withAuthenticator(App);

