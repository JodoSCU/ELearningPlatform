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
      <h1>Welcome to the E-learning Platform</h1>
      <p>Build your personalized learning path</p>
      <Button onClick={signOut}>
        signout
      </Button>
      <Button>
        Python
      </Button>
      <Button>
        React
      </Button>
      <Button>
        AWS Services
      </Button>


      
    </div>
  );
}

export default withAuthenticator(App); // Wrap your app with authentication
