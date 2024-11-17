import React, { createContext, useContext, useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from '../../aws-exports';  // Correct path to aws-exports.js

Amplify.configure(awsconfig);

const UserContext = createContext();

function UserProvider({ children, user }) {
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user) {
      const userSession = user.signInUserSession;
      if (userSession && userSession.idToken) {
        const groups = userSession.idToken.payload['cognito:groups'];

        if (groups) {
          if (groups.includes('Admin')) {
            setRole('Admin');
          } else if (groups.includes('Employee')) {
            setRole('Employee');
          } else {
            setRole('Unknown');
          }
        } else {
          setRole('Unknown');
        }
      } else {
        console.error('User session or ID token is missing');
        setRole('Unknown');
      }
    }
  }, [user]);  // Ensure this effect re-runs when the user changes

  return <UserContext.Provider value={role}>{children}</UserContext.Provider>;
}

function useUserRole() {
  return useContext(UserContext);
}

// Export both the UserProvider and useUserRole as named exports
export { UserProvider, useUserRole };

// Export AppWithProviders as default
function App({ signOut, user }) {
  const role = useUserRole();

  if (role === null) {
    return <p>Loading...</p>;  // Show loading if the role is not set yet
  }

  return (
    <div>
      <h1>Hello {user?.username}</h1>
      <p>Your role is: {role}</p>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}

function AppWithProviders({ signOut, user }) {
  return (
    <UserProvider user={user}>
      <App signOut={signOut} user={user} />
    </UserProvider>
  );
}

export default withAuthenticator(AppWithProviders);

