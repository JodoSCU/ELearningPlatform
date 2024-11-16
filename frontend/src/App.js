import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react'; // This is the wrapper that provides authentication UI

function App() {
  return (
    <div className="App">
      <h1>Welcome to the E-learning Platform</h1>
      <p>Build your personalized learning path</p>
    </div>
  );
}

export default withAuthenticator(App); // Wrap your app with authentication
