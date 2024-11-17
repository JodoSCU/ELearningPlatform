import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react'; // This is the wrapper that provides authentication UI
import { signOut } from 'aws-amplify/auth';
import { Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import EmployeePage from './pages/EmployeePage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <><UserProvider>
      <Router>
        <Switch>
          <Route path="/employee" component={EmployeePage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/" component={EmployeePage} />
        </Switch>
      </Router>
    </UserProvider>
    <div className="App">
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
    </div>
  );
}

export default withAuthenticator(App); // Wrap your app with authentication
