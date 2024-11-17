import { createContext, useContext, useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify'; // Named imports
import { withAuthenticator } from '@aws-amplify/ui-react'
import awsconfig from '../../aws-exports'; // Adjust path if needed

// Configure Amplify with AWS settings
Amplify.configure(awsconfig);

const UserContext = createContext();

export function UserProvider({ children }) {
  const [role, setRole] = useState(null);

  useEffect(() => {
    async function getUserRole() {
      try {
        const user = await withAuthenticator.currentAuthenticatedUser();
        const groups = user.signInUserSession.idToken.payload['cognito:groups'];

        if (groups && groups.includes('Admin')) {
          setRole('Admin');
        } else if (groups && groups.includes('Employee')) {
          setRole('Employee');
        } else {
          setRole('Unknown');
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setRole(null);
      }
    }

    getUserRole();
  }, []);

  return <UserContext.Provider value={role}>{children}</UserContext.Provider>;
}

export function useUserRole() {
  return useContext(UserContext);
}
