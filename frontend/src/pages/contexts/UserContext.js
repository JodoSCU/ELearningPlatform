import { createContext, useContext, useState, useEffect } from 'react';
import { Amplify, Auth } from 'aws-amplify'; // Import Auth from aws-amplify

import awsconfig from '../../aws-exports'; // Adjust path if needed

// Configure Amplify with AWS settings
Amplify.configure(awsconfig);

const UserContext = createContext();

export function UserProvider({ children }) {
  const [role, setRole] = useState(null);

  useEffect(() => {
    async function getUserRole() {
      try {
        // Use Auth.currentAuthenticatedUser() to get the current authenticated user
        const user = await Auth.currentAuthenticatedUser();
        const groups = user.signInUserSession.idToken.payload['cognito:groups'];

        // Check if the user belongs to the Admin or Employee groups
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
