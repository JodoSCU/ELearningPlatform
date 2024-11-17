import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react'; // This is the wrapper that provides authentication UI
import { signOut } from 'aws-amplify/auth';
import { Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App() {
  return (
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
